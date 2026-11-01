// Modular V0.2.1: createReportsPages. UI demo only.
export function createReportsPages(ctx) {
  const { data, icon, esc, siteName, deptName, fTasks, fEmployees, fSites, badge, priority, stat, heading, btn, panel, table, demoNotice, tile } = ctx;
  function attendance(){
    const people=fEmployees(); const present=people.filter(e=>e.presence==='present').length;
    const rows=people.map(e=>`<tr><td><strong>${esc(e.name)}</strong></td><td>${esc(siteName(e.siteId))}</td><td>${esc(deptName(e.department))}</td><td>${esc(e.shift)}</td><td>${badge(e.presence)}</td><td><button class="table-link" data-action="toggle-presence" data-id="${esc(e.id)}">${e.presence==='present'?'تسجيل غياب':'تسجيل حضور'}</button></td></tr>`);
    return heading('Shifts & attendance','الورديات والحضور','سجل حضور توضيحي قابل للتعديل لأغراض اختبار الواجهة')+demoNotice+`<div class="mini-grid">${tile('الموظفون',people.length,'ضمن المواقع المختارة')}${tile('حاضر',present,'حسب السجل المحلي')}${tile('غائب',people.length-present,'حسب السجل المحلي')}</div>`+panel('الحضور التجريبي',table(['الموظف','الموقع','القسم','الوردية','الحالة','تحديث'],rows),'ليس جهاز بصمة ولا نظام حضور معتمد');
  }
  function reports(){
    const tasks=fTasks(),employees=fEmployees(),sites=fSites(),done=tasks.filter(t=>t.status==='done').length;
    const reportRows=[['نسبة إنجاز المهام',tasks.length?`${Math.round(done/tasks.length*100)}%`:'—'],['عدد البلاغات/المهام عالية الأولوية',tasks.filter(t=>t.priority==='high').length],['المهام قيد التنفيذ',tasks.filter(t=>t.status==='progress').length],['المهام بانتظار التنفيذ',tasks.filter(t=>t.status==='pending').length],['عدد الموظفين الحاضرين (تجريبي)',employees.filter(e=>e.presence==='present').length],['عدد المواقع في نطاق العرض',sites.length]];
    return heading('Performance reports','التقارير والإحصائيات','ملخصات ومؤشرات تشغيلية مستخرجة من البيانات المحلية التجريبية',btn('تصدير CSV','export-csv','download','btn'))+demoNotice+
      `<section class="panel-grid">${panel('ملخص الأداء',reportRows.map(([a,b])=>`<div class="report-stat"><span>${a}</span><span class="value">${b}</span></div>`).join(''))}${panel('المهام حسب القسم',['security','cleaning','maintenance'].map(d=>{const x=tasks.filter(t=>t.department===d);return `<div class="report-stat"><span>${deptName(d)}</span><span class="value">${x.length}</span></div>`;}).join(''))}</section>`+
      `<div class="banner-note">${icon('alert')}تقارير زمن الاستجابة وSLA تحتاج بيانات فعلية بأوقات الأحداث؛ ولن نعرض مؤشرات مُختلقة.</div>`;
  }
  function settings(){
    return heading('System configuration','إعدادات النظام','المعايير الأساسية للنموذج الاستعراضي')+demoNotice+
      `<section class="panel-grid">${panel('بيئة العرض',`<div class="report-stat"><span>اسم النظام</span><strong>Operations Hub</strong></div><div class="report-stat"><span>نسخة النموذج</span><strong>0.2.2</strong></div><div class="report-stat"><span>طريقة التخزين الحالية</span><strong>LocalStorage</strong></div><div class="report-stat"><span>تسجيل الدخول والصلاحيات</span><strong style="color:#e4b37e">غير مفعّل بعد</strong></div><div class="report-stat"><span>قاعدة بيانات حقيقية</span><strong style="color:#e4b37e">غير متصلة</strong></div>`) }
      ${panel('بيانات النموذج',`<p class="muted">يمكن إعادة بيانات الاختبار إلى وضعها الأصلي. ستُحذف التعديلات التجريبية المخزنة في هذا المتصفح فقط.</p>${btn('إعادة البيانات الافتراضية','reset-demo','reload','btn-danger')}<div class="warn-box">لا تستخدم النموذج لتخزين بيانات حقيقية أو شخصية: هذه نسخة لتجربة التصميم ومسارات العمل، وليست نظامًا آمنًا للنشر.</div>`)}</section>`;
  }
  return { attendance, reports, settings };
}
