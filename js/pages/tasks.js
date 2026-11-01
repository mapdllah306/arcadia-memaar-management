// Modular V0.2.1: createTasksPage. UI demo only.
export function createTasksPage(ctx) {
  const { data, state, esc, company, site, siteName, employeeName, deptName, fTasks, badge, priority, fmtDate, heading, btn, panel, table, searchToolbar, demoNotice, tile, mobileTaskCard } = ctx;
  function tasksPage(dept){
    const q=state.search.trim().toLowerCase();
    let tasks=fTasks().filter(t=>!dept||t.department===dept).filter(t=>state.status==='all'||t.status===state.status).filter(t=>(t.title+' '+t.id+' '+siteName(t.siteId)+' '+employeeName(t.assignedTo)).toLowerCase().includes(q));
    const label=dept?deptName(dept):'المهام والتكليفات';
    const desc=dept==='security'?'تنظيم تكليفات الأمن والجولات والملاحظات الأمنية':dept==='cleaning'?'تنظيم أعمال النظافة اليومية ومتابعة جودتها':dept==='maintenance'?'استقبال أعطال الموقع ومتابعة أعمال الإصلاح':'إنشاء وتوزيع المهام ومتابعة تنفيذها في جميع الأقسام';
    const rows=tasks.map(t=>`<tr><td><b>${esc(t.title)}</b><br><span class="muted">${esc(t.id)}</span></td><td>${esc(siteName(t.siteId))}</td>${dept?'':`<td>${esc(deptName(t.department))}</td>`}<td>${esc(employeeName(t.assignedTo))}</td><td>${fmtDate(t.due)}</td><td>${priority(t.priority)}</td><td>${badge(t.status)}</td><td><button class="table-link" data-action="task-detail" data-id="${esc(t.id)}">التفاصيل</button></td></tr>`);
    const heads=['المهمة','الموقع',...(dept?[]:['القسم']),'المكلف','الموعد','الأولوية','الحالة','إجراء'];
    const extra=dept==='security'?`<div class="mini-grid">${tile('المهام الأمنية',tasks.length,'إجمالي المهام')}${tile('المهام قيد التنفيذ',tasks.filter(t=>t.status==='progress').length,'بحاجة إلى متابعة')}${tile('البلاغات الأمنية',data.incidents.filter(i=>(state.site==='all'||i.siteId===state.site)&&(!state.company||state.company==='all'||site(i.siteId)?.companyId===state.company)).length,'سجلات توضيحية')}</div>`:
      dept==='cleaning'?`<div class="mini-grid">${tile('مهام النظافة',tasks.length,'مجدولة ومسندة')}${tile('مهام مكتملة',tasks.filter(t=>t.status==='done').length,'ضمن النطاق المختار')}${tile('قيد المتابعة',tasks.filter(t=>t.status!=='done').length,'لم تغلق بعد')}</div>`:
      dept==='maintenance'?`<div class="mini-grid">${tile('بلاغات الصيانة',tasks.length,'تحت المتابعة')}${tile('عالية الأولوية',tasks.filter(t=>t.priority==='high').length,'تحتاج اهتمامًا')}${tile('مكتملة',tasks.filter(t=>t.status==='done').length,'تمت مراجعتها تجريبيًا')}</div>`:'';
    const notes=dept==='security'?panel('البلاغات الأمنية — بيانات نموذجية',table(['البلاغ','الموقع','الخطورة','الحالة'],data.incidents.filter(i=>state.site==='all'||i.siteId===state.site).filter(i=>state.company==='all'||site(i.siteId)?.companyId===state.company).map(i=>`<tr><td>${esc(i.title)}</td><td>${esc(siteName(i.siteId))}</td><td>${priority(i.level)}</td><td>${badge(i.status)}</td></tr>`))):'';
    return heading(dept?dept.toUpperCase()+' operations':'Task center',label,desc,btn('مهمة جديدة','new-task'))+demoNotice+extra+panel(dept?'مهام '+label:'جميع المهام',searchToolbar()+`<div class="desktop-record-table">${table(heads,rows)}</div><div class="mobile-record-list">${tasks.length?tasks.map(t=>mobileTaskCard(t,{siteName,deptName,employeeName,showEmployee:true,showDepartment:!dept})).join(''):'<p class="no-data">لا توجد مهام في النطاق الحالي</p>'}</div>`,`${tasks.length} نتيجة`)+notes;
  }
  return { tasksPage };
}
