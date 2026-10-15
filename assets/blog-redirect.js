(() => {
  'use strict';
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) return;
  const path = new URL(canonical.href).pathname;
  if (!path.startsWith('/blog/')) return;
  const target = new URL(path, location.origin);
  target.search = location.search;
  target.hash = location.hash;
  location.replace(target.href);
})();
