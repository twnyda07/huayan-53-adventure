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
