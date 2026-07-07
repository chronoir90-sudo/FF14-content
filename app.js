const STORAGE_KEYS = {
  profile: "eorzea-pocket.profile",
  jobs: "eorzea-pocket.jobs",
  addedSpots: "eorzea-pocket.addedSpots",
  doneTasks: "eorzea-pocket.doneTasks",
  customWatchItems: "eorzea-pocket.customWatchItems",
  marketCache: "eorzea-pocket.marketCache"
};

const PROGRESS_LABELS = {
  arr: "新生",
  hw: "蒼天",
  sb: "紅蓮",
  shb: "漆黒",
  ew: "暁月",
  dt: "黄金"
};

const PROGRESS_ORDER = ["arr", "hw", "sb", "shb", "ew", "dt"];

const DEFAULT_PROFILE = {
  character: "Yuzu Chu-hi",
  world: "Shinryu",
  dc: "Meteor",
  progress: "hw",
  gil: 48884,
  companySeals: 9050,
  ventures: 153,
  hideLockedSpots: true
};

const DEFAULT_JOBS = {
  "占星術師": 47,
  "赤魔道士": 59,
  "リーパー": 90,
  "召喚士": 35,
  "採掘師": 26,
  "園芸師": 22,
  "漁師": 39,
  "調理師": 35,
  "彫金師": 0
};

const QUICK_JOBS = [
  "ナイト", "戦士", "暗黒騎士", "ガンブレイカー",
  "白魔道士", "学者", "占星術師", "賢者",
  "モンク", "竜騎士", "忍者", "侍", "リーパー", "ヴァイパー",
  "吟遊詩人", "機工士", "踊り子",
  "黒魔道士", "召喚士", "赤魔道士", "ピクトマンサー", "青魔道士",
  "木工師", "鍛冶師", "甲冑師", "彫金師", "革細工師", "裁縫師", "錬金術師", "調理師",
  "採掘師", "園芸師", "漁師"
];

const BASE_SPOTS = [
  {
    id: "spot-1",
    name: "ラベンダーベッド夕焼け桟橋",
    area: "ラベンダーベッド",
    coord: "X:11.5 Y:8.9",
    progress: "arr",
    tags: ["夕焼け", "水辺", "柔らかい"],
    filter: "Faded Print / 暖色+25",
    memo: "水面反射を入れる。キャラは黒シルエット寄りでも映える。",
    custom: false
  },
  {
    id: "spot-2",
    name: "イシュガルド雪道・青い石畳",
    area: "イシュガルド：上層",
    coord: "X:7.2 Y:10.3",
    progress: "hw",
    tags: ["雪", "中世", "青白い"],
    filter: "Cool Blue",
    memo: "暗めに撮って、部分ライトを顔〜上半身に当てると良い。",
    custom: false
  },
  {
    id: "spot-3",
    name: "アジス・ラー浮遊島シルエット",
    area: "アジス・ラー",
    coord: "X:26.2 Y:11.4",
    progress: "hw",
    tags: ["SF", "廃墟", "浮遊島"],
    filter: "Cinematic",
    memo: "背景の巨大構造物を入れる。暗めにして輪郭を強調。",
    custom: false
  },
  {
    id: "spot-4",
    name: "クガネ夜景・朱雀門前",
    area: "クガネ",
    coord: "X:10.8 Y:9.7",
    progress: "sb",
    tags: ["夜景", "和風", "街灯"],
    filter: "Old Digicam",
    memo: "提灯背景が強い。縦構図向き。",
    custom: false
  },
  {
    id: "spot-5",
    name: "エルピス花畑・白昼夢",
    area: "エルピス",
    coord: "X:13.5 Y:7.8",
    progress: "ew",
    tags: ["花畑", "幻想", "白"],
    filter: "Faded Print",
    memo: "明るく淡く。余白を活かす。",
    custom: false
  },
  {
    id: "spot-6",
    name: "トライヨラ港・南国スナップ",
    area: "トライヨラ",
    coord: "X:12.0 Y:13.2",
    progress: "dt",
    tags: ["南国", "港", "青空"],
    filter: "CCD Flash",
    memo: "青空と建物を強めに。",
    custom: false
  }
];

