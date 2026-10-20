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
function buildVideoFacade(el) {
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
}
document.querySelectorAll('.video[data-youtube]').forEach(buildVideoFacade);

// Chart pop-ups on a skill page: each tile opens its section in a dialog.
// Without JS (or without <dialog>) the sections stay on the page and tiles jump to them.
(function () {
  var dialog = document.querySelector('.case-modal');
  var home = document.querySelector('.case-sections');
  if (!dialog || !home || typeof dialog.showModal !== 'function') return;
  document.documentElement.classList.add('has-modals');
  var body = dialog.querySelector('.case-modal-body');
  var order = Array.prototype.map.call(home.querySelectorAll(':scope > section[id]'), function (s) { return s.id; });
  var current = null;

  function putBack() {
    if (!current) return;
    current.querySelectorAll('.video[data-youtube]').forEach(function (v) {
      if (v.querySelector('iframe')) buildVideoFacade(v);
    });
    home.appendChild(current);
    current = null;
  }

  function open(id) {
    var section = document.getElementById(id);
    if (!section || !home.contains(section) && section !== current) return;
    putBack();
    current = section;
    section.classList.add('is-in');
    body.appendChild(section);
    var i = order.indexOf(id);
    dialog.querySelector('[data-modal-prev]').hidden = i <= 0;
    dialog.querySelector('[data-modal-next]').hidden = i >= order.length - 1;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    history.replaceState(null, '', '#' + id);
  }

  function step(delta) {
    if (!current) return;
    var i = order.indexOf(current.id) + delta;
    if (i >= 0 && i < order.length) open(order[i]);
  }

  document.querySelectorAll('[data-modal]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      open(a.getAttribute('data-modal'));
    });
  });
  dialog.querySelector('[data-modal-close]').addEventListener('click', function () { dialog.close(); });
  dialog.querySelector('[data-modal-prev]').addEventListener('click', function () { step(-1); });
  dialog.querySelector('[data-modal-next]').addEventListener('click', function () { step(1); });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', function () {
    putBack();
    history.replaceState(null, '', location.pathname + location.search);
  });

  // Keep in-page links (like links between questions) working inside the dialog.
  body.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (order.indexOf(id) !== -1) { e.preventDefault(); open(id); }
  });

  if (location.hash && order.indexOf(location.hash.slice(1)) !== -1) open(location.hash.slice(1));
})();
