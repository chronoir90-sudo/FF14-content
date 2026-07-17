import { K, progressLabels, progressOrder, baseSpots } from "./constants.js";
import { $, esc, save } from "./utils.js";
import { state } from "./state.js";

export function allSpots(){return [...baseSpots,...state.spots];}
export function progressOk(p){return progressOrder.indexOf(p)<=progressOrder.indexOf(state.profile.progress);}

export function renderWalk(){
  const q=$("spotSearchInput").value.trim().toLowerCase();
  const visible=allSpots().filter(s=>{
    const ok=!state.profile.hideLockedSpots||progressOk(s.progress);
    const text=[s.name,s.area,s.coord,s.filter,s.memo,...s.tags].join(" ").toLowerCase();
    return ok&&(!q||text.includes(q));
  });

  if(!state.selectedSpot&&visible[0])state.selectedSpot=visible[0].id;

  $("spotList").innerHTML=visible.map(s=>`
    <div class="item spot-line ${state.selectedSpot===s.id?"active":""}" data-spot="${s.id}">
      <b>${progressOk(s.progress)?"🔓":"🔒"} ${esc(s.name)}</b>
      <div class="meta">${esc(s.area)} / ${esc(s.coord)} / ${progressLabels[s.progress]}</div>
      <div class="tags">${s.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
    </div>
  `).join("")||`<div class="item">条件に合うスポットがありません。</div>`;

  $("spotList").querySelectorAll("[data-spot]").forEach(el=>{
    el.onclick=()=>{
      state.selectedSpot=el.dataset.spot;
      renderWalk();
    };
  });

  const selected=allSpots().find(s=>s.id===state.selectedSpot)||visible[0];
  $("spotDetail").innerHTML=selected?`
    <div class="item">
      <h3>${esc(selected.name)}</h3>
      <p><b>エリア：</b>${esc(selected.area)}</p>
      <p><b>座標：</b>${esc(selected.coord)}</p>
      <p><b>必要進行：</b>${progressLabels[selected.progress]}</p>
      <p><b>加工：</b>${esc(selected.filter)}</p>
      <p>${esc(selected.memo)}</p>
      <div class="tags">${selected.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
    </div>
  `:`<div class="item">未選択</div>`;
}

export function gachaSpot(){
  const list=allSpots().filter(s=>progressOk(s.progress));
  if(!list.length)return;
  state.selectedSpot=list[Math.floor(Math.random()*list.length)].id;
  renderWalk();
}

export function addSpot(){
  const name=$("newSpotName").value.trim();
  const area=$("newSpotArea").value.trim();
  const coord=$("newSpotCoord").value.trim();
  if(!name||!area||!coord)return alert("スポット名・エリア・座標を入力してください");
  const spot={
    id:`custom-${Date.now()}`,
    name,area,coord,
    progress:state.profile.progress,
    tags:$("newSpotTags").value.split(/[、,]\s*/).filter(Boolean),
    filter:"未設定",
    memo:"追加スポット"
  };
  state.spots.push(spot);
  save(K.spots,state.spots);
  state.selectedSpot=spot.id;
  ["newSpotName","newSpotArea","newSpotCoord","newSpotTags"].forEach(id=>$(id).value="");
  renderWalk();
}