const BASE_WATCH_ITEMS = [
  { id: "watch-2", name: "ファイアシャード", itemId: 2, type: "shard", job: "採掘師/園芸師", requiredLevel: 1, custom: false },
  { id: "watch-3", name: "アイスシャード", itemId: 3, type: "shard", job: "採掘師/園芸師", requiredLevel: 1, custom: false },
  { id: "watch-4", name: "ウィンドシャード", itemId: 4, type: "shard", job: "採掘師/園芸師", requiredLevel: 1, custom: false },
  { id: "watch-5", name: "アースシャード", itemId: 5, type: "shard", job: "採掘師/園芸師", requiredLevel: 1, custom: false },
  { id: "watch-6", name: "ライトニングシャード", itemId: 6, type: "shard", job: "採掘師/園芸師", requiredLevel: 1, custom: false },
  { id: "watch-7", name: "ウォーターシャード", itemId: 7, type: "shard", job: "採掘師/園芸師", requiredLevel: 1, custom: false },
  { id: "watch-8", name: "ファイアクリスタル", itemId: 8, type: "shard", job: "採掘師/園芸師", requiredLevel: 26, custom: false },
  { id: "watch-9", name: "アイスクリスタル", itemId: 9, type: "shard", job: "採掘師/園芸師", requiredLevel: 26, custom: false },
  { id: "watch-10", name: "ウィンドクリスタル", itemId: 10, type: "shard", job: "採掘師/園芸師", requiredLevel: 26, custom: false },
  { id: "watch-11", name: "アースクリスタル", itemId: 11, type: "shard", job: "採掘師/園芸師", requiredLevel: 26, custom: false },
  { id: "watch-12", name: "ライトニングクリスタル", itemId: 12, type: "shard", job: "採掘師/園芸師", requiredLevel: 26, custom: false },
  { id: "watch-13", name: "ウォータークリスタル", itemId: 13, type: "shard", job: "採掘師/園芸師", requiredLevel: 26, custom: false },
  { id: "watch-5113", name: "銀鉱", itemId: 5113, type: "gather", job: "採掘師", requiredLevel: 25, custom: false },
  { id: "watch-5064", name: "シルバーインゴット", itemId: 5064, type: "craft", job: "彫金師", requiredLevel: 23, materialCost: 680, custom: false },
  { id: "watch-g18", name: "古ぼけた地図G18", itemId: null, type: "future", job: "採掘師/園芸師", requiredLevel: 100, custom: false }
];

const CATEGORY_LABELS = {
  all: "全部",
  possible: "できる",
  shard: "シャード/クリスタル",
  gather: "採集",
  craft: "製作",
  future: "将来用",
  user: "ユーザー追加"
};

const state = {
  profile: loadJSON(STORAGE_KEYS.profile, DEFAULT_PROFILE),
  jobs: loadJSON(STORAGE_KEYS.jobs, DEFAULT_JOBS),
  addedSpots: loadJSON(STORAGE_KEYS.addedSpots, []),
  doneTasks: loadJSON(STORAGE_KEYS.doneTasks, {}),
  customWatchItems: loadJSON(STORAGE_KEYS.customWatchItems, []),
  marketCache: loadJSON(STORAGE_KEYS.marketCache, { world: "", fetchedAt: 0, items: {} }),
  activeTab: "self",
  selectedSpotId: null,
  marketCategory: "all",
  showOnlyPossible: false,
  cameraStream: null
};

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderAll();
});

function bindEvents() {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });

  document.getElementById("saveProfileBtn").addEventListener("click", saveProfileFromForm);
  document.getElementById("resetAllBtn").addEventListener("click", resetAllData);

  [
    "profileCharacter",
    "profileWorld",
    "profileDc",
    "profileProgress",
    "profileGil",
    "profileSeals",
    "profileVentures",
    "hideLockedSpots"
  ].forEach((id) => {
    document.getElementById(id).addEventListener("change", saveProfileFromForm);
  });

  document.getElementById("addJobBtn").addEventListener("click", addJob);
  document.getElementById("jobNameInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") addJob();
  });
  document.getElementById("jobLevelInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") addJob();
  });

  document.getElementById("spotSearchInput").addEventListener("input", renderSpotSection);
  document.getElementById("gachaSpotBtn").addEventListener("click", pickRandomSpot);
  document.getElementById("clearSpotSearchBtn").addEventListener("click", () => {
    document.getElementById("spotSearchInput").value = "";
    renderSpotSection();
  });
  document.getElementById("addSpotBtn").addEventListener("click", addSpot);

  document.getElementById("fetchMarketBtn").addEventListener("click", fetchMarketData);
  document.getElementById("clearCacheBtn").addEventListener("click", clearMarketCache);
  document.getElementById("showOnlyPossible").addEventListener("change", (event) => {
    state.showOnlyPossible = event.target.checked;
    renderMarketSection();
  });

  document.getElementById("parseOcrBtn").addEventListener("click", parseOcrInput);
  document.getElementById("addWatchBtn").addEventListener("click", addWatchItem);

  document.getElementById("copyQrBtn").addEventListener("click", copyQrText);
  document.getElementById("loadQrBtn").addEventListener("click", loadQrText);
  document.getElementById("startCameraBtn").addEventListener("click", startCamera);
  document.getElementById("stopCameraBtn").addEventListener("click", stopCamera);
}

function renderAll() {
  populateProgressSelect();
  renderHeader();
  renderProfileForm();
  renderJobSection();
  renderSpotSection();
  renderMarketFilters();
  renderMarketSection();
  renderTaskSection();
  renderQrSection();
}

function setActiveTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${tab}`);
  });
}

function populateProgressSelect() {
  const select = document.getElementById("profileProgress");
  if (select.childElementCount > 0) return;

  PROGRESS_ORDER.forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = PROGRESS_LABELS[key];
    select.appendChild(option);
  });
}

function renderHeader() {
  document.getElementById("worldBadge").textContent = `${state.profile.dc} / ${state.profile.world}`;
}

function renderProfileForm() {
  document.getElementById("profileCharacter").value = state.profile.character || "";
  document.getElementById("profileWorld").value = state.profile.world || "";
  document.getElementById("profileDc").value = state.profile.dc || "";
  document.getElementById("profileProgress").value = state.profile.progress || "arr";
  document.getElementById("profileGil").value = Number(state.profile.gil || 0);
  document.getElementById("profileSeals").value = Number(state.profile.companySeals || 0);
  document.getElementById("profileVentures").value = Number(state.profile.ventures || 0);
  document.getElementById("hideLockedSpots").checked = Boolean(state.profile.hideLockedSpots);
}

function saveProfileFromForm() {
  state.profile = {
    character: document.getElementById("profileCharacter").value.trim() || DEFAULT_PROFILE.character,
    world: document.getElementById("profileWorld").value.trim() || DEFAULT_PROFILE.world,
    dc: document.getElementById("profileDc").value.trim() || DEFAULT_PROFILE.dc,
    progress: document.getElementById("profileProgress").value || DEFAULT_PROFILE.progress,
    gil: clampNumber(document.getElementById("profileGil").value, 0, 999999999, DEFAULT_PROFILE.gil),
    companySeals: clampNumber(document.getElementById("profileSeals").value, 0, 999999999, DEFAULT_PROFILE.companySeals),
    ventures: clampNumber(document.getElementById("profileVentures").value, 0, 999999999, DEFAULT_PROFILE.ventures),
    hideLockedSpots: document.getElementById("hideLockedSpots").checked
  };

  saveJSON(STORAGE_KEYS.profile, state.profile);
  renderHeader();
  renderSpotSection();
  renderMarketSection();
  renderTaskSection();
  renderQrSection();
}

function resetAllData() {
  const ok = window.confirm("保存データを初期状態に戻します。よろしいですか？");
  if (!ok) return;

  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  stopCamera();

  state.profile = clone(DEFAULT_PROFILE);
  state.jobs = clone(DEFAULT_JOBS);
  state.addedSpots = [];
  state.doneTasks = {};
  state.customWatchItems = [];
  state.marketCache = { world: "", fetchedAt: 0, items: {} };
  state.marketCategory = "all";
  state.showOnlyPossible = false;
  state.selectedSpotId = null;

  document.getElementById("spotSearchInput").value = "";
  document.getElementById("showOnlyPossible").checked = false;
  document.getElementById("ocrInput").value = "";
  document.getElementById("ocrCards").innerHTML = "";

  renderAll();
  setStatus("marketStatus", "保存データを初期化しました。", "ok");
}

function renderJobSection() {
  const list = document.getElementById("jobList");
  list.innerHTML = "";

  const entries = Object.entries(state.jobs).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0], "ja");
  });

  document.getElementById("jobCountPill").textContent = `${entries.length}件`;

  if (!entries.length) {
    list.innerHTML = `<div class="empty-state">ジョブがまだありません。</div>`;
  } else {
    entries.forEach(([jobName, level]) => {
      const item = document.createElement("div");
      item.className = "job-item";
      item.innerHTML = `
        <div class="job-meta">
          <strong>${escapeHtml(jobName)}</strong>
          <span class="job-level">Lv ${Number(level)}</span>
        </div>
        <button class="delete-btn" type="button" data-job="${escapeAttr(jobName)}">削除</button>
      `;
      list.appendChild(item);
    });
  }

  list.querySelectorAll("[data-job]").forEach((button) => {
    button.addEventListener("click", () => {
      delete state.jobs[button.dataset.job];
      saveJSON(STORAGE_KEYS.jobs, state.jobs);
      renderJobSection();
      renderMarketSection();
      renderTaskSection();
    });
  });

  const quickJobs = document.getElementById("quickJobs");
  quickJobs.innerHTML = "";
  QUICK_JOBS.forEach((jobName) => {
    const button = document.createElement("button");
    button.className = "chip";
    button.type = "button";
    button.textContent = jobName;
    button.addEventListener("click", () => {
      document.getElementById("jobNameInput").value = jobName;
      document.getElementById("jobLevelInput").focus();
    });
    quickJobs.appendChild(button);
  });
}

function addJob() {
  const name = document.getElementById("jobNameInput").value.trim();
  const level = clampNumber(document.getElementById("jobLevelInput").value, 0, 100, 1);

  if (!name) {
    window.alert("ジョブ名を入力してください。");
    return;
  }

  state.jobs[name] = level;
  saveJSON(STORAGE_KEYS.jobs, state.jobs);

  document.getElementById("jobNameInput").value = "";
  document.getElementById("jobLevelInput").value = "1";

  renderJobSection();
  renderMarketSection();
  renderTaskSection();
}

function getAllSpots() {
  return [...BASE_SPOTS, ...state.addedSpots];
}

function progressIndex(progressKey) {
  return PROGRESS_ORDER.indexOf(progressKey);
}

function canAccessProgress(requiredProgress) {
  return progressIndex(requiredProgress) <= progressIndex(state.profile.progress);
}

function getVisibleSpots() {
  const query = (document.getElementById("spotSearchInput")?.value || "").trim().toLowerCase();
  const hideLocked = Boolean(state.profile.hideLockedSpots);

  return getAllSpots().filter((spot) => {
    const accessible = canAccessProgress(spot.progress);
    const allowByProgress = hideLocked ? accessible : true;
    const bundle = [spot.name, spot.area, spot.coord, spot.filter, spot.memo, ...(spot.tags || [])].join(" ").toLowerCase();
    const matches = !query || bundle.includes(query);
    return allowByProgress && matches;
  });
}

function ensureSelectedSpot() {
  const all = getAllSpots();
  const visible = getVisibleSpots();
  const stillExists = all.some((spot) => spot.id === state.selectedSpotId);

  if (stillExists) return;
  state.selectedSpotId = visible[0]?.id || all[0]?.id || null;
}

function getSelectedSpot() {
  return getAllSpots().find((spot) => spot.id === state.selectedSpotId) || null;
}

function renderSpotSection() {
  ensureSelectedSpot();
  const visible = getVisibleSpots();
  const all = getAllSpots();
  const list = document.getElementById("spotList");
  list.innerHTML = "";

  if (visible.length && !visible.some((spot) => spot.id === state.selectedSpotId)) {
    state.selectedSpotId = visible[0].id;
  } else if (!visible.length && all.length && !all.some((spot) => spot.id === state.selectedSpotId)) {
    state.selectedSpotId = all[0].id;
  }

  document.getElementById("walkCountPill").textContent = `${visible.length}件`;

  if (!visible.length) {
    list.innerHTML = `<div class="empty-state">条件に合うスポットがありません。検索条件か進行度を見直してください。</div>`;
  } else {
    visible.forEach((spot) => {
      const accessible = canAccessProgress(spot.progress);
      const item = document.createElement("div");
      item.className = `spot-item ${state.selectedSpotId === spot.id ? "active" : ""} ${accessible ? "" : "locked"}`;
      item.innerHTML = `
        <div class="spot-title-row">
          <h3 class="spot-name">${escapeHtml(spot.name)}</h3>
          <span class="tag ${accessible ? "success" : "locked"}">${accessible ? "行ける" : "未到達"}</span>
        </div>
        <div class="meta-line">${escapeHtml(spot.area)} / ${escapeHtml(spot.coord)}</div>
        <div class="meta-line">必要進行度：${escapeHtml(PROGRESS_LABELS[spot.progress])}</div>
        <div class="tag-wrap">
          ${(spot.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
      `;
      item.addEventListener("click", () => {
        state.selectedSpotId = spot.id;
        renderSpotSection();
        renderQrSection();
      });
      list.appendChild(item);
    });
  }

  const detail = document.getElementById("spotDetail");
  const badge = document.getElementById("selectedSpotProgressBadge");
  const selected = getSelectedSpot();

  if (!selected) {
    detail.innerHTML = `<div class="empty-state">スポットがありません。</div>`;
    badge.textContent = "未選択";
    badge.className = "pill";
    renderQrSection();
    return;
  }

  const accessible = canAccessProgress(selected.progress);
  badge.textContent = accessible ? "行ける" : "未到達";
  badge.className = accessible ? "pill success" : "pill";

  detail.innerHTML = `
    <h3>${escapeHtml(selected.name)}</h3>
    <p><strong>エリア：</strong>${escapeHtml(selected.area)}</p>
    <p><strong>座標：</strong>${escapeHtml(selected.coord)}</p>
    <p><strong>必要進行度：</strong>${escapeHtml(PROGRESS_LABELS[selected.progress])}</p>
    <p><strong>おすすめフィルター：</strong>${escapeHtml(selected.filter || "未設定")}</p>
    <p><strong>メモ：</strong>${escapeHtml(selected.memo || "未設定")}</p>
    <div class="tag-wrap">
      ${(selected.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      ${selected.custom ? `<span class="tag">追加スポット</span>` : ""}
    </div>
    ${selected.custom ? `<div class="button-row compact-top"><button id="deleteSelectedSpotBtn" class="delete-btn" type="button">追加スポットを削除</button></div>` : ""}
  `;

  if (selected.custom) {
    const deleteButton = document.getElementById("deleteSelectedSpotBtn");
    deleteButton.addEventListener("click", () => {
      state.addedSpots = state.addedSpots.filter((spot) => spot.id !== selected.id);
      saveJSON(STORAGE_KEYS.addedSpots, state.addedSpots);
      state.selectedSpotId = null;
      renderSpotSection();
      renderQrSection();
    });
  }

  renderQrSection();
}

function pickRandomSpot() {
  const visible = getVisibleSpots();
  if (!visible.length) {
    window.alert("ガチャ対象のスポットがありません。");
    return;
  }
  const picked = visible[Math.floor(Math.random() * visible.length)];
  state.selectedSpotId = picked.id;
  renderSpotSection();
  setActiveTab("walk");
}

function addSpot() {
  const name = document.getElementById("newSpotName").value.trim();
  const area = document.getElementById("newSpotArea").value.trim();
  const coord = document.getElementById("newSpotCoord").value.trim();
  const tagsText = document.getElementById("newSpotTags").value.trim();

  if (!name || !area || !coord) {
    window.alert("スポット名・エリア・座標を入力してください。");
    return;
  }

  const spot = {
    id: `custom-spot-${Date.now()}`,
    name,
    area,
    coord,
    progress: state.profile.progress,
    tags: tagsText ? tagsText.split(/[、,]\s*/).filter(Boolean) : [],
    filter: "未設定",
    memo: "ユーザー追加スポット",
    custom: true
  };

  state.addedSpots.push(spot);
  saveJSON(STORAGE_KEYS.addedSpots, state.addedSpots);

  document.getElementById("newSpotName").value = "";
  document.getElementById("newSpotArea").value = "";
  document.getElementById("newSpotCoord").value = "";
  document.getElementById("newSpotTags").value = "";

  state.selectedSpotId = spot.id;
  renderSpotSection();
  renderQrSection();
  setActiveTab("walk");
}

function getAllWatchItems() {
  return [...BASE_WATCH_ITEMS, ...state.customWatchItems];
}

function renderMarketFilters() {
  const wrap = document.getElementById("marketFilters");
  if (wrap.childElementCount > 0) {
    renderMarketFilterState();
    return;
  }

  Object.entries(CATEGORY_LABELS).forEach(([key, label]) => {
    const button = document.createElement("button");
    button.className = "chip";
    button.type = "button";
    button.dataset.category = key;
    button.textContent = label;
    button.addEventListener("click", () => {
      state.marketCategory = key;
      renderMarketFilterState();
      renderMarketSection();
    });
    wrap.appendChild(button);
  });

  renderMarketFilterState();
}

function renderMarketFilterState() {
  document.querySelectorAll("#marketFilters .chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.category === state.marketCategory);
  });
}

function renderMarketSection() {
  document.getElementById("showOnlyPossible").checked = state.showOnlyPossible;
  renderMarketCacheBadge();
  renderSellToday();
  renderDiscoverList();
  renderWatchItemList();
}

function renderMarketCacheBadge() {
  const badge = document.getElementById("marketCacheBadge");
  if (isCacheValidForWorld(state.profile.world)) {
    const date = new Date(state.marketCache.fetchedAt);
    badge.textContent = `取得済み ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
  } else {
    badge.textContent = "未取得";
  }
}

function getItemMarket(item) {
  if (!item.itemId) return null;
  return state.marketCache?.items?.[String(item.itemId)] || null;
}

function getJobLevelForRequirement(jobText) {
  const choices = String(jobText || "")
    .split("/")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!choices.length) return 0;

  return choices.reduce((maxLevel, jobName) => {
    return Math.max(maxLevel, Number(state.jobs[jobName] || 0));
  }, 0);
}

function canDoItem(item) {
  return getJobLevelForRequirement(item.job) >= Number(item.requiredLevel || 0);
}

function scoreItem(item) {
  let score = 0;
  const reasons = [];
  const doable = canDoItem(item);
  const market = getItemMarket(item);

  if (doable) {
    score += 45;
    reasons.push("今のLvで採れる/作れる");
  } else {
    score -= 22;
    reasons.push("Lv不足・将来候補");
  }

  if (market) {
    const price = Number(market.lowestPrice || 0);
    const velocity = Number(market.velocity || 0);
    const stock = Number.isFinite(Number(market.stock)) ? Number(market.stock) : null;

    if (price >= 600) {
      score += 18;
      reasons.push("単価が高い");
    } else if (price >= 180) {
      score += 10;
      reasons.push("単価そこそこ");
    }

    if (velocity >= 1.2) {
      score += 18;
      reasons.push("販売速度が高い");
    } else if (velocity > 0) {
      score += 7;
      reasons.push("販売履歴あり");
    }

    if (stock !== null) {
      if (stock <= 20) {
        score += 14;
        reasons.push("在庫が少ない");
      } else if (stock <= 80) {
        score += 7;
        reasons.push("在庫やや少なめ");
      }
    }

    if (item.type === "craft" && item.materialCost && price > item.materialCost) {
      score += 10;
      reasons.push("素材費より上で売れそう");
    }
  } else {
    reasons.push("相場取得後に再評価");
  }

  if (item.type === "shard") {
    score += 8;
    reasons.push("回転枠");
  }

  if (item.type === "future") {
    score -= 5;
  }

  return {
    score,
    reasons: [...new Set(reasons)].slice(0, 5),
    canDo: doable
  };
}

function categoryMatches(item) {
  if (state.marketCategory === "all") return true;
  if (state.marketCategory === "possible") return canDoItem(item);
  if (state.marketCategory === "user") return item.custom === true || item.type === "user";
  return item.type === state.marketCategory;
}

function renderSellToday() {
  const list = document.getElementById("sellTodayList");
  list.innerHTML = "";

  const ranked = getAllWatchItems()
    .map((item) => ({ item, market: getItemMarket(item), ...scoreItem(item) }))
    .filter((entry) => entry.canDo)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (!ranked.length) {
    list.innerHTML = `<div class="empty-state">今すぐ動ける候補がありません。ジョブLvや監視候補を見直してください。</div>`;
    return;
  }

  ranked.forEach((entry) => {
    list.appendChild(createMarketCard(entry.item, entry.market, entry.score, entry.reasons, entry.canDo, false));
  });
}

function renderDiscoverList() {
  const list = document.getElementById("discoverList");
  list.innerHTML = "";

  let items = getAllWatchItems()
    .filter((item) => categoryMatches(item))
    .map((item) => ({ item, market: getItemMarket(item), ...scoreItem(item) }));

  if (state.showOnlyPossible) {
    items = items.filter((entry) => entry.canDo);
  }

  items.sort((a, b) => b.score - a.score);

  if (!items.length) {
    list.innerHTML = `<div class="empty-state">条件に合う候補がありません。</div>`;
    return;
  }

  items.forEach((entry) => {
    list.appendChild(createMarketCard(entry.item, entry.market, entry.score, entry.reasons, entry.canDo, false));
  });
}

function renderWatchItemList() {
  const list = document.getElementById("watchItemList");
  list.innerHTML = "";

  const items = getAllWatchItems();
  document.getElementById("watchCountPill").textContent = `${items.length}件`;

  items.forEach((item) => {
    const scoring = scoreItem(item);
    const market = getItemMarket(item);
    list.appendChild(createMarketCard(item, market, scoring.score, scoring.reasons, scoring.canDo, true));
  });

  list.querySelectorAll("[data-delete-watch]").forEach((button) => {
    button.addEventListener("click", () => {
      state.customWatchItems = state.customWatchItems.filter((item) => item.id !== button.dataset.deleteWatch);
      saveJSON(STORAGE_KEYS.customWatchItems, state.customWatchItems);
      renderMarketSection();
    });
  });
}

function createMarketCard(item, market, score, reasons, doable, includeDeleteButton) {
  const wrapper = document.createElement("div");
  wrapper.className = `market-item ${doable ? "can-do" : "locked"}`;

  const lowestPrice = market?.lowestPrice ? `${formatNumber(market.lowestPrice)} ギル` : "未取得";
  const stock = Number.isFinite(Number(market?.stock)) ? formatNumber(market.stock) : "未取得";
  const velocity = Number.isFinite(Number(market?.velocity)) ? Number(market.velocity).toFixed(2) : "未取得";
  const itemTypeText = CATEGORY_LABELS[item.type] || item.type;
  const actionState = doable ? "できる" : "まだ無理";

  wrapper.innerHTML = `
    <div class="market-title-row">
      <div>
        <h3 class="market-name">${escapeHtml(item.name)}</h3>
        <div class="meta-line">必要ジョブ：${escapeHtml(item.job)} / 必要Lv：${escapeHtml(String(item.requiredLevel))}</div>
      </div>
      <div class="tag-wrap">
        <span class="tag ${doable ? "success" : "locked"}">${actionState}</span>
        <span class="tag">${escapeHtml(itemTypeText)}</span>
      </div>
    </div>

    <div class="market-stats">
      <div class="stat-box">
        <span class="stat-label">最安値</span>
        <span class="stat-value">${escapeHtml(lowestPrice)}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">在庫数</span>
        <span class="stat-value">${escapeHtml(stock)}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">販売速度</span>
        <span class="stat-value">${escapeHtml(velocity)}</span>
      </div>
    </div>

    <div class="watch-meta-row">
      <span class="tag">おすすめ ${Math.round(score)}</span>
      ${item.itemId ? `<span class="tag">ItemID ${escapeHtml(String(item.itemId))}</span>` : `<span class="tag">ItemID なし</span>`}
      ${item.materialCost ? `<span class="tag">素材費 ${escapeHtml(String(item.materialCost))} ギル</span>` : ""}
      ${item.custom ? `<span class="tag">ユーザー追加</span>` : `<span class="tag">標準候補</span>`}
    </div>

    <ul class="reason-list">
      ${reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
    </ul>

    ${includeDeleteButton && item.custom ? `<div class="button-row compact-top"><button class="delete-btn" type="button" data-delete-watch="${escapeAttr(item.id)}">この監視アイテムを削除</button></div>` : ""}
    ${includeDeleteButton && !item.custom ? `<div class="footer-note">標準候補は削除できません。</div>` : ""}
  `;

  return wrapper;
}

async function fetchMarketData() {
  const itemIds = getAllWatchItems()
    .filter((item) => item.itemId)
    .map((item) => item.itemId);

  if (!itemIds.length) {
    setStatus("marketStatus", "ItemID がある監視アイテムがありません。", "error");
    return;
  }

  if (isCacheValidForWorld(state.profile.world)) {
    setStatus("marketStatus", "6時間以内の相場キャッシュを利用しました。", "ok");
    renderMarketSection();
    return;
  }

  const itemIdText = itemIds.join(",");
  const url = `https://universalis.app/api/v2/${encodeURIComponent(state.profile.world)}/${itemIdText}?listings=10&entries=20`;
  setStatus("marketStatus", "Universalis から相場を取得中です...", "");

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();
    state.marketCache = {
      world: state.profile.world,
      fetchedAt: Date.now(),
      items: parseUniversalisResponse(json, itemIds)
    };
    saveJSON(STORAGE_KEYS.marketCache, state.marketCache);
    renderMarketSection();
    setStatus("marketStatus", `${state.profile.world} の相場を取得しました。`, "ok");
  } catch (error) {
    console.error(error);
    setStatus("marketStatus", "相場取得に失敗しました。通信状況・ワールド名・ブラウザ制限を確認してください。", "error");
  }
}

