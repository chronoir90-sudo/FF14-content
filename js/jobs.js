import { quickJobs } from "./constants.js";
import { K } from "./constants.js";
import { $, esc, escAttr, num, save } from "./utils.js";
import { state } from "./state.js";
import { renderMarket } from "./market.js";
import { renderToday } from "./today.js";

export function renderJobs(){
  $("jobList").innerHTML=Object.entries(state.jobs).sort((a,b)=>b[1]-a[1]).map(([name,lv])=>`
    <div class="item">
      <b>${esc(name)}</b>
      <div class="row" style="margin-top:8px">
        <input type="number" value="${lv}" min="0" max="100" data-job="${escAttr(name)}">
        <button class="btn danger small" data-deljob="${escAttr(name)}">削除</button>
      </div>
    </div>
  `).join("");

  $("jobList").querySelectorAll("[data-job]").forEach(input=>{
    input.onchange=()=>{
      state.jobs[input.dataset.job]=num(input.value,0,100);
      save(K.jobs,state.jobs);
      renderJobs();
      renderMarket();
      renderToday();
    };
  });

  $("jobList").querySelectorAll("[data-deljob]").forEach(btn=>{
    btn.onclick=()=>{
      delete state.jobs[btn.dataset.deljob];
      save(K.jobs,state.jobs);
      renderJobs();
      renderMarket();
      renderToday();
    };
  });

  $("quickJobs").innerHTML=quickJobs.map(j=>`<button class="chip" data-quick="${escAttr(j)}">${esc(j)}</button>`).join("");
  $("quickJobs").querySelectorAll("[data-quick]").forEach(btn=>{
    btn.onclick=()=>{
      $("jobNameInput").value=btn.dataset.quick;
      $("jobLevelInput").focus();
    };
  });
}

export function addJob(){
  const name=$("jobNameInput").value.trim();
  if(!name)return alert("ジョブ名を入力してください");
  state.jobs[name]=num($("jobLevelInput").value,1,100);
  save(K.jobs,state.jobs);
  $("jobNameInput").value="";
  $("jobLevelInput").value=1;
  renderJobs();
  renderMarket();
  renderToday();
}
