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

  // 返回 wjc-wiki 的入口。桌面挂在侧栏顶部，窄屏塞进折叠目录
  // （<=1080px 时 aside 整体 display:none，只做侧栏等于手机上找不到）。
  var WIKI = 'https://patrick-andstar.github.io/';
  var WIKI_TITLE = '返回 wjc-wiki 知识库';

  var back = document.querySelector('aside .back');
  if (back) {
    var wa = document.createElement('a');
    wa.className = 'back';
    wa.href = WIKI;
    wa.textContent = '← wjc-wiki';
    wa.title = WIKI_TITLE;
    wa.style.marginBottom = '4px';
    back.parentNode.insertBefore(wa, back);
  }

  if (m) {
    var ol = m.querySelector('ol');
    if (ol) {
      var wrap = document.createElement('div');
      wrap.style.cssText = 'padding:4px 0 8px;font-family:var(--mono);font-size:11px;letter-spacing:.04em';
      var wb = document.createElement('a');
      wb.href = WIKI;
      wb.textContent = '← wjc-wiki 知识库';
      wb.title = WIKI_TITLE;
      wb.style.cssText = 'color:var(--ink3);text-decoration:none;display:inline-block;padding:3px 0';
      wrap.appendChild(wb);
      m.insertBefore(wrap, ol);
    }
  }
})();
