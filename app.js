*onst stages = [
  ["arr", "新生", 1]*
  ["hw", "蒼天", 2],
  ["sb", "紅蓮",*3],
  ["shb", "漆黒", 4],
  ["ew", "*月", 5],
  ["dt", "黄金", 6]
];

cons* standardJobs = [
  "ナイト","戦士","暗黒*士","ガンブレイカー",
  "白魔道士","学者","占星術師"*"賢者",
  "モンク","竜騎士","忍者","侍","リーパー*,"ヴァイパー",
  "吟遊詩人","機工士","踊り子",
  *黒魔道士","召喚士","赤魔道士","ピクトマンサー","青魔道士*,
  "木工師","鍛冶師","甲冑師","彫金師","革細工師"*"裁縫師","錬金術師","調理師",
  "採掘師","園芸師",*漁師"
];

let profile = JSON.parse(l*calStorage.getItem("ep_profile") |* "null") || {
  character:"Yuzu Ch*-hi",
  world:"Shinryu",
  dc:"Met*or",
  progress:"hw",
  gil:48884,*  companySeals:9050,
  ventures:15*,
  hideLockedSpots:true,
  jobs:{*    "占星術師":47,
    "赤魔道士":59,
    *リーパー":90,
    "召喚士":35,
    "採掘師":*6,
    "園芸師":22,
    "漁師":39,
    *調理師":35,
    "彫金師":0
  }
};

let s*ots = JSON.parse(localStorage.getI*em("ep_spots") || "null") || [
  {*    id:"spot-lavender",
    title:*ラベンダーベッド夕焼け桟橋",
    area:"ラベンダーベッド*,
    coord:"X:11.5 Y:8.9",
    pr*gress:"arr",
    tags:["夕焼け","水辺"]*
    filter:"Faded Print",
    mem*:"水面反射を入れる。",
    rating:5
  },
  *
    id:"spot-ishgard",
    title:*イシュガルド雪道・青い石畳",
    area:"イシュガルド：上*",
    coord:"X:7.2 Y:10.3",
    p*ogress:"hw",
    tags:["雪","中世"],
*   filter:"Cool Blue",
    memo:"暗*に撮る。",
    rating:4
  },
  {
    i*:"spot-azysla",
    title:"アジス・ラー浮*島シルエット",
    area:"アジス・ラー",
    co*rd:"X:26.2 Y:11.4",
    progress:"*w",
    tags:["SF","廃墟"],
    filt*r:"Cinematic",
    memo:"巨大構造物を入れる*",
    rating:4
  },
  {
    id:"s*ot-kugane",
    title:"クガネ夜景・朱雀門前"*
    area:"クガネ",
    coord:"X:10.8*Y:9.7",
    progress:"sb",
    tag*:["夜景","和風"],
    filter:"Old Digi*am",
    memo:"提灯背景が強い。",
    rati*g:5
  },
  {
    id:"spot-elpis",
*   title:"エルピス花畑・白昼夢",
    area:"エ*ピス",
    coord:"X:13.5 Y:7.8",
   *progress:"ew",
    tags:["花畑","幻想"*,
    filter:"Faded Print",
    me*o:"明るく淡く。",
    rating:5
  }
];

l*t selected = spots[0];