function parseUniversalisResponse(data, itemIds) {
  const result = {};

  itemIds.forEach((id) => {
    const raw =
      data?.items?.[String(id)] ||
      data?.items?.[id] ||
      data?.[String(id)] ||
      data?.[id] ||
      null;

    if (!raw) {
      result[String(id)] = {
        lowestPrice: null,
        stock: null,
        velocity: null
      };
      return;
    }

    const listings = Array.isArray(raw.listings) ? raw.listings : [];
    const recentHistory = Array.isArray(raw.recentHistory) ? raw.recentHistory : [];
    const listingPrices = listings
      .map((row) => Number(row.pricePerUnit || row.price || 0))
      .filter((value) => Number.isFinite(value) && value > 0);

    const stockByQuantity = listings.reduce((sum, row) => {
      const quantity = Number(row.quantity || 1);
      return sum + (Number.isFinite(quantity) ? quantity : 0);
    }, 0);

    result[String(id)] = {
      lowestPrice: listingPrices.length ? Math.min(...listingPrices) : Number(raw.minPriceNQ || raw.minPrice || raw.currentAveragePrice || 0) || null,
      stock: Number(raw.totalListings || raw.totalListingCount || stockByQuantity || 0) || 0,
      velocity: Number(raw.regularSaleVelocity || raw.nqSaleVelocity || recentHistory.length / 20 || 0) || 0
    };
  });

  return result;
}

