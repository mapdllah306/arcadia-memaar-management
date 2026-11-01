// Compatible with the V0.1 localStorage key, preserving existing demo edits.
export const STORAGE_KEY = 'am-ops-demo-v1';
export function createStore(seed) {
  let incoming=null;
  try { incoming=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null'); }
  catch (_) { incoming=null; }
  const valid=incoming && Array.isArray(incoming.companies) &&
    Array.isArray(incoming.sites) && Array.isArray(incoming.employees) &&
    Array.isArray(incoming.tasks) && Array.isArray(incoming.incidents);
  const data=valid ? incoming : structuredClone(seed);
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return true; }
    catch (error) { console.warn('Local demo storage is unavailable', error); return false; }
  }
  function resetData() {
    const fresh=structuredClone(seed);
    for (const key of Object.keys(data)) delete data[key];
    Object.assign(data,fresh);
    save();
  }
  return {data,save,resetData};
}
