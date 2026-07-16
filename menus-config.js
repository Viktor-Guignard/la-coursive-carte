/* Configuration partagée des cartes de La Coursive des Alpes.
   Utilisée par l'éditeur (onglets), la page Publier et la page publique. */
window.COURSIVE_MENUS = [
  { key: 'carte',     label: 'Carte',              hint: 'Cuisine',   slug: 'carte' },
  { key: 'partager',  label: 'À partager',         hint: 'Planches',  slug: 'a-partager' },
  { key: 'vins',      label: 'Vins',               hint: '',          slug: 'vins' },
  { key: 'boissons',  label: 'Alcools & boissons', hint: '',          slug: 'alcools-boissons' },
  { key: 'cocktails', label: 'Cocktails',          hint: 'Signature', slug: 'cocktails' },
];
window.COURSIVE_PUBLIC_URL = 'https://viktor-guignard.github.io/la-coursive-carte/carte.html';

window.currentMenuKey = function () {
  const k = new URLSearchParams(location.search).get('menu');
  return window.COURSIVE_MENUS.some(m => m.key === k) ? k : 'carte';
};
window.currentMenuLabel = function () {
  const k = window.currentMenuKey();
  const m = window.COURSIVE_MENUS.find(x => x.key === k);
  return m ? m.label : k;
};
window.menuSlug = function (key) {
  const m = window.COURSIVE_MENUS.find(x => x.key === key);
  return (m && m.slug) || key || 'carte';
};
window.currentMenuSlug = function () { return window.menuSlug(window.currentMenuKey()); };
