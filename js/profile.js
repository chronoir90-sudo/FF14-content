import { K, SUPABASE_URL, SUPABASE_ANON_KEY, defaultProfile, defaultJobs } from "./constants.js";
import { $, num, save } from "./utils.js";
import { state } from "./state.js";
import { renderAll } from "./main.js";

export function renderProfile(){
  $("profileCharacter").value=state.profile.character||"";
  $("profileWorld").value=state.profile.world||"";
  $("profileDc").value=state.profile.dc||"";
  $("profileProgress").value=state.profile.progress||"hw";
  $("profileGil").value=state.profile.gil||0;
  $("profileSeals").value=state.profile.companySeals||0;
  $("profileVentures").value=state.profile.ventures||0;
  $("hideLockedSpots").checked=!!state.profile.hideLockedSpots;
  $("syncKey").value=localStorage.getItem(K.syncKey)||"";
  $("worldBadge").textContent=`${state.profile.dc||"Meteor"} / ${state.profile.world||"Shinryu"}`;
}

export function saveProfile(){
  state.profile={
    character:$("profileCharacter").value.trim()||"Yuzu Chu-hi",
    world:$("profileWorld").value.trim()||"Shinryu",
    dc:$("profileDc").value.trim()||"Meteor",
    progress:$("profileProgress").value||"hw",
    gil:num($("profileGil").value,0),
    companySeals:num($("profileSeals").value,0),
    ventures:num($("profileVentures").value,0),
    hideLockedSpots:$("hideLockedSpots").checked
  };
  save(K.profile,state.profile);
  localStorage.setItem(K.syncKey,$("syncKey").value.trim());
  renderAll();
  setSync("端末に保存しました","ok");
}

export function setSync(text,mode){
  $("syncStatus").textContent=text;
  $("syncStatus").className="status "+(mode||"");
}

export function exportData(){
  return {
    profile:state.profile,
    jobs:state.jobs,
    spots:state.spots,
    done:state.done,
    customWatch:state.customWatch,
    overrides:state.overrides,
    cache:state.cache
  };
}

export function importData(data){
  state.profile=data.profile||defaultProfile;
  state.jobs=data.jobs||defaultJobs;
  state.spots=data.spots||[];
  state.done=data.done||{};
  state.customWatch=data.customWatch||[];
  state.overrides=data.overrides||{};
  state.cache=data.cache||{world:"",t:0,items:{}};

  save(K.profile,state.profile);
  save(K.jobs,state.jobs);
  save(K.spots,state.spots);
  save(K.done,state.done);
  save(K.customWatch,state.customWatch);
  save(K.overrides,state.overrides);
  save(K.cache,state.cache);

  renderAll();
}

export async function cloudSave(){
  const key=$("syncKey").value.trim();
  if(!key)return setSync("同期キーを入力してください。","err");
  localStorage.setItem(K.syncKey,key);
  saveProfile();
  if(!SUPABASE_URL||!SUPABASE_ANON_KEY)return setSync("Supabase URL / anon key が未設定です。","err");

  const data=exportData();
  try{
    const res=await fetch(`${SUPABASE_URL}/rest/v1/eorzea_pocket_data?on_conflict=user_key`,{
      method:"POST",
      headers:{
        apikey:SUPABASE_ANON_KEY,
        Authorization:`Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type":"application/json",
        Prefer:"resolution=merge-duplicates"
      },
      body:JSON.stringify({user_key:key,data,updated_at:new Date().toISOString()})
    });
    if(!res.ok)throw new Error("HTTP "+res.status);
    setSync("クラウドへ保存しました。","ok");
  }catch(e){
    console.error(e);
    setSync("クラウド保存に失敗しました。Supabase設定を確認してください。","err");
  }
}

export async function cloudLoad(){
  const key=$("syncKey").value.trim();
  if(!key)return setSync("同期キーを入力してください。","err");
  localStorage.setItem(K.syncKey,key);
  if(!SUPABASE_URL||!SUPABASE_ANON_KEY)return setSync("Supabase URL / anon key が未設定です。","err");

  try{
    const url=`${SUPABASE_URL}/rest/v1/eorzea_pocket_data?user_key=eq.${encodeURIComponent(key)}&select=data,updated_at`;
    const res=await fetch(url,{
      headers:{apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`}
    });
    if(!res.ok)throw new Error("HTTP "+res.status);
    const rows=await res.json();
    if(!rows.length)return setSync("クラウドにデータがありません。","err");
    importData(rows[0].data);
    setSync("クラウドから読み込みました。","ok");
  }catch(e){
    console.error(e);
    setSync("クラウド読み込みに失敗しました。","err");
  }
}
