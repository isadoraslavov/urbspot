/* Persistência local: favoritos, histórico e acessibilidade, sem duplicar ids. */
var UrbStorage = (function () {
  var KEYS = {
    favorites: "urbspot:favorites",
    history: "urbspot:history",
    settings: "urbspot:settings"
  };

  var SCALES = [87.5, 100, 112.5, 125, 137.5, 150];

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function uniqueIds(list) {
    var seen = Object.create(null);
    var next = [];
    if (!Array.isArray(list)) return next;
    for (var i = 0; i < list.length; i += 1) {
      var id = list[i];
      if (typeof id !== "string" || seen[id]) continue;
      seen[id] = true;
      next.push(id);
    }
    return next;
  }

  function getFavorites() {
    return uniqueIds(read(KEYS.favorites, []));
  }

  function setFavorites(ids) {
    var clean = uniqueIds(ids);
    write(KEYS.favorites, clean);
    return clean;
  }

  function toggleFavorite(id) {
    var current = getFavorites();
    var exists = current.indexOf(id) !== -1;
    var next = exists
      ? current.filter(function (item) { return item !== id; })
      : [id].concat(current);
    setFavorites(next);
    return { active: !exists, favorites: next };
  }

  function getHistory() {
    return uniqueIds(read(KEYS.history, [])).slice(0, 6);
  }

  function pushHistory(id) {
    var next = [id].concat(
      getHistory().filter(function (item) { return item !== id; })
    ).slice(0, 6);
    write(KEYS.history, next);
    return next;
  }

  function getSettings() {
    var saved = read(KEYS.settings, {}) || {};
    var fontIndex = Number(saved.fontIndex);
    if (!Number.isInteger(fontIndex)) fontIndex = 1;
    fontIndex = Math.min(SCALES.length - 1, Math.max(0, fontIndex));
    return {
      fontIndex: fontIndex,
      theme: saved.theme === "light" ? "light" : "dark",
      contrast: Boolean(saved.contrast)
    };
  }

  function saveSettings(partial) {
    var next = Object.assign(getSettings(), partial || {});
    write(KEYS.settings, next);
    return next;
  }

  function applySettings(settings) {
    var current = settings || getSettings();
    var root = document.documentElement;
    root.dataset.theme = current.theme;
    if (current.contrast) root.dataset.contrast = "high";
    else delete root.dataset.contrast;
    root.style.fontSize = SCALES[current.fontIndex] + "%";
    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      if (current.contrast && current.theme === "light") themeMeta.content = "#ffffff";
      else if (current.contrast) themeMeta.content = "#000000";
      else if (current.theme === "light") themeMeta.content = "#f4efe6";
      else themeMeta.content = "#09070f";
    }
    return current;
  }

  return {
    KEYS: KEYS,
    SCALES: SCALES,
    getFavorites: getFavorites,
    setFavorites: setFavorites,
    toggleFavorite: toggleFavorite,
    getHistory: getHistory,
    pushHistory: pushHistory,
    getSettings: getSettings,
    saveSettings: saveSettings,
    applySettings: applySettings
  };
})();