let baseIt*ms = [
  {item:"ファイアシャード",itemId:2*type:"shard",job:"採掘師/園芸師",require*Level:1,worldPrice:0,velocity:"高",*dvice:"大量売り",memo:"低Lvでも扱いやすい定番素材。*},
  {item:"アイスシャード",itemId:3,type*"shard",job:"採掘師/園芸師",requiredLeve*:1,worldPrice:0,velocity:"高",advic*:"大量売り",memo:"クラフター需要が常にある。"},
  {*tem:"ウィンドシャード",itemId:4,type:"shar*",job:"採掘師/園芸師",requiredLevel:1,wo*ldPrice:40,velocity:"高",advice:"大量*り",memo:"低Lv金策の安定枠。"},
  {item:"アー*シャード",itemId:5,type:"shard",job:"採*師/園芸師",requiredLevel:1,worldPrice:*,velocity:"高",advice:"大量売り",memo:"*庫が薄い時は意外と売れる。"},
  {item:"ライトニングシャ*ド",itemId:6,type:"shard",job:"採掘師/*芸師",requiredLevel:1,worldPrice:0,v*locity:"高",advice:"大量売り",memo:"まとめ*り候補。"},
  {item:"ウォーターシャード",itemId*7,type:"shard",job:"採掘師/園芸師",requi*edLevel:1,worldPrice:0,velocity:"高*,advice:"大量売り",memo:"調理需要を見る候補。"},*  {item:"ファイアクリスタル",itemId:8,type:*shard",job:"採掘師/園芸師",requiredLevel*26,worldPrice:0,velocity:"高",advic*:"中量売り",memo:"シャードより単価が高くなりやすい。"},*  {item:"アイスクリスタル",itemId:9,type:"*hard",job:"採掘師/園芸師",requiredLevel:*6,worldPrice:0,velocity:"高",advice*"中量売り",memo:"在庫薄なら候補。"},
  {item:"*ィンドクリスタル",itemId:10,type:"shard",j*b:"採掘師/園芸師",requiredLevel:26,world*rice:0,velocity:"高",advice:"中量売り",*emo:"クラフター需要が高め。"},
  {item:"アースクリ*タル",itemId:11,type:"shard",job:"採掘*/園芸師",requiredLevel:26,worldPrice:*,velocity:"高",advice:"中量売り",memo:"*庫と最安値次第。"},
  {item:"ライトニングクリスタル",*temId:12,type:"shard",job:"採掘師/園芸師*,requiredLevel:26,worldPrice:0,vel*city:"高",advice:"中量売り",memo:"クラフター*要向け。"},
  {item:"ウォータークリスタル",itemI*:13,type:"shard",job:"採掘師/園芸師",req*iredLevel:26,worldPrice:0,velocity*"高",advice:"中量売り",memo:"調理系需要を見る候補*"},
  {item:"銀鉱",itemId:5113,type:*gather",job:"採掘師",requiredLevel:25*worldPrice:200,velocity:"中",advice*"素材売り",memo:"10〜30個で小分け。"},
  {ite*:"シルバーインゴット",itemId:5064,type:"cra*t",job:"彫金師",requiredLevel:23,worl*Price:659,materialCost:680,velocit*:"低〜中",advice:"加工比較",memo:"原価割れに注意*"},
  {item:"古ぼけた地図G18",itemId:nul*,type:"future",job:"採掘師/園芸師",requi*edLevel:100,worldPrice:18500,veloc*ty:"高",advice:"将来候補",memo:"高Lvになった*毎日候補。"}
];

let customWatchItems =*JSON.parse(localStorage.getItem("e*_custom_watch_items") || "[]");
le* items = baseItems.concat(customWa*chItems);
let marketFresh = false;*let onlyDoableDiscovery = true;
le* activeCategory = "all";

const $ * id => document.getElementById(id)*

function order(key){
  return st*ges.find(s => s[0] === key)?.[2] |* 1;
}

function label(key){
  retu*n stages.find(s => s[0] === key)?.*1] || key;
}

function jobLevel(jo*){
  if(job.includes("/")){
    re*urn Math.max(...job.split("/").map*n => profile.jobs[n.trim()] || 0))*
  }
  return profile.jobs[job] ||*0;
}

function canDo(item){
  retu*n item.type !== "drop" && jobLevel*item.job) >= item.requiredLevel;
}*
function saveAll(){
  localStorag*.setItem("ep_profile", JSON.string*fy(profile));
  localStorage.setIt*m("ep_spots", JSON.stringify(spots*);
}

function isCustom(item){
  r*turn customWatchItems.some(c => Nu*ber(c.itemId) === Number(item.item*d));
}

function typeLabel(t){
  r*turn {
    gather:"採集",
    craft:*製作",
    shard:"シャード/クリスタル",
    f*ture:"将来用",
    other:"その他"
  }[t]*|| t;
}

function byCategory(item)*
  if(activeCategory === "all") re*urn true;
  if(activeCategory === *custom") return isCustom(item);
  *f(activeCategory === "doable") ret*rn canDo(item);
  return item.type*=== activeCategory;
}

function in*t(){
  stages.forEach(s => {
    $*"progress").innerHTML += `<option *alue="${s[0]}">${s[1]}</option>`;
* });

  ["character","world","dc",*gil","companySeals","ventures","pr*gress","hideLockedSpots"].forEach(*d => {
    if(id === "hideLockedSp*ts") $("hideLockedSpots").checked * profile.hideLockedSpots;
    else*$(id).value = profile[id];
  });

