// Modular V0.2.1: createDashboardPage. UI demo only.
export function createDashboardPage(ctx) {
  const { data, esc, site, companyName, siteName, deptName, fTasks, fEmployees, fSites, badge, priority, stat, heading, btn, panel, table, demoNotice } = ctx;
  function dashboard(){
    const tasks=fTasks(),people=fEmployees(),sites=fSites();
    const done=tasks.filter(t=>t.status==='done').length,opened=tasks.filter(t=>t.status!=='done').length;
    const present=people.filter(p=>p.presence==='present').length;
    const depts=['security','cleaning','maintenance'];
    const progress=depts.map(d=>{const arr=tasks.filter(t=>t.department===d);const percent=arr.length?Math.round(arr.filter(t=>t.status==='done').length/arr.length*100):0;return `<div class="progress-row"><div class="progress-meta"><span>${deptName(d)}</span><span>${percent}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div></div>`;}).join('');
    const siteRows=sites.slice(0,5).map(s=>{let es=people.filter(e=>e.siteId===s.id),t=tasks.filter(x=>x.siteId===s.id);return `<div class="overview-site"><div><div class="site-title">${esc(s.name)}</div><div class="site-sub">${companyName(s.companyId)} <span class="small-sep"></span> ${es.length} موظف</div></div><div class="site-right"><strong>${t.filter(x=>x.status!=='done').length}</strong><small>مهمة مفتوحة</small></div></div>`;}).join('')||'<div class="no-data">لا توجد مواقع</div>';
    const recent=[...tasks].sort((a,b)=>a.due.localeCompare(b.due)).slice(0,6);
    const rows=recent.map(t=>`<tr><td><b>${esc(t.title)}</b><br><span class="muted">${esc(t.id)}</span></td><td>${esc(siteName(t.siteId))}</td><td>${esc(deptName(t.department))}</td><td>${badge(t.status)}</td><td>${priority(t.priority)}</td><td><button class="table-link" data-action="task-detail" data-id="${esc(t.id)}">عرض</button></td></tr>`);
    return heading('Operations overview','لوحة التحكم الرئيسية','نظرة شاملة على عمليات الأمن والنظافة والصيانة في المواقع المختارة',btn('إضافة مهمة','new-task'))+demoNotice+
      `<section class="stats-grid">${stat('عدد المواقع',sites.length,'building','المولات والكمبوندات والمنشآت')}${stat('عدد الموظفين',people.length,'users',`${present} حاضر في البيانات التجريبية`)}${stat('المهام المكتملة',done,'check',`من أصل ${tasks.length} مهمة`)}${stat('المهام المفتوحة',opened,'alert','بانتظار التنفيذ أو قيد التنفيذ')}</section>`+
      `<section class="panel-grid">${panel('نسب إنجاز الأقسام',progress,'حسب المهام المسجلة')}${panel('حالة المواقع',siteRows,'المهام المفتوحة بكل موقع')}</section>`+
      panel('آخر المهام المسجلة',table(['المهمة','الموقع','القسم','الحالة','الأولوية','إجراء'],rows),'عرض تجريبي');
  }
  return { dashboard };
}
