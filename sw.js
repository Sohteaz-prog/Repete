/* Répète — hors ligne. Changer le numéro de CACHE à chaque mise à jour des fichiers listés. */
const CACHE = 'repete-v162';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  './apple-touch-icon.png', './favicon-32.png', './icon.svg'
];

/* 2.09 essai 4 (483) : la page (index.html) n'est jamais rangée si elle est plus ancienne que ce service worker
   (GitHub ou le cache du navigateur peuvent encore servir l'ancienne version quelques minutes après la publication :
   avant, elle pouvait remplacer la nouvelle dans le cache, et l'appli revenait à la version précédente au rechargement). */
const VER = +CACHE.replace(/\D+/g, '') - 1;
const isHtml = res => /text\/html/.test(res.headers.get('content-type') || '');
const fresh = res => !isHtml(res) ? Promise.resolve(true) : res.clone().text().then(t => { const m = /APP_VER = (\d+)/.exec(t); return !m || +m[1] >= VER; }, () => false);

self.addEventListener('install', e => {
  /* Chaque fichier est ajouté séparément : un fichier manquant (icône…) n'empêche pas l'installation du mode hors ligne.
     2.03 : copie prise directement sur le réseau (cache: 'reload') pour ne jamais garder une ancienne version du cache HTTP. */
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(FILES.map(f => fetch(new Request(f, { cache: 'reload' }))
      .then(res => { if (res && res.ok) return fresh(res).then(ok => { if (ok) return c.put(f, res); }); })
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
  if (res && res.ok && res.type === 'basic') { const copy = res.clone(); return fresh(res).then(ok => ok ? caches.open(CACHE).then(c => c.put(req, copy)) : null).then(() => res, () => res); }
  return Promise.resolve(res);
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const nav = req.mode === 'navigate';
  const shell = () => caches.match('./index.html').then(r => r || caches.match('./'));
  const fromCache = () => caches.match(req, { ignoreSearch: nav }).then(r => r || (nav ? shell() : undefined));
  /* 2.08 (372) : « no-store » (vérification de version) = lu sur le réseau, jamais rangé ; « reload » (Vérifier, Mise à jour) = rangé */
  if (req.cache === 'no-store') { e.respondWith(fetch(req).catch(() => fromCache().then(r => r || Response.error()))); return; }
  if (req.cache === 'reload') {
    e.respondWith(fetch(req).then(res => store(req, res)).catch(() => fromCache().then(r => r || Response.error())));
    return;
  }
  e.respondWith(fromCache().then(hit => {
    /* 483 : la vérification en arrière-plan redemande au serveur (pas de copie gardée par le navigateur) */
    const net = (nav ? fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }) : fetch(req)).then(res => store(req, res));
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net.catch(() => (nav ? shell() : Promise.resolve()).then(r => r || Response.error()));
  }));
});