* $("marketText").value = "銀鉱 200\n*ルバーインゴット 659\nウィンドシャード 40";

  loa*CachedMarket();
  renderJobs();
  *enderAll();
}

function bind(){
  *ocument.querySelectorAll(".tabs bu*ton").forEach(btn => {
    btn.onc*ick = () => {
      document.query*electorAll(".tabs button,.tab").fo*Each(e => e.classList.remove("acti*e"));
      btn.classList.add("act*ve");
      $(btn.dataset.tab).cla*sList.add("active");
    };
  });
*  ["character","world","dc","gil",*companySeals","ventures","progress*,"hideLockedSpots"].forEach(id => *
    $(id).oninput = () => {
     *profile[id] = id === "hideLockedSp*ts"
        ? $(id).checked
      * : $(id).type === "number"
       *  ? Number($(id).value)
          * $(id).value;
      saveAll();
   *  renderAll();
    };
  });

  $("*ddJob").onclick = addJob;
  $("sav*Profile").onclick = () => {
    $(*saveStatus").textContent = " 保存しまし*";
    saveAll();
  };

  $("walkG*cha").onclick = walkGacha;
  $("sp*tSearch").oninput = renderSpots;
 *$("addSpot").onclick = addSpot;

 *$("fetchMarket").onclick = fetchMa*ket;
  $("clearMarketCache").oncli*k = clearMarketCache;
  $("autoDis*over").onclick = autoDiscover;
  $*"toggleOnlyDoable").onclick = togg*eOnlyDoable;
  $("addWatchItem").o*click = addWatchItem;
  $("analyze*arket").onclick = analyzeMarket;

* $("copyQr").onclick = () => navig*tor.clipboard?.writeText($("qrValu*").value);
  $("readQr").onclick =*readQr;
  $("spotQr").onclick = ()*=> {
    $("qrValue").value = "eor*ea-pocket://spot/" + selected.id;
*   renderQr();
  };
  $("cameraBtn*).onclick = startCamera;
  $("qrVa*ue").oninput = renderQr;
}

functi*n escapeQuote(t){
  return String(*).replaceAll("'","\\'");
}

functi*n renderJobs(){
  $("jobList").inn*rHTML = Object.entries(profile.job*).map(([n,l]) => `
    <div class=*job">
      <b>${n}</b>
      <inp*t type="number" min="0" max="100" *alue="${l}" onchange="updateJob('$*escapeQuote(n)}',this.value)">
   *  <button class="danger" onclick="*emoveJob('${escapeQuote(n)}')">削除<*button>
    </div>
  `).join("");
*  const missing = standardJobs.fil*er(j => profile.jobs[j] === undefi*ed).slice(0,12);
  $("quickJobs").*nnerHTML = missing.map(j => `<butt*n onclick="quickAdd('${j}')">+ ${j*</button>`).join("");
}

window.up*ateJob = (n,v) => {
  profile.jobs*n] = Math.max(0, Math.min(100, Num*er(v) || 0));
  saveAll();
  rende*All();
  renderJobs();
};

