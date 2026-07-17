export const $ = id => document.getElementById(id);

export function esc(s){
  return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

export function escAttr(s){
  return esc(s).replace(/`/g,"&#96;");
}

export function num(v,min=0,max=999999999){
  const n=Number(v);
  if(!Number.isFinite(n))return min;
  return Math.max(min,Math.min(max,Math.floor(n)));
}

export function fmt(n){
  return Number(n||0).toLocaleString("ja-JP");
}

export function clone(v){
  return JSON.parse(JSON.stringify(v));
}

export function load(k,fallback){
  try{
    const v=localStorage.getItem(k);
    return v?JSON.parse(v):clone(fallback);
  }catch{
    return clone(fallback);
  }
}

export function save(k,v){
  localStorage.setItem(k,JSON.stringify(v));
}
