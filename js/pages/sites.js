// Modular V0.2.1: createSitesPages. UI demo only.
export function createSitesPages(ctx) {
  const { data, state, icon, esc, company, site, companyName, fSites, badge, heading, btn, demoNotice } = ctx;
  function companies(){
    const cards=data.companies.filter(c=>state.company==='all'||state.company===c.id).map(c=>{const sites=data.sites.filter(s=>s.companyId===c.id),people=data.employees.filter(e=>e.companyId===c.id),tasks=data.tasks.filter(t=>t.companyId===c.id);return `<article class="data-card"><div class="company-card"><img class="brand-company-logo" src="${esc(c.logo)}" alt="شعار ${esc(c.name)}"><div><h3>${esc(c.name)}</h3><p>${esc(c.arabic)}</p></div></div><div class="card-bottom"><span>${sites.length} مواقع <span class="small-sep"></span> ${people.length} موظف</span><span>${tasks.filter(t=>t.status!=='done').length} مهمة مفتوحة</span></div></article>`;}).join('');
    return heading('Group administration','الشركات','الإدارة المشتركة للشركتين مع الفصل بين سجلات كل شركة')+demoNotice+`<div class="cards-grid">${cards||'<div class="empty-state">لا توجد شركات في الفلتر الحالي</div>'}</div>`;
  }
  function sitesPage(){
    const cards=fSites().map(s=>{const people=data.employees.filter(e=>e.siteId===s.id).length,tasks=data.tasks.filter(t=>t.siteId===s.id);return `<article class="data-card"><div class="card-top"><div class="card-icon">${icon('building')}</div>${badge('active')}</div><h3>${esc(s.name)}</h3><p>${esc(s.type)} <span class="small-sep"></span> ${esc(s.city)}<br>${esc(companyName(s.companyId))}</p><div class="card-bottom"><span>${people} موظفين</span><span>${tasks.length} مهام <span class="small-sep"></span> ${s.zones} منطقة</span></div></article>`;}).join('');
    return heading('Sites & facilities','المواقع والمنشآت','إدارة المولات والكمبوندات والمباني والمناطق',btn('إضافة موقع','new-site'))+demoNotice+`<div class="cards-grid">${cards||'<div class="empty-state">لا توجد مواقع ضمن النطاق الحالي</div>'}</div>`;
  }
  return { companies, sitesPage };
}
