// This runs immediately to prevent FOUC
(function() {
  const STORAGE_KEY = 'theme';
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === 'mocha' || stored === 'latte') {
    document.documentElement.setAttribute('data-theme', stored);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'latte');
  } else {
    document.documentElement.setAttribute('data-theme', 'mocha');
  }
})();