function isCacheValidForWorld(world) {
  if (!state.marketCache || state.marketCache.world !== world || !state.marketCache.fetchedAt) return false;
  const sixHours = 6 * 60 * 60 * 1000;
  return Date.now() - Number(state.marketCache.fetchedAt) < sixHours;
}

function clearMarketCache() {
  state.marketCache = { world: "", fetchedAt: 0, items: {} };
  saveJSON(STORAGE_KEYS.marketCache, state.marketCache);
  renderMarketSection();
  setStatus("marketStatus", "相場キャッシュを削除しました。", "ok");
}

function addWatchItem() {
  const name = document.getElementById("watchName").value.trim();
  const itemIdText = document.getElementById("watchItemId").value.trim();
  const job = document.getElementById("watchJob").value.trim();
  const requiredLevel = clampNumber(document.getElementById("watchLevel").value, 0, 100, 1);
  const type = document.getElementById("watchType").value;

  if (!name || !job) {
    window.alert("アイテム名と必要ジョブを入力してください。");
    return;
  }

  const item = {
    id: `custom-watch-${Date.now()}`,
    name,
    itemId: itemIdText ? Number(itemIdText) : null,
    job,
    requiredLevel,
    type,
    custom: true
  };

  state.customWatchItems.push(item);
  saveJSON(STORAGE_KEYS.customWatchItems, state.customWatchItems);

  document.getElementById("watchName").value = "";
  document.getElementById("watchItemId").value = "";
  document.getElementById("watchJob").value = "";
  document.getElementById("watchLevel").value = "1";
  document.getElementById("watchType").value = "user";

  renderMarketSection();
}

