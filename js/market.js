import { K, baseWatch } from "./constants.js";
import { $, esc, escAttr, num, fmt, save } from "./utils.js";
import { state } from "./state.js";

export function allWatch(){
  const base = baseWatch.map(x => ({
    favorite:false,
    note:"",
    ...x,
    ...(state.overrides[x.id] || {})
  }));

  const custom = state.customWatch.map(x => ({
    favorite:false,
    note:"",
    ...x
  }));

  return base.concat(custom);
}

export function jobLevel(req){
  return String(req).split("/").map(x=>state.jobs[x.trim()]||0).reduce((a,b)=>Math.max(a,b),0);
}

export function canDo(item){return jobLevel(item.job)>=item.level;}

export function marketOf(item){
  if(!item.itemId)return null;
  return state.cache.items[String(item.itemId)]||null;
}

export function hourly(item,m){
  if(!m||!m.lowest)return null;
  const unit=item.type==="shard"?1400:item.type==="gather"?260:item.type==="craft"?80:0;
  if(!unit)return null;
  return Math.max(0,Math.floor(m.lowest*.95)-Number(item.cost||0))*unit;
}

export function reasons(item,m){
  const r=[];
  if(canDo(item))r.push("今のLvで採れる/作れる");else r.push("Lv不足・将来候補");
  if(m){
    if(m.lowest>=1000)r.push("単価そこそこ");
    if(m.lowest>=10000)r.push("単価が高い");
    if(m.velocity>=1)r.push("販売履歴あり");
    if(m.velocity>=5)r.push("販売速度が高い");
    if(m.stock<=80)r.push("在庫やや少なめ");
    if(m.stock<=20)r.push("在庫が少ない");
  }else{
    r.push("相場取得後に再評価");
  }
  if(item.type==="shard")r.push("回転枠");
  return [...new Set(r)].slice(0,5);
}

export function score(item){
  const m=marketOf(item);
  let s=canDo(item)?45:-20;
  const h=hourly(item,m);
  if(h)s+=Math.min(45,Math.floor(h/8000));
  if(m){
    s+=Math.min(20,Math.floor(m.velocity*10));
    if(m.stock<=20)s+=14;else if(m.stock<=80)s+=7;
  }
  if(item.type==="shard")s+=8;
  return {item,m,h,score:s,reasons:reasons(item,m)};
}

export function filteredEntries(){
  const search = ($("watchSearchInput")?.value || "").trim().toLowerCase();
  const favoriteOnly = $("showOnlyFavorite")?.checked || false;

  return allWatch().filter(item => {
    if(state.category === "possible" && !canDo(item)) return false;
    if(state.category === "user" && !item.custom) return false;
    if(!["all","possible","user"].includes(state.category) && item.type !== state.category) return false;
    if(state.showOnly && !canDo(item)) return false;
    if(favoriteOnly && !item.favorite) return false;

    if(search){
      const bundle = [
        item.name,
        item.itemId || "",
        item.job,
        item.type,
        item.level,
        item.note || ""
      ].join(" ").toLowerCase();

      if(!bundle.includes(search)) return false;
    }

    return true;
  }).map(score).sort((a,b) => {
    if((b.item.favorite ? 1 : 0) !== (a.item.favorite ? 1 : 0)){
      return (b.item.favorite ? 1 : 0) - (a.item.favorite ? 1 : 0);
    }
    return b.score - a.score;
  });
}

export function renderMarket(){
  renderMarketFilters();
  const all=allWatch();
  $("marketSummary").innerHTML=`
    <div class="summary-box"><div class="muted">監視総数</div><div class="summary-value">${all.length}</div></div>
    <div class="summary-box"><div class="muted">今できる</div><div class="summary-value">${all.filter(canDo).length}</div></div>
    <div class="summary-box"><div class="muted">API対応</div><div class="summary-value">${all.filter(x=>x.itemId).length}</div></div>
    <div class="summary-box"><div class="muted">キャッシュ</div><div class="summary-value">${Object.keys(state.cache.items||{}).length}</div></div>
  `;

  const entries=filteredEntries();
  $("sellTodayList").innerHTML=entries.filter(e=>canDo(e.item)).slice(0,8).map((e,i)=>marketCard(e,i+1)).join("")||`<div class="item">今できる候補がありません。</div>`;
  $("discoverList").innerHTML=entries.slice(0,16).map(e=>marketCard(e,null)).join("")||`<div class="item">候補がありません。</div>`;
  $("watchItemList").innerHTML=all.map(watchRow).join("");
}

