/* Répète — hors ligne. Changer le numéro de CACHE à chaque mise à jour des fichiers listés. */
const CACHE = 'repete-v116';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  './apple-touch-icon.png', './favicon-32.png', './icon.svg'
];

self.addEventListener('install', e => {
  /* Chaque fichier est ajouté séparément : un fichier manquant (icône…) n'empêche pas l'installation du mode hors ligne.
     2.03 : copie prise directement sur le réseau (cache: 'reload') pour ne jamais garder une ancienne version du cache HTTP. */
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(FILES.map(f => fetch(new Request(f, { cache: 'reload' }))
      .then(res => { if (res && res.ok) return c.put(f, res); })
      .catch(() => {}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 2.03 : cache d'abord (ouverture immédiate, même avec un réseau faible), puis mise à jour en arrière-plan :
   la nouvelle version s'affiche à l'ouverture suivante. Les demandes « cache: 'reload' » (bouton « Vérifier »)
   passent toujours par le réseau. */
function store(req, res){
  if (res && res.ok && res.type === 'basic') { const copy = res.clone(); return caches.open(CACHE).then(c => c.put(req, copy)).then(() => res, () => res); }
  return Promise.resolve(res);
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const nav = req.mode === 'navigate';
  const shell = () => caches.match('./index.html').then(r => r || caches.match('./'));
  const fromCache = () => caches.match(req, { ignoreSearch: nav }).then(r => r || (nav ? shell() : undefined));
  if (req.cache === 'reload' || req.cache === 'no-store') {
    e.respondWith(fetch(req).then(res => store(req, res)).catch(() => fromCache().then(r => r || Response.error())));
    return;
  }
  e.respondWith(fromCache().then(hit => {
    const net = fetch(req).then(res => store(req, res));
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net.catch(() => (nav ? shell() : Promise.resolve()).then(r => r || Response.error()));
  }));
});
