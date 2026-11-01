// Modular V0.2.2: initEvents. UI demo only.
export function initEvents(ctx) {
  const { $, data, state, SEED, save, resetData, company, site, employee, btn, renderPage, refresh, toast, closeDialog, dialog, newTask, submitTask, newSite, submitSite, newEmployee, submitEmployee, taskDetail, csvExport } = ctx;
  function resetDemo(){if(!confirm('هل تريد حذف التعديلات التجريبية وإعادة البيانات الأصلية؟'))return;resetData();closeDialog();state.company='all';state.site='all';state.search='';state.status='all';refresh();toast('أُعيدت البيانات التجريبية');}
  function closeSidebar(){$('sidebar').classList.remove('open');$('overlay').classList.remove('visible');$('menu-btn').setAttribute('aria-expanded','false');}
  document.addEventListener('click',e=>{
    const nav=e.target.closest('[data-page]');if(nav){state.page=nav.dataset.page;state.search='';state.status='all';closeSidebar();renderPage();window.scrollTo({top:0,behavior:'auto'});return;}
    const a=e.target.closest('[data-action]');if(a){const action=a.dataset.action;
      if(action==='new-task')newTask();else if(action==='new-site')newSite();else if(action==='new-employee')newEmployee();else if(action==='submit-task')submitTask();else if(action==='submit-site')submitSite();else if(action==='submit-employee')submitEmployee();else if(action==='task-detail')taskDetail(a.dataset.id);else if(action==='update-task'){const t=data.tasks.find(t=>t.id===a.dataset.id);if(t&&['pending','progress','done'].includes($('detail-status').value)){t.status=$('detail-status').value;save();closeDialog();renderPage();toast('تم تحديث حالة المهمة تجريبيًا');}}
      else if(action==='toggle-presence'){const p=employee(a.dataset.id);if(p){p.presence=p.presence==='present'?'absent':'present';save();renderPage();toast('تم تحديث سجل الحضور التجريبي');}}
      else if(action==='close-dialog')closeDialog();else if(action==='export-csv')csvExport();else if(action==='reset-demo')resetDemo();return;
    }
    if(e.target.id==='dialog-backdrop')closeDialog();
  });
  document.addEventListener('input',e=>{if(e.target.id==='page-search'){const el=e.target;const selection=[el.selectionStart,el.selectionEnd];state.search=el.value;renderPage();const next=$('page-search');if(next){next.focus();try{next.setSelectionRange(...selection);}catch(_){}}}});
  document.addEventListener('change',e=>{if(e.target.id==='status-filter'){state.status=e.target.value;renderPage();}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDialog();closeSidebar();}});
  $('company-filter').addEventListener('change',e=>{state.company=e.target.value;state.site='all';state.search='';refresh();});
  $('site-filter').addEventListener('change',e=>{state.site=e.target.value;state.search='';renderPage();});
  $('menu-btn').addEventListener('click',()=>{$('sidebar').classList.add('open');$('overlay').classList.add('visible');$('menu-btn').setAttribute('aria-expanded','true');});
  $('overlay').addEventListener('click',closeSidebar);
  const bottomMenu=$('bottom-menu-btn');if(bottomMenu)bottomMenu.addEventListener('click',()=>{$('sidebar').classList.add('open');$('overlay').classList.add('visible');$('menu-btn').setAttribute('aria-expanded','true');});
  $('menu-btn').setAttribute('aria-expanded','false');
  $('notification-btn').addEventListener('click',()=>{state.page='maintenance';state.status='pending';state.search='';renderPage();toast('عرض المهام المعلقة — الإشعارات الحقيقية ستُضاف لاحقًا');});
  refresh();
  return { resetDemo, closeSidebar };
}
