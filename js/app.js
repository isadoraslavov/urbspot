(function () {
  var EVENTS = window.URBSPOT_EVENTS || [];
  var byId = Object.create(null);
  EVENTS.forEach(function (event) {
    byId[event.id] = event;
  });

  var dialog;
  var toaster;
  var toasterHome;
  var liveTimer = 0;
  var reserveTimers = Object.create(null);

  function $(id) {
    return document.getElementById(id);
  }

  function norm(value) {
    return String(value || "")
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function formatLongDate(iso) {
    var date = new Date(iso + "T12:00:00");
    var text = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function formatStamp(iso) {
    var date = new Date(iso + "T12:00:00");
    var day = String(date.getDate()).padStart(2, "0");
    var month = date
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "")
      .toUpperCase();
    return day + " " + month;
  }

  function formatPrice(event) {
    if (!event.price) return "Gratuito";
    return "R$ " + event.price;
  }

  function ticketLabel(event) {
    return event.price ? "Adquirir Ingresso" : "Garantir Entrada Gratuita";
  }

  function scheduleLabel(event) {
    return event.starts + " às " + event.ends;
  }

  function reservationCode(id) {
    var n = 0;
    for (var i = 0; i < id.length; i += 1) {
      n = (n * 33 + id.charCodeAt(i)) % 1679616;
    }
    return "URB-" + n.toString(36).toUpperCase().padStart(4, "0");
  }

  function knownIds() {
    var set = Object.create(null);
    EVENTS.forEach(function (event) { set[event.id] = true; });
    return set;
  }

  function cleanStored() {
    var ids = knownIds();
    var favorites = UrbStorage.getFavorites().filter(function (id) { return ids[id]; });
    if (favorites.length !== UrbStorage.getFavorites().length) {
      UrbStorage.setFavorites(favorites);
    }
    return favorites;
  }

  function readFilters() {
    return {
      category: $("filter-category").value,
      mood: $("filter-mood").value,
      age: $("filter-age").value,
      budget: $("filter-budget").value,
      query: $("filter-query").value.trim()
    };
  }

  function matches(event, filters) {
    if (filters.category && event.category !== filters.category) return false;
    if (filters.mood && event.mood !== filters.mood) return false;
    if (filters.age && event.age !== filters.age) return false;
    if (filters.budget && event.budget !== filters.budget) return false;
    if (!filters.query) return true;
    var haystack = norm([
      event.title,
      event.category,
      event.mood,
      event.age,
      event.budget,
      event.venue,
      event.address,
      event.description,
      event.lineup.join(" ")
    ].join(" "));
    return haystack.indexOf(norm(filters.query)) !== -1;
  }

  function filteredEvents() {
    var filters = readFilters();
    return EVENTS.filter(function (event) {
      return matches(event, filters);
    }).sort(function (a, b) {
      return a.date.localeCompare(b.date) || a.starts.localeCompare(b.starts);
    });
  }

  function filtersActive() {
    var filters = readFilters();
    return Boolean(filters.category || filters.mood || filters.age || filters.budget || filters.query);
  }

  function showToast(message) {
    var item = document.createElement("p");
    item.className = "toast";
    item.textContent = message;
    toaster.appendChild(item);
    window.setTimeout(function () {
      item.classList.add("is-out");
      window.setTimeout(function () { item.remove(); }, 220);
    }, 3800);
  }

  function parkToaster() {
    if (dialog.open) dialog.appendChild(toaster);
    else toasterHome.appendChild(toaster);
  }

  function makePhoto(event) {
    var frame = document.createElement("div");
    frame.className = "ticket-photo";

    var fallback = document.createElement("p");
    fallback.className = "photo-fallback";
    fallback.textContent = event.venue;

    var img = document.createElement("img");
    img.src = event.image;
    img.alt = event.imageAlt;
    img.width = 1200;
    img.height = 800;
    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", function () {
      img.remove();
      frame.classList.add("is-fallback");
    });

    var stamp = document.createElement("p");
    stamp.className = "date-stamp";
    stamp.textContent = formatStamp(event.date);

    frame.append(fallback, img, stamp);
    return frame;
  }

  function makeButton(label, action, id, extraClass) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn " + (extraClass || "btn-ghost");
    button.dataset.action = action;
    button.dataset.id = id;
    button.textContent = label;
    return button;
  }

  function buildCard(event, compact) {
    var article = document.createElement("article");
    article.className = "ticket" + (compact ? " is-compact" : "");
    article.dataset.eventId = event.id;

    var body = document.createElement("div");
    body.className = "ticket-body";

    var kicker = document.createElement("p");
    kicker.className = "kicker";
    kicker.textContent = event.category + " · " + event.mood;

    var title = document.createElement("h3");
    title.textContent = event.title;

    var meta = document.createElement("p");
    meta.className = "ticket-meta";
    meta.textContent = scheduleLabel(event) + " · " + event.venue;

    body.append(kicker, title, meta);

    if (!compact) {
      var excerpt = document.createElement("p");
      excerpt.className = "excerpt";
      excerpt.textContent = event.description;
      body.appendChild(excerpt);
    }

    var chips = document.createElement("ul");
    chips.className = "chips";
    [event.age, event.budget].concat(event.price ? [formatPrice(event)] : []).forEach(function (label) {
      var item = document.createElement("li");
      item.textContent = label;
      chips.appendChild(item);
    });

    var actions = document.createElement("div");
    actions.className = "ticket-actions";
    var saved = UrbStorage.getFavorites().indexOf(event.id) !== -1;
    var fav = makeButton(saved ? "Salvo" : "Favoritar", "fav", event.id, "btn-ghost");
    fav.setAttribute("aria-pressed", saved ? "true" : "false");
    fav.setAttribute("aria-label", (saved ? "Remover " : "Salvar ") + event.title + " em Meus Rolês");
    var details = makeButton("Ver detalhes", "details", event.id, "btn-ghost");
    details.setAttribute("aria-label", "Ver detalhes de " + event.title);
    var ticket = makeButton(ticketLabel(event), "ticket", event.id, "btn-primary");
    actions.append(details, fav, ticket);

    var reserve = document.createElement("p");
    reserve.className = "card-reserve";
    reserve.dataset.reserveFor = event.id;
    reserve.hidden = true;

    var barcode = document.createElement("div");
    barcode.className = "barcode";
    barcode.setAttribute("aria-hidden", "true");

    body.append(chips, actions, reserve, barcode);
    article.append(makePhoto(event), body);
    return article;
  }

  function fillGrid(container, events, compact, emptyMessage) {
    container.replaceChildren();
    if (!events.length) {
      var empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = emptyMessage;
      container.appendChild(empty);
      return;
    }
    events.forEach(function (event) {
      container.appendChild(buildCard(event, compact));
    });
  }

  function announceResults(count, active) {
    var visible = count === 1 ? "1 rolê na sua vibe" : count + " rolês na sua vibe";
    if (!active) visible = count + " rolês em Brasília";
    if (count === 0) visible = "Nenhum rolê com essa combinação.";
    $("result-count").textContent = visible;
    window.clearTimeout(liveTimer);
    liveTimer = window.setTimeout(function () {
      $("result-live").textContent = visible;
    }, 600);
  }

  function renderCatalog() {
    var list = filteredEvents();
    var active = filtersActive();
    announceResults(list.length, active);
    var empty = "Nenhum rolê encaixou nessa combinação. Afrouxa um filtro ou busca outro nome — Brasília tem pista para todas as vibes.";
    fillGrid($("catalog"), list, false, empty);
    $("clear-filters").hidden = !active;
  }

  function eventsFromIds(ids) {
    return ids.map(function (id) { return byId[id]; }).filter(Boolean);
  }

  function updateFavCount(favorites) {
    var count = favorites.length;
    $("fav-count").textContent = String(count);
    $("fav-heading-count").textContent = String(count);
    $("fav-count").setAttribute("aria-label", count + " favoritos salvos");
  }

  function renderFavorites() {
    var favorites = cleanStored();
    updateFavCount(favorites);
    fillGrid(
      $("favorites"),
      eventsFromIds(favorites),
      false,
      "Você ainda não salvou nenhum rolê. Use Favoritar nos flyers que combinam com a sua noite."
    );
  }

  function renderHistory() {
    var ids = knownIds();
    var history = UrbStorage.getHistory().filter(function (id) { return ids[id]; });
    $("history-count").textContent = String(history.length);
    fillGrid(
      $("history"),
      eventsFromIds(history),
      true,
      "Abra um evento em Ver detalhes para montar seu histórico recente. Ficam guardados os últimos 6."
    );
  }

  function syncFavoriteButtons(id, active) {
    document.querySelectorAll('button[data-action="fav"][data-id="' + id + '"]').forEach(function (button) {
      var event = byId[id];
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.textContent = active ? "Salvo" : "Favoritar";
      button.setAttribute(
        "aria-label",
        (active ? "Remover " : "Salvar ") + (event ? event.title : "evento") + " em Meus Rolês"
      );
    });
  }

  function toggleFav(event) {
    var result = UrbStorage.toggleFavorite(event.id);
    syncFavoriteButtons(event.id, result.active);
    renderFavorites();
    showToast(
      result.active
        ? event.title + " salvo em Meus Rolês."
        : event.title + " removido dos favoritos."
    );
  }

  function setReserveSlots(event, code, pending) {
    document.querySelectorAll('[data-reserve-for="' + event.id + '"]').forEach(function (slot) {
      slot.hidden = false;
      slot.classList.toggle("is-pending", pending);
      slot.textContent = pending
        ? "Redirecionando para a reserva…"
        : "Reserva confirmada · " + code;
    });
  }

  function reserve(event) {
    var code = reservationCode(event.id);
    var message = event.price
      ? "Reserva iniciada para " + event.title + ". Código " + code + "."
      : "Entrada gratuita garantida para " + event.title + ". Código " + code + ".";
    showToast(message);
    setReserveSlots(event, code, true);
    window.clearTimeout(reserveTimers[event.id]);
    reserveTimers[event.id] = window.setTimeout(function () {
      setReserveSlots(event, code, false);
    }, 1000);

    var panel = $("reserve-panel");
    if (dialog.open && panel && panel.dataset.eventId === event.id) {
      playDialogReserve(panel, event, code);
    }
  }

  function playDialogReserve(panel, event, code) {
    panel.hidden = false;
    panel.setAttribute("aria-busy", "true");
    panel.replaceChildren();
    var status = document.createElement("p");
    status.className = "reserve-status";
    status.textContent = "Redirecionando para a bilheteria…";
    var track = document.createElement("div");
    track.className = "reserve-track";
    track.setAttribute("aria-hidden", "true");
    var bar = document.createElement("span");
    track.appendChild(bar);
    panel.append(status, track);
    window.setTimeout(function () {
      panel.removeAttribute("aria-busy");
      status.textContent = event.price
        ? "Reserva confirmada. Apresente o código na entrada. Pagamento real não é processado nesta demonstração."
        : "Entrada gratuita garantida. Apresente o código na porta. Esta demonstração não cobra nada.";
      track.remove();
      var codeEl = document.createElement("p");
      codeEl.className = "reserve-code";
      codeEl.textContent = code;
      panel.appendChild(codeEl);
    }, 1000);
  }

  function addDefinition(list, term, value) {
    var wrap = document.createElement("div");
    var dt = document.createElement("dt");
    dt.textContent = term;
    var dd = document.createElement("dd");
    dd.textContent = value;
    wrap.append(dt, dd);
    list.appendChild(wrap);
  }

  function fillDialog(event) {
    var sheet = $("dialog-sheet");
    sheet.replaceChildren();

    var close = document.createElement("button");
    close.type = "button";
    close.className = "btn btn-ghost dialog-close";
    close.dataset.action = "close";
    close.textContent = "Fechar";
    close.setAttribute("aria-label", "Fechar detalhes de " + event.title);

    var photo = makePhoto(event);
    photo.classList.add("dialog-photo");

    var kicker = document.createElement("p");
    kicker.className = "kicker";
    kicker.textContent = event.category + " · " + event.mood;

    var title = document.createElement("h2");
    title.id = "dialog-title";
    title.textContent = event.title;

    var when = document.createElement("p");
    when.className = "dialog-when";
    when.textContent = formatLongDate(event.date) + ". Início " + event.starts + " · término " + event.ends + ".";

    var place = document.createElement("p");
    place.className = "dialog-place";
    place.textContent = event.venue + " — " + event.address;

    var description = document.createElement("p");
    description.className = "dialog-copy";
    description.textContent = event.description;

    var lineupTitle = document.createElement("h3");
    lineupTitle.textContent = "Line-up";
    var lineup = document.createElement("ul");
    lineup.className = "lineup";
    event.lineup.forEach(function (artist) {
      var item = document.createElement("li");
      item.textContent = artist;
      lineup.appendChild(item);
    });

    var facts = document.createElement("dl");
    facts.className = "facts";
    addDefinition(facts, "Estilo", event.category);
    addDefinition(facts, "Humor", event.mood);
    addDefinition(facts, "Faixa etária", event.age);
    addDefinition(facts, "Orçamento", event.budget);
    addDefinition(facts, "Início", event.starts);
    addDefinition(facts, "Término", event.ends);
    addDefinition(facts, "Valor", formatPrice(event));

    var saved = UrbStorage.getFavorites().indexOf(event.id) !== -1;
    var actions = document.createElement("div");
    actions.className = "ticket-actions";
    var fav = makeButton(saved ? "Salvo" : "Favoritar", "fav", event.id, "btn-ghost");
    fav.setAttribute("aria-pressed", saved ? "true" : "false");
    fav.setAttribute("aria-label", (saved ? "Remover " : "Salvar ") + event.title + " em Meus Rolês");
    var ticket = makeButton(ticketLabel(event), "ticket", event.id, "btn-primary btn-ticket");
    actions.append(fav, ticket);

    var panel = document.createElement("div");
    panel.id = "reserve-panel";
    panel.className = "reserve-panel";
    panel.dataset.eventId = event.id;
    panel.hidden = true;

    var note = document.createElement("p");
    note.className = "fine-print";
    note.textContent = "O código de reserva fica neste navegador e serve só para demonstrar o fluxo de ingresso.";

    sheet.append(close, photo, kicker, title, when, place, description, lineupTitle, lineup, facts, actions, panel, note);
    dialog.setAttribute("aria-labelledby", "dialog-title");
  }

  function openDetails(event) {
    UrbStorage.pushHistory(event.id);
    renderHistory();
    fillDialog(event);
    if (!dialog.open) dialog.showModal();
    parkToaster();
  }

  function onActionClick(event) {
    var button = event.target.closest("button[data-action]");
    if (!button) return;
    var action = button.dataset.action;
    if (action === "close") {
      dialog.close();
      return;
    }
    var item = byId[button.dataset.id];
    if (!item) return;
    if (action === "details") openDetails(item);
    if (action === "fav") toggleFav(item);
    if (action === "ticket") reserve(item);
  }

  function renderA11y(settings) {
    var max = UrbStorage.SCALES.length - 1;
    $("font-dec").disabled = settings.fontIndex === 0;
    $("font-inc").disabled = settings.fontIndex === max;
    var light = settings.theme === "light";
    $("theme-toggle").textContent = light ? "Tema: claro" : "Tema: escuro";
    $("theme-toggle").setAttribute(
      "aria-label",
      light
        ? "Alternar para tema escuro. Tema atual: claro"
        : "Alternar para tema claro. Tema atual: escuro"
    );
    $("contrast-toggle").setAttribute("aria-pressed", settings.contrast ? "true" : "false");
    $("contrast-toggle").setAttribute(
      "aria-label",
      settings.contrast ? "Desativar modo alto contraste" : "Ativar modo alto contraste"
    );
  }

  function changeFont(direction) {
    var settings = UrbStorage.getSettings();
    var next = settings.fontIndex + direction;
    var max = UrbStorage.SCALES.length - 1;
    if (next < 0 || next > max) {
      showToast(next < 0 ? "A fonte já está no tamanho mínimo." : "A fonte já está no tamanho máximo.");
      return;
    }
    settings = UrbStorage.saveSettings({ fontIndex: next });
    UrbStorage.applySettings(settings);
    renderA11y(settings);
    if (direction === 0) showToast("Fonte resetada para o tamanho padrão.");
    else showToast(direction > 0 ? "Fonte aumentada." : "Fonte diminuída.");
  }

  function bindA11y() {
    $("font-inc").addEventListener("click", function () { changeFont(1); });
    $("font-dec").addEventListener("click", function () { changeFont(-1); });
    $("font-reset").addEventListener("click", function () {
      var settings = UrbStorage.saveSettings({ fontIndex: 1 });
      UrbStorage.applySettings(settings);
      renderA11y(settings);
      showToast("Fonte resetada para o tamanho padrão.");
    });
    $("theme-toggle").addEventListener("click", function () {
      var settings = UrbStorage.getSettings();
      var theme = settings.theme === "light" ? "dark" : "light";
      settings = UrbStorage.saveSettings({ theme: theme });
      UrbStorage.applySettings(settings);
      renderA11y(settings);
      showToast(theme === "light" ? "Tema claro ativado." : "Tema escuro ativado.");
    });
    $("contrast-toggle").addEventListener("click", function () {
      var settings = UrbStorage.getSettings();
      var contrast = !settings.contrast;
      settings = UrbStorage.saveSettings({ contrast: contrast });
      UrbStorage.applySettings(settings);
      renderA11y(settings);
      showToast(contrast ? "Modo alto contraste ativado." : "Modo alto contraste desativado.");
    });
  }

  function bindFilters() {
    var form = $("vibe-form");
    form.addEventListener("submit", function (event) { event.preventDefault(); });
    form.addEventListener("input", renderCatalog);
    form.addEventListener("change", renderCatalog);
    form.addEventListener("reset", function () {
      window.setTimeout(renderCatalog, 0);
      showToast("Filtros limpos. Mostrando todos os rolês.");
    });
  }

  function init() {
    dialog = $("event-dialog");
    toaster = $("toaster");
    toasterHome = toaster.parentElement;

    var settings = UrbStorage.applySettings(UrbStorage.getSettings());
    renderA11y(settings);
    bindA11y();
    bindFilters();

    document.body.addEventListener("click", onActionClick);
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", parkToaster);

    var heroImg = document.querySelector(".hero-media img");
    if (heroImg) {
      heroImg.addEventListener("error", function () {
        var frame = heroImg.parentElement;
        heroImg.remove();
        if (frame) frame.classList.add("is-fallback");
      });
    }

    renderCatalog();
    renderFavorites();
    renderHistory();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
