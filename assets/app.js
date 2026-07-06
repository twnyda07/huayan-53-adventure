/* 首頁：依 catalog.js 建立「旅程地圖」 */
(function () {
  var mount = document.getElementById("journey");
  if (!mount || !window.CATALOG) return;

  var frag = document.createDocumentFragment();

  window.CATALOG.forEach(function (item) {
    var sdg = (window.SDG_INFO && window.SDG_INFO[item.sdg]) || { color: "#888", label: "SDG " + item.sdg };
    var ready = item.status === "ready";

    var stop = document.createElement("div");
    stop.className = "stop " + (ready ? "ready" : "coming");

    var node = document.createElement("div");
    node.className = "node";
    node.textContent = item.n;
    stop.appendChild(node);

    var card = document.createElement(ready ? "a" : "div");
    card.className = "stop-card";
    if (ready) card.href = item.href;

    card.innerHTML =
      '<div class="row1">' +
        '<span class="teacher">第' + item.n + '參 ‧ ' + item.teacher + '</span>' +
      '</div>' +
      '<div class="title">〈' + item.title + '〉</div>' +
      '<div class="theme">' + item.theme + '</div>' +
      '<div class="meta">' +
        '<span class="sdg-chip" style="background:' + sdg.color + '">SDG ' + item.sdg + ' ' + sdg.label + '</span>' +
        '<span class="state-chip ' + item.status + '">' + (ready ? "▶ 開始閱讀" : "即將登場") + '</span>' +
      '</div>';

    stop.appendChild(card);
    frag.appendChild(stop);
  });

  mount.appendChild(frag);

  // 統計
  var readyCount = window.CATALOG.filter(function (i) { return i.status === "ready"; }).length;
  var badge = document.getElementById("progress");
  if (badge) badge.textContent = "已上架 " + readyCount + " / 53 篇";
})();

/* 首頁：依 catalog.js 的 window.BEASTS 建立「四大神獸圖鑑」 */
(function () {
  var mount = document.getElementById("beasts");
  if (!mount || !window.BEASTS) return;

  var frag = document.createDocumentFragment();

  window.BEASTS.forEach(function (beast) {
    var card = document.createElement("div");
    card.className = "beast-card " + (beast.met ? "met" : "locked");

    if (beast.met) {
      card.innerHTML =
        '<div class="beast-emoji">' + beast.emoji + '</div>' +
        '<div class="beast-name">' + beast.name + '</div>' +
        '<div class="beast-bodhi">' + beast.bodhisattva + ' 座騎</div>' +
        '<div class="beast-virtue">' + beast.virtue + '</div>' +
        '<div class="beast-desc">' + beast.desc + '</div>' +
        '<div class="beast-state met">' + beast.metAt + '相遇 ✦</div>';
    } else {
      card.innerHTML =
        '<div class="beast-emoji locked">🔒</div>' +
        '<div class="beast-name locked">？？？</div>' +
        '<div class="beast-bodhi">？？？ 座騎</div>' +
        '<div class="beast-virtue">' + beast.virtue + '</div>' +
        '<div class="beast-desc locked">還沒相遇，一路讀下去就會遇見牠。</div>' +
        '<div class="beast-state locked">' + beast.metAt + ' 尚未相遇</div>';
    }

    frag.appendChild(card);
  });

  mount.appendChild(frag);
})();
