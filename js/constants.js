export const SUPABASE_URL = "https://jsftwygfwqzylgeievyo.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_1vD6HpCe--7Gk9ymoFRfhA_DccgpPvz";

export const K = {
  profile:"ep.profile",
  jobs:"ep.jobs",
  spots:"ep.spots",
  done:"ep.done",
  customWatch:"ep.customWatch",
  overrides:"ep.overrides",
  cache:"ep.cache",
  syncKey:"ep.syncKey"
};

export const progressLabels = {
  arr:"新生",
  hw:"蒼天",
  sb:"紅蓮",
  shb:"漆黒",
  ew:"暁月",
  dt:"黄金"
};

export const progressOrder = ["arr","hw","sb","shb","ew","dt"];

export const defaultProfile = {
  character:"Yuzu Chu-hi",
  world:"Shinryu",
  dc:"Meteor",
  progress:"hw",
  gil:48884,
  companySeals:9050,
  ventures:153,
  hideLockedSpots:true
};

export const defaultJobs = {
  "占星術師":47,
  "赤魔道士":59,
  "リーパー":90,
  "召喚士":35,
  "採掘師":26,
  "園芸師":22,
  "漁師":39,
  "調理師":35,
  "彫金師":0
};

export const quickJobs = [
  "ナイト","戦士","暗黒騎士","ガンブレイカー",
  "白魔道士","学者","占星術師","賢者",
  "モンク","竜騎士","忍者","侍","リーパー","ヴァイパー",
  "吟遊詩人","機工士","踊り子",
  "黒魔道士","召喚士","赤魔道士","ピクトマンサー","青魔道士",
  "木工師","鍛冶師","甲冑師","彫金師","革細工師","裁縫師","錬金術師","調理師",
  "採掘師","園芸師","漁師"
];

