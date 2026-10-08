// Fade sections in once as they enter the viewport. Without JS everything is visible.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
})();

// YouTube walkthroughs: <div class="video" data-youtube="VIDEO_ID" data-title="...">.
// Shows the thumbnail and only loads the player when someone presses play.
(function () {
  document.querySelectorAll('.video[data-youtube]').forEach(function (el) {
    var id = el.getAttribute('data-youtube').trim();
    if (!id) return;
    var title = el.getAttribute('data-title') || 'Video walkthrough';
    el.innerHTML = '';
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-play';
    button.setAttribute('aria-label', 'Play: ' + title);
    button.innerHTML = '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="" loading="lazy"><span>Play walkthrough</span>';
    button.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = title;
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      el.replaceChild(frame, button);
      frame.focus();
    });
    el.appendChild(button);
  });
})();
