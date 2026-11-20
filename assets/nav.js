(function () {
  var links = [].slice.call(document.querySelectorAll('#toc a'));
  var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);

  function hl() {
    var y = window.scrollY + 130, idx = 0;
    for (var i = 0; i < secs.length; i++) { if (secs[i].offsetTop <= y) idx = i; }
    links.forEach(function (a, i) { a.classList.toggle('on', i === idx); });
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(function () { hl(); ticking = false; }); ticking = true; }
  }, { passive: true });
  hl();

  var m = document.querySelector('.mtoc');
  if (m) {
    m.addEventListener('click', function (e) { if (e.target.tagName === 'A') m.removeAttribute('open'); });
  }
})();