export function renderMarketFilters(){
  const cats=[
    ["all","全部"],
    ["possible","できる"],
    ["shard","シャード/クリスタル"],
    ["gather","採集"],
    ["craft","製作"],
    ["future","将来用"],
    ["user","ユーザー追加"]
  ];
  $("marketFilters").innerHTML=cats.map(([k,v])=>`<button class="chip ${state.category===k?"active":""}" data-cat="${k}">${v}</button>`).join("");
  $("marketFilters").querySelectorAll("[data-cat]").forEach(btn=>{
    btn.onclick=()=>{
      state.category=btn.dataset.cat;
      renderMarket();
    };
  });
}

function marketCard(e,rank){
  const item = e.item;
  const m = e.m;

  return `
  <div class="item ${canDo(item) ? "ok" : "lock"}">
    <div class="row">
      ${rank ? `<span class="tag warn">#${rank}</span>` : ""}
      <button class="btn small" data-togglefavorite="${item.id}">
        ${item.favorite ? "★" : "☆"}
      </button>
      <b>${esc(item.name)}</b>
      <span class="tag">${typeLabel(item.type)}</span>
      <span class="tag ${canDo(item) ? "ok" : ""}">
        ${canDo(item) ? "できる" : "Lv不足"}
      </span>
    </div>

    <div class="meta">
      ${esc(item.job)} Lv${item.level}〜 / ItemID: ${item.itemId || "未設定"}
    </div>

    ${item.note ? `<div class="meta">メモ：${esc(item.note)}</div>` : ""}

    <div class="summary" style="margin-top:10px">
      <div class="summary-box">
        <div class="muted">最安</div>
        <div class="summary-value">${m ? fmt(m.lowest) + " ギル" : "未取得"}</div>
      </div>
      <div class="summary-box">
        <div class="muted">在庫</div>
        <div class="summary-value">${m ? fmt(m.stock) : "未取得"}</div>
      </div>
      <div class="summary-box">
        <div class="muted">販売速度</div>
        <div class="summary-value">${m ? m.velocity.toFixed(2) : "未取得"}</div>
      </div>
      <div class="summary-box">
        <div class="muted">1h利益</div>
        <div class="summary-value">${e.h ? fmt(e.h) + " ギル" : "未算出"}</div>
      </div>
    </div>

    <div class="tags">
      ${e.reasons.map(r => `<span class="tag">${esc(r)}</span>`).join("")}
    </div>
  </div>`;
}

function watchRow(item){
  const isEditing = state.editingWatchId === item.id;
  const itemIdValue = item.itemId ?? "";
  const costValue = item.cost ?? 0;
  const noteValue = item.note || "";

  return `
  <div class="item">
    <div class="row">
      <button class="btn small" data-togglefavorite="${item.id}">
        ${item.favorite ? "★" : "☆"}
      </button>
      <b>${esc(item.name)}</b>
      <span class="tag">${typeLabel(item.type)}</span>
      <button class="btn small" data-editwatch="${item.id}">
        ${isEditing ? "閉じる" : "編集"}
      </button>
      ${item.custom ? `<button class="btn danger small" data-delwatch="${item.id}">削除</button>` : `<span class="tag">標準</span>`}
    </div>

    <div class="meta">
      ItemID: ${item.itemId || "未設定"} / ${esc(item.job)} Lv${item.level}〜 / 素材費 ${fmt(item.cost || 0)}
    </div>

    ${item.note ? `<div class="meta">メモ：${esc(item.note)}</div>` : ""}

    ${isEditing ? `
      <div style="margin-top:12px">
        <div class="form-grid two-col">
          <label>
            <span>アイテム名</span>
            <input id="edit-name-${escAttr(item.id)}" value="${escAttr(item.name)}">
          </label>

          <label>
            <span>ItemID</span>
            <input id="edit-itemid-${escAttr(item.id)}" type="number" value="${escAttr(itemIdValue)}" placeholder="未設定なら空欄">
          </label>

          <label>
            <span>必要ジョブ</span>
            <input id="edit-job-${escAttr(item.id)}" value="${escAttr(item.job)}">
          </label>

          <label>
            <span>必要Lv</span>
            <input id="edit-level-${escAttr(item.id)}" type="number" min="0" max="100" value="${escAttr(item.level)}">
          </label>

          <label>
            <span>タイプ</span>
            <select id="edit-type-${escAttr(item.id)}">
              <option value="user" ${item.type==="user"?"selected":""}>ユーザー追加</option>
              <option value="shard" ${item.type==="shard"?"selected":""}>シャード/クリスタル</option>
              <option value="gather" ${item.type==="gather"?"selected":""}>採集</option>
              <option value="craft" ${item.type==="craft"?"selected":""}>製作</option>
              <option value="future" ${item.type==="future"?"selected":""}>将来用</option>
            </select>
          </label>

          <label>
            <span>素材費</span>
            <input id="edit-cost-${escAttr(item.id)}" type="number" min="0" value="${escAttr(costValue)}">
          </label>
        </div>

        <label>
          <span>出品メモ</span>
          <textarea id="edit-note-${escAttr(item.id)}" placeholder="例：20個ずつ出品。200ギル以下なら待ち。">${esc(noteValue)}</textarea>
        </label>

        <label class="switch">
          <input id="edit-favorite-${escAttr(item.id)}" type="checkbox" ${item.favorite ? "checked" : ""}>
          <span>お気に入りにする</span>
        </label>

        <div class="row" style="margin-top:10px">
          <button class="btn primary small" data-savewatch="${item.id}">保存</button>
          <button class="btn small" data-cancelwatch="${item.id}">キャンセル</button>
          ${item.custom ? "" : `<button class="btn danger small" data-resetwatch="${item.id}">標準候補を初期値に戻す</button>`}
        </div>
      </div>
    ` : ""}
  </div>`;
}

document.addEventListener("click", e => {
  const editId = e.target.dataset.editwatch;
  const saveId = e.target.dataset.savewatch;
  const cancelId = e.target.dataset.cancelwatch;
  const deleteId = e.target.dataset.delwatch;
  const resetId = e.target.dataset.resetwatch;
  const favoriteId = e.target.dataset.togglefavorite;

  if (favoriteId) {
    toggleFavorite(favoriteId);
    return;
  }

  if (editId) {
    state.editingWatchId = state.editingWatchId === editId ? null : editId;
    renderMarket();
    return;
  }

  if (cancelId) {
    state.editingWatchId = null;
    renderMarket();
    return;
  }

  if (saveId) {
    saveWatchEdit(saveId);
    return;
  }

  if (deleteId) {
    state.customWatch = state.customWatch.filter(x => x.id !== deleteId);
    save(K.customWatch, state.customWatch);
    state.editingWatchId = null;
    renderMarket();
    return;
  }

  if (resetId) {
    delete state.overrides[resetId];
    save(K.overrides, state.overrides);
    state.editingWatchId = null;

    state.cache = {world:"",t:0,items:{}};
    save(K.cache, state.cache);

    renderMarket();
    setMarketStatus("標準候補を初期値に戻しました。", "ok");
    return;
  }
});

function toggleFavorite(id){
  const current = allWatch().find(x => x.id === id);
  if (!current) return;

  const nextFavorite = !current.favorite;

  if (current.custom) {
    state.customWatch = state.customWatch.map(item => {
      if (item.id !== id) return item;
      return {
        ...item,
        favorite: nextFavorite
      };
    });

    save(K.customWatch, state.customWatch);
  } else {
    state.overrides[id] = {
      ...(state.overrides[id] || {}),
      favorite: nextFavorite
    };

    save(K.overrides, state.overrides);
  }

  renderMarket();
}

function saveWatchEdit(id){
  const current = allWatch().find(x => x.id === id);
  if (!current) return;

  const name = $(`edit-name-${id}`).value.trim() || current.name;
  const rawItemId = $(`edit-itemid-${id}`).value.trim();
  const itemId = rawItemId === "" ? null : Number(rawItemId);
  const job = $(`edit-job-${id}`).value.trim() || current.job;
  const level = num($(`edit-level-${id}`).value, 0, 100);
  const type = $(`edit-type-${id}`).value || current.type;
  const cost = num($(`edit-cost-${id}`).value, 0);
  const note = $(`edit-note-${id}`).value.trim();
  const favorite = $(`edit-favorite-${id}`).checked;

  const edited = {
    name,
    itemId,
    job,
    level,
    type,
    cost,
    note,
    favorite
  };

  if (current.custom) {
    state.customWatch = state.customWatch.map(item => {
      if (item.id !== id) return item;
      return {
        ...item,
        ...edited,
        custom: true
      };
    });

    save(K.customWatch, state.customWatch);
  } else {
    state.overrides[id] = {
      ...(state.overrides[id] || {}),
      ...edited
    };

    save(K.overrides, state.overrides);
  }

  state.editingWatchId = null;

  // ItemIDを変えた後は古い相場キャッシュがズレる可能性があるので消す
  state.cache = {world:"",t:0,items:{}};
  save(K.cache, state.cache);

  setMarketStatus("監視候補を保存しました。必要なら相場を再取得してください。", "ok");
  renderMarket();
}

function typeLabel(t){
  return {shard:"シャード/クリスタル",gather:"採集",craft:"製作",future:"将来用",user:"ユーザー追加"}[t]||t;
}

export function addWatch(){
  const name=$("watchName").value.trim();
  const job=$("watchJob").value.trim();
  if(!name||!job)return alert("アイテム名と必要ジョブを入力してください");
  state.customWatch.push({
    id:`cw-${Date.now()}`,
    name,
    itemId:$("watchItemId").value?Number($("watchItemId").value):null,
    job,
    level:num($("watchLevel").value,1,100),
    type:$("watchType").value,
    cost:num($("watchMaterialCost").value,0),
    favorite:false,
    note:"",
    custom:true
  });
  save(K.customWatch,state.customWatch);
  ["watchName","watchItemId","watchJob"].forEach(id=>$(id).value="");
  $("watchLevel").value=1;
  $("watchMaterialCost").value=0;
  renderMarket();
}

export function parseOcr(){
  const lines = $("ocrInput").value
    .split(/\n/)
    .map(x => x.trim())
    .filter(Boolean);

  $("ocrCards").innerHTML = lines.map(line => {
    const m = line.match(/^(.+?)\s+([\d,]+)$/);
    const name = m ? m[1].trim() : line;
    const price = m ? Number(m[2].replace(/,/g, "")) : null;

    return `
      <div class="item">
        <b>${esc(name)}</b>
        <div class="meta">
          ${price !== null ? fmt(price) + " ギル" : "価格未解析"}
        </div>
      </div>
    `;
  }).join("") || `<div class="item">入力してください。</div>`;
}

export async function fetchMarket(){
  const ids=allWatch().filter(x=>x.itemId).map(x=>x.itemId);
  if(!ids.length)return setMarketStatus("ItemIDがありません。","err");
  if(state.cache.world===state.profile.world && Date.now()-state.cache.t<21600000){
    setMarketStatus("6時間以内のキャッシュを使用しました。","ok");
    renderMarket();
    return;
  }
  setMarketStatus("Universalisから取得中…","");
  try{
    const url=`https://universalis.app/api/v2/${encodeURIComponent(state.profile.world)}/${ids.join(",")}?listings=10&entries=20`;
    const res=await fetch(url);
    if(!res.ok)throw new Error("HTTP "+res.status);
    const json=await res.json();
    const parsed={};
    ids.forEach(id=>{
      const raw=json.items?.[String(id)]||json.items?.[id]||null;
      if(!raw){parsed[String(id)]={lowest:null,stock:0,velocity:0};return;}
      const listings=raw.listings||[];
      const prices=listings.map(x=>Number(x.pricePerUnit||x.price||0)).filter(x=>x>0);
      parsed[String(id)]={
        lowest:prices.length?Math.min(...prices):Number(raw.minPriceNQ||raw.minPrice||0)||null,
        stock:listings.reduce((s,x)=>s+Number(x.quantity||1),0),
        velocity:Number(raw.regularSaleVelocity||raw.nqSaleVelocity||0)
      };
    });
    state.cache={world:state.profile.world,t:Date.now(),items:parsed};
    save(K.cache,state.cache);
    setMarketStatus("相場を取得しました。","ok");
    renderMarket();
  }catch(err){
    console.error(err);
    setMarketStatus("相場取得に失敗しました。ワールド名・通信・CORSを確認してください。","err");
  }
}

export function clearCache(){
  state.cache={world:"",t:0,items:{}};
  save(K.cache,state.cache);
  setMarketStatus("キャッシュを削除しました。","ok");
  renderMarket();
}

export function setMarketStatus(text,mode){
  $("marketStatus").textContent=text;
  $("marketStatus").className="status "+(mode||"");
}
