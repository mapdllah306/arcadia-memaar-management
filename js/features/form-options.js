// Modular V0.2.1: createFormOptions. UI demo only.
export function createFormOptions(ctx) {
  const { data, companies } = ctx;
  function companyOptions(){return data.companies.map(c=>({value:c.id,label:c.name}));}
  function siteOptions(companyId){return data.sites.filter(s=>!companyId||s.companyId===companyId).map(s=>({value:s.id,label:s.name}));}
  function employeeOptions(siteId,department){return [{value:'',label:'بدون تكليف حالي'},...data.employees.filter(e=>(!siteId||e.siteId===siteId)&&(!department||e.department===department)).map(e=>({value:e.id,label:e.name+' — '+e.job}))];}
  return { companyOptions, siteOptions, employeeOptions };
}
