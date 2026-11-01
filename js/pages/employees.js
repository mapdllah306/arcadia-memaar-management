// Modular V0.2.1: createEmployeePage. UI demo only.
export function createEmployeePage(ctx) {
  const { state, esc, employee, siteName, deptName, fEmployees, badge, heading, btn, panel, table, searchToolbar, demoNotice } = ctx;
  function employeesPage(){
    const search=state.search.trim().toLowerCase();
    const people=fEmployees().filter(e=>(e.name+' '+e.code+' '+e.job).toLowerCase().includes(search));
    const rows=people.map(e=>`<tr><td><strong>${esc(e.name)}</strong><br><span class="muted">${esc(e.code)}</span></td><td>${esc(e.job)}</td><td>${esc(deptName(e.department))}</td><td>${esc(siteName(e.siteId))}</td><td>${esc(e.shift)}</td><td>${badge(e.presence)}</td></tr>`);
    return heading('Workforce directory','الموظفون','ملفات الموظفين وتوزيعهم على المواقع والأقسام',btn('إضافة موظف','new-employee'))+demoNotice+panel('دليل الموظفين',searchToolbar('ابحث بالاسم أو الكود الوظيفي...')+`<div class="desktop-record-table">${table(['الموظف','الوظيفة','القسم','الموقع','الوردية','الحضور'],rows)}</div><div class="mobile-record-list">${people.length?people.map(e=>`<article class="mobile-record-card"><div class="record-top"><span class="record-id">${esc(e.code)}</span>${badge(e.presence)}</div><h3>${esc(e.name)}</h3><div class="record-meta"><span>${esc(e.job)}</span><span>${esc(deptName(e.department))}</span><span>${esc(siteName(e.siteId))}</span><span>${esc(e.shift)}</span></div></article>`).join(''):'<p class="no-data">لا يوجد موظفون ضمن نطاق البحث</p>'}</div>`,`${people.length} موظف`);
  }
  return { employeesPage };
}
