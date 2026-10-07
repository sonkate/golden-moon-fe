/* Áp dụng SITE_CONFIG: font, biến màu CSS, favicon, và các binding data-cfg-* */
(function () {
  var C = window.SITE_CONFIG;
  var get = function (path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  };
  var tpl = function (s) {
    return s.replace(/\{([^}]+)\}/g, function (_, p) { var v = get(p.trim()); return v == null ? '' : v; });
  };

  // Fonts (Google Fonts)
  var f = C.fonts;
  var fam = function (n, spec) { return 'family=' + n.replace(/ /g, '+') + ':' + spec; };
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?' + fam(f.heading, f.headingSpec) + '&' + fam(f.body, f.bodySpec) + '&display=swap';
  document.head.appendChild(link);

  // CSS variables
  var css = ':root{--font-heading:"' + f.heading + '",Georgia,serif;--font-body:"' + f.body + '",system-ui,sans-serif;';
  ['gold', 'rose', 'sage', 'stone'].forEach(function (g) {
    Object.keys(C.colors[g]).forEach(function (k) { css += '--' + g + '-' + k + ':' + C.colors[g][k] + ';'; });
  });
  css += '--color-zalo:' + C.colors.zalo + ';--color-messenger:' + C.colors.messenger +
    ';--color-call:' + C.colors.call + ';--shadow-soft:' + C.shadows.soft + ';--shadow-soft-lg:' + C.shadows.softLg + '}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // Favicon
  if (C.brand.favicon) {
    var ic = document.createElement('link');
    ic.rel = 'icon';
    ic.href = C.brand.favicon;
    document.head.appendChild(ic);
  }

  // Bindings (chạy sau khi DOM sẵn sàng)
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-cfg]').forEach(function (el) {
      var v = get(el.getAttribute('data-cfg'));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-cfg-href]').forEach(function (el) {
      el.setAttribute('href', tpl(el.getAttribute('data-cfg-href')));
    });
    document.querySelectorAll('[data-cfg-src]').forEach(function (el) {
      var v = get(el.getAttribute('data-cfg-src'));
      if (v) el.setAttribute('src', v);
    });
    // Ẩn mục liên hệ nếu giá trị rỗng (ví dụ email)
    document.querySelectorAll('[data-cfg-hide-empty]').forEach(function (el) {
      if (!get(el.getAttribute('data-cfg-hide-empty'))) el.style.display = 'none';
    });
  });
})();