function parseOcrInput() {
  const text = document.getElementById("ocrInput").value;
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const cards = document.getElementById("ocrCards");
  cards.innerHTML = "";

  if (!lines.length) {
    cards.innerHTML = `<div class="empty-state">解析するテキストを入力してください。</div>`;
    return;
  }

  const parsed = lines.map((line) => {
    const match = line.match(/^(.*?)[\s\t]+([0-9][0-9,]*)$/);
    if (match) {
      return {
        name: match[1].trim(),
        price: Number(match[2].replace(/,/g, ""))
      };
    }
    return {
      name: line,
      price: null
    };
  });

  parsed.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "ocr-card";
    card.innerHTML = `
      <div class="market-title-row">
        <div>
          <h3 class="market-name">${escapeHtml(entry.name || "未解析")}</h3>
          <div class="meta-line">${entry.price !== null ? `${formatNumber(entry.price)} ギル` : "価格を解析できませんでした"}</div>
        </div>
        <span class="tag">${entry.price !== null ? "解析成功" : "要確認"}</span>
      </div>
    `;
    cards.appendChild(card);
  });
}

function buildTasks() {
  const tasks = [
    "リテイナー2人を出す",
    "マケボ出品価格を見直す",
    "銀鉱 or シャードを補充",
    "占星術師でレベリングルレ",
    "行ける散歩スポットでSS1枚"
  ];

  if (Number(state.jobs["採掘師"] || 0) >= 25) {
    tasks.push("銀鉱を10〜30個で小分け出品");
  }

  if (Number(state.jobs["彫金師"] || 0) < 23) {
    tasks.push("彫金師をLv23まで上げる");
  }

  if (Number(state.jobs["占星術師"] || 0) < 50) {
    tasks.push("占星術師Lv50を目指す");
  }

  return tasks;
}