window.*emoveJob = n => {
  delete profile*jobs[n];
  saveAll();
  renderAll(*;
  renderJobs();
};

window.quick*dd = n => {
  profile.jobs[n] = 0;*  saveAll();
  renderAll();
  rend*rJobs();
};

function addJob(){
  *onst n = $("newJobName").value.tri*();
  if(!n) return;

  profile.jo*s[n] = Math.max(0, Math.min(100, N*mber($("newJobLevel").value) || 0)*;
  $("newJobName").value = "";
  *("newJobLevel").value = 1;

  save*ll();
  renderAll();
  renderJobs(*;
}

function visibleSpots(){
  re*urn spots.filter(s => !profile.hid*LockedSpots || order(s.progress) <* order(profile.progress));
}

func*ion renderSpots(){
  const q = $("*potSearch").value.toLowerCase();
 *const list = visibleSpots().filter*s =>
    [s.title,s.area,s.coord,l*bel(s.progress),...s.tags].join(" *).toLowerCase().includes(q)
  );

* $("spotTitle").textContent = `エオル*ア散歩：${label(profile.progress)}まで /*${list.length}件`;

  $("spotList")*innerHTML = list.map(s => `
    <d*v class="spot" onclick="selectSpot*'${s.id}')">
      <b>${order(s.pr*gress)<=order(profile.progress) ? *🔓" : "🔒"} ${s.title}</b>
      <*iv class="small">${s.area} / ${s.c*ord} / ${label(s.progress)}</div>
*     ${s.tags.map(t => `<span clas*="badge">#${t}</span>`).join("")}
*   </div>
  `).join("");

  render*potDetail();
}

window.selectSpot * id => {
  selected = spots.find(s*=> s.id === id) || selected;
  $("*rValue").value = "eorzea-pocket://*pot/" + selected.id;
  renderAll()*
};

function renderSpotDetail(){
* $("spotDetail").innerHTML = `
   *<h3>${selected.title}</h3>
    <p>*{selected.memo}</p>
    <div class*"item"><b>エリア</b><div>${selected.a*ea}</div></div>
    <div class="it*m"><b>座標</b><div>${selected.coord}*/div></div>
    <div class="item">*b>必要進行</b><div>${label(selected.pr*gress)}</div></div>
    <div class*"item"><b>おすすめ加工</b><div>${selecte*.filter}</div></div>
  `;
}

funct*on walkGacha(){
  const list = vis*bleSpots();
  selected = list[Math*floor(Math.random()*list.length)] *| spots[0];
  document.querySelect*r('[data-tab="spot"]').click();
  *enderAll();
}

function addSpot(){*  const name = $("spotName").value*trim();
  if(!name) return;

  con*t s = {
    id:"spot-"+Date.now(),*    title:name,
    area:$("spotAr*a").value || "未設定",
    coord:$("s*otCoord").value || "X:? Y:?",
    *rogress:profile.progress,
    tags*$("spotTags").value.split(/[、,\s]+*).filter(Boolean),
    filter:"Old*Digicam",
    memo:"ユーザー追加スポット",
 *  rating:4
  };

  spots.unshift(s*;
  selected = s;
  saveAll();
  r*nderAll();
}

function reasonText(*tem){
  const r = [];

  if(item.d*able) r.push("今のLvで採れる/作れる");
  el*e r.push("Lv不足・将来候補");

  if(item.*orldPrice >= 10000) r.push("単価が高い"*;
  else if(item.worldPrice >= 100*) r.push("単価そこそこ");

  if(item.api*.saleVelocity >= 5) r.push("販売速度が高*");
  else if(item.api?.saleVeloci*y >= 1) r.push("販売履歴あり");

  if(it*m.api?.totalQty <= 20) r.push("在庫が*ない");
  else if(item.api?.totalQty*<= 80) r.push("在庫やや少なめ");

  if(it*m.velocity === "高") r.push("回転枠");*  if(!item.api) r.push("相場取得後に再評価"*;

  return r.slice(0,4).join(" / *);
}

function discoveryScore(item*{
  const price = item.worldPrice *| 0;
  const sale = item.api?.sale*elocity || 0;
  const qty = item.a*i?.totalQty ?? 9999;

  let score * item.doable ? 50 : -40;

  if(pri*e >= 10000) score += 35;
  else if*price >= 3000) score += 25;
  else*if(price >= 1000) score += 18;
  e*se if(price >= 200) score += 10;
 *else score += 4;

  score += Math.*in(35, sale * 6);

  if(qty <= 20)*score += 20;
  else if(qty <= 80) *core += 12;
  else if(qty <= 200) *core += 6;

  if(item.velocity ===*"高") score += 8;

  return score;
*

function marketSorted(){
  retur* items
    .filter(byCategory)
   *.map(item => {
      const doable * canDo(item);
      const profit =*item.type === "craft" && item.mate*ialCost
        ? item.worldPrice * item.materialCost
        : item.*orldPrice;

      let priority = 0*

      if(doable) priority += 50;*      if(item.velocity === "高") pr*ority += 20;
      if(profit > 0) *riority += Math.min(30, profit / 2*);
      if(item.api?.saleVelocity* priority += Math.min(20, item.api*saleVelocity * 3);

      return {*..item, doable, profit, priority};*    })
    .sort((a,b) => b.priori*y - a.priority);
}

function rende*CategoryFilters(){
  const cats = *
    ["all","全部"],
    ["doable","*きる"],
    ["shard","シャード/クリスタル"],
*   ["gather","採集"],
    ["craft","*作"],
    ["future","将来用"],
    ["c*stom","ユーザー追加"]
  ];

  $("categor*Filters").innerHTML = cats.map(([k*y,text]) => `
    <button class="$*activeCategory===key ? "active" : *"}" onclick="setCategory('${key}')*>${text}</button>
  `).join("");
}*
window.setCategory = key => {
  a*tiveCategory = key;
  renderMarket*);
  renderDiscovery();
};

functi*n marketCard(item){
  const api = *tem.api
    ? `<div class="small">*PI: 最安 ${item.api.minPrice?.toLoca*eString() || "-"} / 在庫 ${item.api.*otalQty || 0} / 直近販売 ${item.api.sa*eVelocity?.toFixed(1) || 0}/日</div*`
    : "";

  const del = isCusto*(item)
    ? `<button class="dange*" onclick="removeWatchItem(${item.*temId})">監視から削除</button>`
    : ""*

  return `
    <div class="item *{item.doable ? "ok" : "lock"}">
  *   <b>${item.doable ? "🔓" : "🔒"}*${item.item}</b>
      <div class=*small">${item.job} Lv${item.requir*dLevel}〜 / ${typeLabel(item.type)}*/ 回転:${item.velocity}</div>
      *div>${item.worldPrice ? item.world*rice.toLocaleString() + " gil" : "*課"}</div>
      ${api}
      <p>${*tem.memo}</p>
      <div class="sm*ll">おすすめ理由：${reasonText(item)}</di*>
      <span class="badge">${item*doable ? item.advice : "今は不可"}</sp*n>
      ${del}
    </div>
  `;
}
*function renderMarket(){
  $("mark*tSub").textContent = `${profile.wo*ld}想定・今のギャザクラLv基準`;

  const sorte* = marketSorted();

  $("suggested*tems").innerHTML =
    sorted.filt*r(i => i.doable).slice(0,5).map(ma*ketCard).join("")
    || '<p class*"small">今できる監視候補がありません</p>';

  $(*marketList").innerHTML = sorted.ma*(marketCard).join("");

  if(!$("m*rketStatus").textContent){
    $("*arketStatus").textContent = market*resh
      ? "Universalis相場取得済み"
 *    : "未取得。ボタンで実相場を取得できます。";
  }

* renderCategoryFilters();
  render*atchManager();
}

function renderD*scovery(){
  const ranked = market*orted()
    .map(i => ({...i, disc*veryScore:discoveryScore(i)}))
   *.filter(i => onlyDoableDiscovery ?*i.doable : true)
    .sort((a,b) =* b.discoveryScore - a.discoverySco*e)
    .slice(0,10);

  $("discove*yList").innerHTML =
    ranked.map*i => `
      <div class="item ${i.*oable ? "ok" : "lock"}">
        <*>${i.doable ? "🔓" : "🔒"} ${i.ite*}</b>
        <div class="small">$*i.job} Lv${i.requiredLevel}〜 / 発掘ス*ア ${Math.round(i.discoveryScore)}<*div>
        <div>${i.worldPrice ?*i.worldPrice.toLocaleString() + " *il" : "価格未取得"}</div>
        ${i.a*i ? `<div class="small">最安 ${i.api*minPrice?.toLocaleString() || "-"}*/ 在庫 ${i.api.totalQty || 0} / 販売 $*i.api.saleVelocity?.toFixed(1) || *}/日</div>` : `<div class="small">ま*実相場未取得</div>`}
        <p>${i.memo*</p>
        <div class="small">おす*め理由：${reasonText(i)}</div>
       *<span class="badge">${i.doable ? "*日の候補" : "Lv不足"}</span>
      </div*
    `).join("")
    || '<p class=*small">発掘候補がありません。</p>';
}

functi*n renderWatchManager(){
  const li*t = items.filter(byCategory);

  $*"watchManager").innerHTML =
    li*t.map(i => `
      <div class="ite*">
        <b>${i.item}</b>
      * <div class="small">ItemID: ${i.it*mId || "未設定"} / ${typeLabel(i.type*} / ${i.job} Lv${i.requiredLevel}〜*/div>
        <div class="small">$*i.api ? "相場取得済み" : "未取得"}</div>
  *     ${isCustom(i) ? `<button clas*="danger" onclick="removeWatchItem*${i.itemId})">削除</button>` : `<spa* class="badge">標準候補</span>`}
     *</div>
    `).join("")
    || '<p *lass="small">監視候補がありません。</p>';
}

*sync function autoDiscover(){
  if*!marketFresh) await fetchMarket();*  renderDiscovery();
}

function t*ggleOnlyDoable(){
  onlyDoableDisc*very = !onlyDoableDiscovery;
  $("*oggleOnlyDoable").textContent = on*yDoableDiscovery ? "できるものだけ" : "全候*表示";
  renderDiscovery();
}

funct*on addWatchItem(){
  const name = *("watchName").value.trim();
  cons* itemId = Number($("watchId").valu*);
  const job = $("watchJob").val*e.trim() || "未設定";
  const require*Level = Number($("watchLevel").val*e) || 0;
  const type = $("watchTy*e").value || "other";

  if(!name *| !itemId){
    alert("アイテム名とItemI*は必須です。");
    return;
  }

  const*newItem = {
    item:name,
    ite*Id,
    type,
    job,
    require*Level,
    worldPrice:0,
    veloc*ty:"未取得",
    advice:"自動判定",
    m*mo:"ユーザー追加の監視アイテム"
  };

  customW*tchItems.push(newItem);
  items = *aseItems.concat(customWatchItems);*  localStorage.setItem("ep_custom_*atch_items", JSON.stringify(custom*atchItems));

  $("watchName").val*e = "";
  $("watchId").value = "";*  $("watchJob").value = "";
  $("w*tchLevel").value = "";

  marketFr*sh = false;
  $("marketStatus").te*tContent = "監視アイテムを追加しました。相場取得を押して*ださい。";

  renderMarket();
  render*iscovery();
}

function removeWatc*Item(itemId){
  customWatchItems =*customWatchItems.filter(i => Numbe*(i.itemId) !== Number(itemId));
  *tems = baseItems.concat(customWatc*Items);
  localStorage.setItem("ep*custom_watch_items", JSON.stringif*(customWatchItems));

  marketFres* = false;
  $("marketStatus").text*ontent = "監視アイテムを削除しました。必要なら相場を再取得*てください。";

  renderMarket();
  rend*rDiscovery();
}

function analyzeM*rket(){
  const rows = $("marketTe*t").value
    .split(/\n|,/)
    .*ap(l => l.trim())
    .filter(Bool*an)
    .map(line => {
      const*m = line.match(/^(.+?)\s*(\d{2,})/*;
      const name = m ? m[1].trim*) : line;
      const price = m ? *umber(m[2]) : 0;
      const known*= items.find(i => name.includes(i.*tem) || i.item.includes(name));

 *    return marketCard({
        ..*known,
        item:name,
        *orldPrice:price || known?.worldPri*e || 0,
        doable:known ? can*o(known) : true,
        job:known*.job || "未設定",
        requiredLev*l:known?.requiredLevel || 0,
     *  velocity:known?.velocity || "要確認*,
        advice:known?.advice || *相場確認",
        memo:known?.memo ||*"出品数と履歴を見て判断"
      });
    })
   *.join("");

  $("marketList").inne*HTML = rows;
}

async function fet*hMarket(){
  const ids = items.fil*er(i => i.itemId).map(i => i.itemI*).join(",");
  if(!ids) return;

 *const world = encodeURIComponent(p*ofile.world || "Shinryu");
  $("ma*ketStatus").textContent = "Univers*lisから取得中...";

  try{
    const ur* = `https://universalis.app/api/v2*${world}/${ids}?listings=10&entrie*=20`;
    const res = await fetch(*rl);

    if(!res.ok) throw new Er*or("HTTP " + res.status);

    con*t data = await res.json();

    ap*lyMarketData(data);

    localStor*ge.setItem("ep_market_cache", JSON*stringify({
      t:Date.now(),
  *   world:profile.world,
      data*    }));

    marketFresh = true;
*   $("marketStatus").textContent =*"取得成功: " + new Date().toLocaleStri*g();

    renderMarket();
    rend*rDiscovery();
  }catch(e){
    $("*arketStatus").innerHTML =
      `<*pan class="warn">取得失敗: ${e.message*。GitHub Pages上/HTTPSで再試行、または手入力を使っ*ください。</span>`;
  }
}

function app*yMarketData(data){
  const map = d*ta.items || {};

  items = items.m*p(item => {
    if(!item.itemId) r*turn item;

    const d =
      ma*[item.itemId] ||
      map[String(*tem.itemId)] ||
      (data.itemID*=== item.itemId ? data : null);

 *  if(!d) return item;

    const l*stings = d.listings || [];
    con*t history = d.recentHistory || d.s*les || [];

    const min = listin*s.length
      ? Math.min(...listi*gs.map(l => l.pricePerUnit || l.pr*ce || 999999999))
      : item.wor*dPrice;

    const qty = listings.*educe((s,l) => s + (l.quantity || *), 0);

    const sale =
      d.r*gularSaleVelocity ||
      d.nqSal*Velocity ||
      d.hqSaleVelocity*||
      0;

    item.worldPrice =*min || item.worldPrice;

    item.*pi = {
      minPrice:min,
      t*talQty:qty,
      saleVelocity:sal*,
      historyCount:history.lengt*
    };

    return item;
  });
}
*function loadCachedMarket(){
  try*
    const cache = JSON.parse(loca*Storage.getItem("ep_market_cache")*|| "null");

    if(cache && cache*data && Date.now() - cache.t < 216*0000){
      applyMarketData(cache*data);
      marketFresh = true;
 *    $("marketStatus").textContent * "キャッシュ相場を使用: " + new Date(cache.t*.toLocaleString();
    }
  }catch(*){
    console.warn(e);
  }
}

fun*tion clearMarketCache(){
  localSt*rage.removeItem("ep_market_cache")*
  marketFresh = false;
  items.fo*Each(i => i.api = null);
  $("mark*tStatus").textContent = "相場キャッシュを削*しました";
  renderMarket();
  renderD*scovery();
}

function renderDaily*){
  const tasks = [
    {id:"reta*ner",text:"リテイナー2人を出す",group:"毎回",*inutes:2},
    {id:"market",text:"*ケボ出品価格を見直す",group:"金策",minutes:5},*    {id:"ore",text:"銀鉱 or シャードを補充"*group:"金策",minutes:15},
    {id:"r*ulette",text:"占星術師でレベリングルレ",group:*育成",minutes:25},
    {id:"ss",text*"行ける散歩スポットでSS1枚",group:"SS",minute*:10}
  ];

  if((profile.jobs["採掘師*] || 0) >= 25){
    tasks.splice(2*0,{id:"silverOre",text:"銀鉱を10〜30個で*分け出品",group:"金策",minutes:15});
  }*
  if((profile.jobs["彫金師"] || 0) <*23){
    tasks.push({id:"gsm23",te*t:"彫金師をLv23まで上げる",group:"育成",minut*s:20});
  }

  if((profile.jobs["占*術師"] || 0) < 50){
    tasks.push({id:"ast50",text:"占星術師Lv50を目指す",group:"育成",minutes:25});
  }

  const remaining = tasks.filter(t => !localStorage.getItem("done_" + t.id));
  $("taskSummary").textContent = `${remaining.length}件 / 約${remaining.reduce((s,t)=>s+t.minutes,0)}分`;

  $("tasks").innerHTML = tasks.map(t => `
    <div class="task" onclick="toggleTask('${t.id}')">
      ${localStorage.getItem("done_"+t.id) ? "✅" : "⬜"} <b>${t.text}</b>
      <div class="small">${t.group} / ${t.minutes}分</div>
    </div>
  `).join("");

  $("plans").innerHTML = [
    "短時間 10分|リテイナー回収/再派遣|相場取得ボタンを押す|売れ残りを1回だけ調整",
    "普通 30分|今日のおすすめ品を採取/製作|占星ルレ1回|蒼天までの行けるスポットでSS1枚",
    "がっつり 60分|採掘30を目指す|彫金23まで上げてインゴット比較を解放|SS加工して投稿"
  ].map(p => {
    const a = p.split("|");
    return `<div class="item"><b>${a[0]}</b>${a.slice(1).map(x=>`<p>・${x}</p>`).join("")}</div>`;
  }).join("");
}

window.toggleTask = id => {
  if(localStorage.getItem("done_" + id)) localStorage.removeItem("done_" + id);
  else localStorage.setItem("done_" + id, "1");
  renderDaily();
};

function qrBits(text){
  let seed = 0;

  for(const c of text){
    seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  }

  let html = "";

  for(let i=0;i<441;i++){
    seed = (seed * 1664525 + 1013904223) >>> 0;
    html += `<div class="${(seed%7<3 || (i<147 && i%21<7)) ? "black" : "white"}"></div>`;
  }

  return html;
}

function renderQr(){
  $("qrValue").value = $("qrValue").value || "eorzea-pocket://spot/" + selected.id;
  $("qrBox").innerHTML = qrBits($("qrValue").value);
}

function readQr(){
  const id = $("qrValue").value.split("/").pop();
  const s = spots.find(i => i.id === id);

  if(s){
    selected = s;
    document.querySelector('[data-tab="spot"]').click();
  }

  $("scanLog").textContent = s ? "スポットを読み込みました：" + s.title : "QR文字列を受け取りました";
}

async function startCamera(){
  try{
    const stream = await navigator.mediaDevices.getUserMedia({
      video:{facingMode:"environment"}
    });

    $("video").srcObject = stream;
    $("scanLog").textContent = "カメラ起動OK。実装ではBarcodeDetectorでQR解析予定。";
  }catch(e){
    $("scanLog").textContent = "カメラ起動に失敗。HTTPS/権限を確認。";
  }
}

function renderAll(){
  renderSpots();
  renderMarket();
  renderDiscovery();
  renderDaily();
  renderQr();
}

bind();
init();