export const baseSpots = [
  {id:"s1",name:"ラベンダーベッド夕焼け桟橋",area:"ラベンダーベッド",coord:"X:11.5 Y:8.9",progress:"arr",tags:["夕焼け","水辺","柔らかい"],filter:"Faded Print / 暖色+25",memo:"水面反射を入れる。キャラは黒シルエット寄りでも映える。"},
  {id:"s2",name:"イシュガルド雪道・青い石畳",area:"イシュガルド：上層",coord:"X:7.2 Y:10.3",progress:"hw",tags:["雪","中世","青白い"],filter:"Cool Blue",memo:"暗めに撮って、部分ライトを顔〜上半身に当てると良い。"},
  {id:"s3",name:"アジス・ラー浮遊島シルエット",area:"アジス・ラー",coord:"X:26.2 Y:11.4",progress:"hw",tags:["SF","廃墟","浮遊島"],filter:"Cinematic",memo:"背景の巨大構造物を入れる。暗めにして輪郭を強調。"},
  {id:"s4",name:"クガネ夜景・朱雀門前",area:"クガネ",coord:"X:10.8 Y:9.7",progress:"sb",tags:["夜景","和風","街灯"],filter:"Old Digicam",memo:"提灯背景が強い。縦構図向き。"},
  {id:"s5",name:"エルピス花畑・白昼夢",area:"エルピス",coord:"X:13.5 Y:7.8",progress:"ew",tags:["花畑","幻想","白"],filter:"Faded Print",memo:"明るく淡く。余白を活かす。"},
  {id:"s6",name:"トライヨラ港・南国スナップ",area:"トライヨラ",coord:"X:12.0 Y:13.2",progress:"dt",tags:["南国","港","青空"],filter:"CCD Flash",memo:"青空と建物を強めに。"},
  {id:"s7",name:"グリダニア雨上がり小径",area:"グリダニア：旧市街",coord:"X:7.8 Y:6.2",progress:"arr",tags:["森","雨上がり","緑"],filter:"Soft Glow",memo:"石畳の反射を活かすと雰囲気が出る。"},
  {id:"s8",name:"リムサ夕暮れの下甲板",area:"リムサ・ロミンサ：下甲板層",coord:"X:9.6 Y:11.2",progress:"arr",tags:["港","夕暮れ","青"],filter:"Warm Street",memo:"海と街灯を一緒に入れるとコンデジ感が出る。"},
  {id:"s9",name:"ウルダハ王政庁前の夜景",area:"ウルダハ：ナル回廊",coord:"X:10.8 Y:11.1",progress:"arr",tags:["夜景","街","ゴールド"],filter:"Gold Night",memo:"暗部を締めると人物の輪郭が映える。"},
  {id:"s10",name:"クルザス西部高地・白銀の張り出し",area:"西部高地クルザス",coord:"X:16.4 Y:22.1",progress:"hw",tags:["雪山","高低差","白銀"],filter:"High Contrast",memo:"遠景を大きく入れてスケール感を出す。"},
  {id:"s11",name:"高地ドラヴァニア星見の崖",area:"高地ドラヴァニア",coord:"X:22.6 Y:18.9",progress:"hw",tags:["夜空","崖","静けさ"],filter:"Cool Night",memo:"夜にすると青の階調がきれい。"},
  {id:"s12",name:"ヤンサ竹林の逆光道",area:"ヤンサ",coord:"X:30.5 Y:15.3",progress:"sb",tags:["竹林","和風","逆光"],filter:"Faded Green",memo:"逆光で輪郭を出すと映える。"},
  {id:"s13",name:"紅玉海・朝焼けの船着き場",area:"紅玉海",coord:"X:10.7 Y:31.6",progress:"sb",tags:["海","朝焼け","東方"],filter:"Warm Rise",memo:"水面と空の色差を強調。"},
  {id:"s14",name:"アジムステップ草原の夕日",area:"アジムステップ",coord:"X:24.5 Y:21.0",progress:"sb",tags:["草原","夕日","広角"],filter:"Amber Field",memo:"地平線を低くして空を広く撮る。"},
  {id:"s15",name:"クリスタリウム水晶街路",area:"クリスタリウム",coord:"X:9.4 Y:12.8",progress:"shb",tags:["水晶","都会","青"],filter:"Crystal Pop",memo:"青い光源と人物の配置が大事。"},
  {id:"s16",name:"ラケティカ大森林・木漏れ日",area:"ラケティカ大森林",coord:"X:23.6 Y:11.8",progress:"shb",tags:["森","神秘","木漏れ日"],filter:"Soft Portrait",memo:"木漏れ日の下に立たせる。彩度を少し落としても綺麗。"},
  {id:"s17",name:"テンペスト深海の光柱",area:"テンペスト",coord:"X:33.1 Y:24.8",progress:"shb",tags:["海底","幻想","光"],filter:"Dream Blue",memo:"広角気味にすると空間の密度が出る。"},
  {id:"s18",name:"ラヴィリンソス温室回廊",area:"ラヴィリンソス",coord:"X:8.6 Y:28.4",progress:"ew",tags:["温室","未来","白基調"],filter:"Clean White",memo:"白背景で衣装の色を見せやすい。"},
  {id:"s19",name:"ウルティマ・トゥーレ星屑の床",area:"ウルティマ・トゥーレ",coord:"X:21.4 Y:8.9",progress:"ew",tags:["宇宙","星屑","孤高"],filter:"Stardust",memo:"シルエットと余白で壮大さを出す。"},
  {id:"s20",name:"オールド・シャーレアン白壁の朝",area:"オールド・シャーレアン",coord:"X:13.2 Y:10.8",progress:"ew",tags:["白壁","知的","朝"],filter:"Clean Film",memo:"朝の柔らかい光が似合う。"},
  {id:"s21",name:"トライヨラ市場の昼下がり",area:"トライヨラ",coord:"X:14.2 Y:12.0",progress:"dt",tags:["市場","南国","日常"],filter:"CCD Street",memo:"人通りのある街角スナップ向き。"},
  {id:"s22",name:"コザマル・カ港町石段",area:"コザマル・カ",coord:"X:14.0 Y:19.8",progress:"dt",tags:["石段","街並み","陽光"],filter:"Warm Street",memo:"階段を斜めに入れると立体感が出る。"},
  {id:"s23",name:"シャーローニ荒野の赤土夕景",area:"シャーローニ荒野",coord:"X:28.8 Y:12.6",progress:"dt",tags:["荒野","夕景","赤土"],filter:"Desert Gold",memo:"地平線を低めにして空を大きく。"},
  {id:"s24",name:"ヘリテージファウンド夜のネオン",area:"ヘリテージファウンド",coord:"X:17.7 Y:9.5",progress:"dt",tags:["ネオン","夜","近未来"],filter:"Cyber Night",memo:"光源を背景に置いて輪郭を強める。"}
];