function renderTaskSection() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = buildTasks();

  if (!tasks.length) {
    taskList.innerHTML = `<div class="empty-state">今日のタスクがありません。</div>`;
    return;
  }

  tasks.forEach((task) => {
    const done = Boolean(state.doneTasks[task]);
    const item = document.createElement("div");
    item.className = `task-item ${done ? "done" : ""}`;
    item.innerHTML = `
      <span class="task-checkbox">${done ? "✓" : ""}</span>
      <span>${escapeHtml(task)}</span>
    `;
    item.addEventListener("click", () => {
      state.doneTasks[task] = !state.doneTasks[task];
      saveJSON(STORAGE_KEYS.doneTasks, state.doneTasks);
      renderTaskSection();
    });
    taskList.appendChild(item);
  });

  const doneCount = tasks.filter((task) => state.doneTasks[task]).length;
  document.getElementById("taskProgressPill").textContent = `${doneCount} / ${tasks.length} 完了`;
}

function renderQrSection() {
  const qrSpotName = document.getElementById("qrSpotName");
  const qrText = document.getElementById("qrText");
  const selected = getSelectedSpot();

  if (!selected) {
    qrSpotName.textContent = "未選択";
    qrText.value = "";
    drawPseudoQr("");
    return;
  }

  const payload = JSON.stringify({
    name: selected.name,
    area: selected.area,
    coord: selected.coord,
    progress: PROGRESS_LABELS[selected.progress],
    tags: selected.tags || [],
    world: state.profile.world,
    character: state.profile.character
  }, null, 2);

  qrSpotName.textContent = selected.name;
  qrText.value = payload;
  drawPseudoQr(payload);

  qrText.oninput = () => {
    drawPseudoQr(qrText.value);
  };
}

