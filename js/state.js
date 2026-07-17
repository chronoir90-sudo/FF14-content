import { K, defaultProfile, defaultJobs } from "./constants.js";
import { load } from "./utils.js";

export const state = {
  profile: load(K.profile, defaultProfile),
  jobs: load(K.jobs, defaultJobs),
  spots: load(K.spots, []),
  done: load(K.done, {}),
  customWatch: load(K.customWatch, []),
  overrides: load(K.overrides, {}),
  cache: load(K.cache, {world:"",t:0,items:{}}),
  selectedSpot:null,
  category:"all",
  showOnly:false,
  editingWatchId:null
};
