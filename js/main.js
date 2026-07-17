import { progressLabels } from "./constants.js";
import { $ } from "./utils.js";
import { state } from "./state.js";
import { renderProfile, saveProfile, cloudSave, cloudLoad } from "./profile.js";
import { renderJobs, addJob } from "./jobs.js";
import { renderWalk, gachaSpot, addSpot } from "./walk.js";
import { renderMarket, fetchMarket, clearCache, addWatch, parseOcr } from "./market.js";
import { renderToday } from "./today.js";

export function renderAll(){
  renderProfile();
  renderJobs();
  renderWalk();
  renderMarket();
  renderToday();
}

function bind(){
  document.querySelectorAll(".tab-btn").forEach(btn=>{
    btn.onclick=()=>{
      document.querySelectorAll(".tab-btn,.panel").forEach(x=>x.classList.remove("active"));
      btn.classList.add("active");
      $(`tab-${btn.dataset.tab}`).classList.add("active");
    };
  });

  $("saveProfileBtn").onclick=saveProfile;
  ["profileCharacter","profileWorld","profileDc","profileProgress","profileGil","profileSeals","profileVentures","hideLockedSpots"].forEach(id=>{
    $(id).onchange=saveProfile;
  });

  $("cloudSaveBtn").onclick=cloudSave;
  $("cloudLoadBtn").onclick=cloudLoad;

  $("addJobBtn").onclick=addJob;
  $("gachaSpotBtn").onclick=gachaSpot;
  $("clearSpotSearchBtn").onclick=()=>{$("spotSearchInput").value="";renderWalk();};
  $("spotSearchInput").oninput=renderWalk;
  $("addSpotBtn").onclick=addSpot;

  $("fetchMarketBtn").onclick=fetchMarket;
  $("clearCacheBtn").onclick=clearCache;
  $("showOnlyPossible").onchange=e=>{state.showOnly=e.target.checked;renderMarket();};
  $("watchSearchInput").oninput = renderMarket;
  $("showOnlyFavorite").onchange = renderMarket;
  $("addWatchBtn").onclick=addWatch;
  $("parseOcrBtn").onclick=parseOcr;
}

function init(){
  Object.keys(progressLabels).forEach(k=>{
    $("profileProgress").insertAdjacentHTML("beforeend",`<option value="${k}">${progressLabels[k]}</option>`);
  });
  bind();
  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