function drawPseudoQr(text) {
  const container = document.getElementById("pseudoQr");
  container.innerHTML = "";

  const size = 21;
  const bits = textToBits(text || "Eorzea Pocket");

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const cell = document.createElement("div");
      cell.className = "qr-cell";

      const finderState = getFinderState(x, y, size);
      const bitIndex = (x + y * size) % bits.length;
      const dark = finderState === "dark" || (!finderState && bits[bitIndex] === "1");

      if (dark) {
        cell.classList.add("dark");
      }

      container.appendChild(cell);
    }
  }
}

function getFinderState(x, y, size) {
  const topLeft = x <= 6 && y <= 6;
  const topRight = x >= size - 7 && y <= 6;
  const bottomLeft = x <= 6 && y >= size - 7;
  const insideFinder = topLeft || topRight || bottomLeft;

  if (!insideFinder) return null;

  const localX = topRight ? x - (size - 7) : x;
  const localY = bottomLeft ? y - (size - 7) : y;

  const border = localX === 0 || localY === 0 || localX === 6 || localY === 6;
  const center = localX >= 2 && localX <= 4 && localY >= 2 && localY <= 4;

  return border || center ? "dark" : "light";
}

function textToBits(text) {
  const source = text || "Eorzea Pocket";
  let hash = 2166136261;

  for (let i = 0; i < source.length; i += 1) {
    hash ^= source.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }

  let current = Math.abs(hash);
  let bits = "";

  for (let i = 0; i < 512; i += 1) {
    current ^= current << 13;
    current ^= current >> 17;
    current ^= current << 5;
    bits += (current >>> 0) % 2 ? "1" : "0";
  }

  return bits;
}

async function copyQrText() {
  const text = document.getElementById("qrText").value.trim();
  if (!text) {
    window.alert("コピーする文字列がありません。");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    window.alert("QR文字列をコピーしました。");
  } catch (error) {
    console.error(error);
    window.alert("コピーに失敗しました。ブラウザ権限を確認してください。");
  }
}

function loadQrText() {
  const text = document.getElementById("qrText").value.trim();
  if (!text) {
    window.alert("読み込む文字列がありません。");
    return;
  }

  drawPseudoQr(text);

  try {
    const parsed = JSON.parse(text);
    const target = getAllSpots().find((spot) => spot.name === parsed.name && spot.area === parsed.area);
    if (target) {
      state.selectedSpotId = target.id;
      renderSpotSection();
      renderQrSection();
      setActiveTab("qr");
      window.alert("QR文字列からスポットを読み込みました。");
      return;
    }
    window.alert("QR文字列は読み込みましたが、登録済みスポットとの一致はありませんでした。");
  } catch (_error) {
    window.alert("JSON形式ではありませんでした。疑似QRのみ更新します。");
  }
}

async function startCamera() {
  const video = document.getElementById("cameraPreview");
  const secure = window.isSecureContext || location.hostname === "localhost" || location.hostname === "127.0.0.1";

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setStatus("cameraStatus", "このブラウザではカメラAPIが利用できません。", "error");
    return;
  }

  if (!secure) {
    setStatus("cameraStatus", "カメラ起動には HTTPS または localhost が必要です。", "error");
    return;
  }

  try {
    stopCamera();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" }
      },
      audio: false
    });

    state.cameraStream = stream;
    video.srcObject = stream;
    setStatus("cameraStatus", "カメラを起動しました。権限拒否時はブラウザ設定を確認してください。", "ok");
  } catch (error) {
    console.error(error);
    setStatus("cameraStatus", "カメラ起動に失敗しました。HTTPS と権限設定を確認してください。", "error");
  }
}

function stopCamera() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach((track) => track.stop());
    state.cameraStream = null;
  }

  const video = document.getElementById("cameraPreview");
  if (video) {
    video.srcObject = null;
  }

  setStatus("cameraStatus", "待機中", "");
}

function setStatus(id, message, mode = "") {
  const el = document.getElementById(id);
  el.textContent = message;
  el.className = `status-box ${mode || "muted"}`.trim();
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : clone(fallback);
  } catch (_error) {
    return clone(fallback);
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(number)));
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("ja-JP");
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}