export const baseWatch = [
  {id:"w2",name:"ファイアシャード",itemId:2,type:"shard",job:"採掘師/園芸師",level:1,cost:0},
  {id:"w3",name:"アイスシャード",itemId:3,type:"shard",job:"採掘師/園芸師",level:1,cost:0},
  {id:"w4",name:"ウィンドシャード",itemId:4,type:"shard",job:"採掘師/園芸師",level:1,cost:0},
  {id:"w5",name:"アースシャード",itemId:5,type:"shard",job:"採掘師/園芸師",level:1,cost:0},
  {id:"w6",name:"ライトニングシャード",itemId:6,type:"shard",job:"採掘師/園芸師",level:1,cost:0},
  {id:"w7",name:"ウォーターシャード",itemId:7,type:"shard",job:"採掘師/園芸師",level:1,cost:0},
  {id:"w8",name:"ファイアクリスタル",itemId:8,type:"shard",job:"採掘師/園芸師",level:26,cost:0},
  {id:"w9",name:"アイスクリスタル",itemId:9,type:"shard",job:"採掘師/園芸師",level:26,cost:0},
  {id:"w10",name:"ウィンドクリスタル",itemId:10,type:"shard",job:"採掘師/園芸師",level:26,cost:0},
  {id:"w11",name:"アースクリスタル",itemId:11,type:"shard",job:"採掘師/園芸師",level:26,cost:0},
  {id:"w12",name:"ライトニングクリスタル",itemId:12,type:"shard",job:"採掘師/園芸師",level:26,cost:0},
  {id:"w13",name:"ウォータークリスタル",itemId:13,type:"shard",job:"採掘師/園芸師",level:26,cost:0},
  {id:"w5113",name:"銀鉱",itemId:5113,type:"gather",job:"採掘師",level:25,cost:0},
  {id:"w5064",name:"シルバーインゴット",itemId:5064,type:"craft",job:"彫金師",level:23,cost:680},
  {id:"wg18",name:"古ぼけた地図G18",itemId:null,type:"future",job:"採掘師/園芸師",level:100,cost:0},
  {id:"wcopper",name:"銅鉱",itemId:null,type:"gather",job:"採掘師",level:1,cost:0},
  {id:"wtin",name:"錫鉱",itemId:null,type:"gather",job:"採掘師",level:6,cost:0},
  {id:"wiron",name:"鉄鉱",itemId:null,type:"gather",job:"採掘師",level:14,cost:0},
  {id:"wsilver-sand",name:"銀砂",itemId:null,type:"gather",job:"採掘師",level:23,cost:0},
  {id:"wmythril",name:"ミスリル鉱",itemId:null,type:"gather",job:"採掘師",level:40,cost:0},
  {id:"welectrum",name:"エレクトラム鉱",itemId:null,type:"gather",job:"採掘師",level:45,cost:0},
  {id:"wgold",name:"金鉱",itemId:null,type:"gather",job:"採掘師",level:50,cost:0},
  {id:"whardsilver",name:"ハードシルバー鉱",itemId:null,type:"gather",job:"採掘師",level:56,cost:0},
  {id:"wtitanium",name:"チタン鉱",itemId:null,type:"gather",job:"採掘師",level:60,cost:0},
  {id:"wnightsteel",name:"闇鉄鉱",itemId:null,type:"gather",job:"採掘師",level:80,cost:0},
  {id:"wmaple",name:"メープル原木",itemId:null,type:"gather",job:"園芸師",level:5,cost:0},
  {id:"woak",name:"オーク原木",itemId:null,type:"gather",job:"園芸師",level:25,cost:0},
  {id:"wwalnut",name:"ウォルナット原木",itemId:null,type:"gather",job:"園芸師",level:25,cost:0},
  {id:"wdarkchestnut",name:"ダークチェスナット原木",itemId:null,type:"gather",job:"園芸師",level:50,cost:0},
  {id:"wteak",name:"チーク原木",itemId:null,type:"gather",job:"園芸師",level:60,cost:0},
  {id:"wpalm",name:"パーム原木",itemId:null,type:"gather",job:"園芸師",level:90,cost:0},
  {id:"wlavender",name:"ラベンダー",itemId:null,type:"gather",job:"園芸師",level:16,cost:0},
  {id:"wclove",name:"クローヴ",itemId:null,type:"gather",job:"園芸師",level:53,cost:0},
  {id:"wcordial",name:"コーディアル",itemId:null,type:"craft",job:"錬金術師",level:50,cost:390},
  {id:"whicordial",name:"ハイコーディアル",itemId:null,type:"craft",job:"錬金術師",level:54,cost:780},
  {id:"wapple",name:"アップルタルト",itemId:null,type:"craft",job:"調理師",level:33,cost:260},
  {id:"wmarmalade",name:"マーマレード",itemId:null,type:"craft",job:"調理師",level:13,cost:120},
  {id:"wcoffee",name:"コーヒークッキー",itemId:null,type:"craft",job:"調理師",level:80,cost:980},
  {id:"wglue",name:"にかわ系素材",itemId:null,type:"craft",job:"錬金術師",level:12,cost:140},
  {id:"wlumber",name:"製作用木材候補",itemId:null,type:"craft",job:"木工師",level:20,cost:220},
  {id:"wingot",name:"製作用インゴット候補",itemId:null,type:"craft",job:"鍛冶師/甲冑師/彫金師",level:20,cost:260},
  {id:"wnewstyle",name:"新式素材候補",itemId:null,type:"future",job:"採掘師/園芸師/漁師/各クラフター",level:100,cost:0},
  {id:"wrare-fish",name:"高値魚の将来候補",itemId:null,type:"future",job:"漁師",level:90,cost:0}
];
