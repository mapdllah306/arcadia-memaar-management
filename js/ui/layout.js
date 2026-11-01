// Modular V0.2.2: createLayout. UI demo only.
export function createLayout(ctx) {
  const { $, data, state, icon, esc, NAV, company, site, dashboard, companies, sitesPage, employeesPage, tasksPage, attendance, reports, settings } = ctx;
  function renderPage(){
    const renderers={dashboard,companies,sites:sitesPage,employees:employeesPage,tasks:()=>tasksPage(),security:()=>tasksPage('security'),cleaning:()=>tasksPage('cleaning'),maintenance:()=>tasksPage('maintenance'),attendance,reports,settings};
    $('side-nav').innerHTML=NAV.map(([id,ic,title])=>`<button class="nav-item ${state.page===id?'active':''}" data-page="${id}" ${state.page===id?'aria-current="page"':''}>${icon(ic)}<span>${title}</span></button>`).join('');
    const label=NAV.find(x=>x[0]===state.page)?.[2]||'لوحة التحكم';
    $('breadcrumb').innerHTML=`النظام <span class="small-sep"></span> <strong>${esc(label)}</strong>`;
    const mobileLabel=$('mobile-page-title');if(mobileLabel)mobileLabel.textContent=label;
    document.querySelectorAll('#mobile-bottom-nav [data-page]').forEach(button=>{const active=button.dataset.page===state.page;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
    $('content').innerHTML=(renderers[state.page]||dashboard)();
  }
  function renderFilters(){
    $('company-filter').innerHTML=`<option value="all">جميع الشركات</option>`+data.companies.map(c=>`<option value="${esc(c.id)}" ${state.company===c.id?'selected':''}>${esc(c.name)}</option>`).join('');
    if(state.site!=='all'&&!data.sites.some(s=>s.id===state.site&&(state.company==='all'||s.companyId===state.company)))state.site='all';
    $('site-filter').innerHTML=`<option value="all">جميع المواقع</option>`+data.sites.filter(s=>state.company==='all'||s.companyId===state.company).map(s=>`<option value="${esc(s.id)}" ${state.site===s.id?'selected':''}>${esc(s.name)}</option>`).join('');
  }
  function refresh(){renderFilters();renderPage();}
  return { renderPage, renderFilters, refresh };
}
