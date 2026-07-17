import { K } from "./constants.js";
import { $, esc, escAttr, save } from "./utils.js";
import { state } from "./state.js";

export function renderToday(){
  const tasks=[
    "リテイナー2人を出す",
    "マケボ出品価格を見直す",
    "銀鉱 or シャードを補充",
    "占星術師でレベリングルレ",
    "行ける散歩スポットでSS1枚"
  ];
  if((state.jobs["採掘師"]||0)>=25)tasks.push("銀鉱を10〜30個で小分け出品");
  if((state.jobs["彫金師"]||0)<23)tasks.push("彫金師をLv23まで上げる");
  if((state.jobs["占星術師"]||0)<50)tasks.push("占星術師Lv50を目指す");

  $("taskList").innerHTML=tasks.map(t=>`
    <div class="item task ${state.done[t]?"done":""}" data-task="${escAttr(t)}">
      <span class="checkmark">${state.done[t]?"✓":""}</span>
      <span>${esc(t)}</span>
    </div>`).join("");

  document.querySelectorAll("[data-task]").forEach(el=>{
    el.onclick=()=>{
      const t=el.dataset.task;
      state.done[t]=!state.done[t];
      save(K.done,state.done);
      renderToday();
    };
  });

  $("taskProgress").textContent=`${tasks.filter(t=>state.done[t]).length} / ${tasks.length} 完了`;
}
