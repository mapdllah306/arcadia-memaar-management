// Modular V0.2.1: createTaskActions. UI demo only.
export function createTaskActions(ctx) {
  const { data, state, icon, esc, day, LABELS, save, company, site, employee, companyName, siteName, employeeName, deptName, fTasks, badge, priority, fmtDate, btn, refresh, toast, closeDialog, dialog, formGroup, selectGroup, companyOptions, siteOptions, employeeOptions, safeCsvCell } = ctx;
  function newTask(){
    if(!data.sites.length){toast('أضف موقعًا أولًا');return;}
    const initialCompany=state.company==='all'?data.sites[0].companyId:state.company;
    const sites=siteOptions(initialCompany);const initialSite=state.site!=='all'?state.site:sites[0]?.value;
    const dept=state.page==='security'?'security':state.page==='cleaning'?'cleaning':state.page==='maintenance'?'maintenance':'security';
    const body=`<form id="new-task-form"><div class="form-grid">${formGroup('عنوان المهمة','task-title','text',true,'maxlength="120"',true)}${selectGroup('الشركة','task-company',companyOptions())}${selectGroup('الموقع','task-site',siteOptions(initialCompany))}${selectGroup('القسم','task-department',[{value:'security',label:'الأمن'},{value:'cleaning',label:'النظافة'},{value:'maintenance',label:'الصيانة'}])}${selectGroup('الموظف المكلف','task-assignee',employeeOptions(initialSite,dept),false)}${selectGroup('الأولوية','task-priority',[{value:'low',label:'منخفضة'},{value:'medium',label:'متوسطة'},{value:'high',label:'عالية'}])}${formGroup('تاريخ الاستحقاق','task-due','date',true,`value="${day()}"`)}<div class="form-group full"><label for="task-description">التفاصيل والتعليمات</label><textarea id="task-description" name="task-description" maxlength="1000" placeholder="اكتب خطوات التنفيذ أو الملاحظات..."></textarea></div></div></form>`;
    dialog('إضافة مهمة جديدة',body,`<button class="btn" data-action="close-dialog">إلغاء</button><button class="btn btn-primary" data-action="submit-task">${icon('check')}حفظ المهمة</button>`);
    $('task-company').value=initialCompany;$('task-site').value=initialSite;$('task-department').value=dept;
    $('task-assignee').innerHTML=employeeOptions(initialSite,dept).map(i=>`<option value="${esc(i.value)}">${esc(i.label)}</option>`).join('');
    $('task-company').addEventListener('change',()=>{const values=siteOptions($('task-company').value);$('task-site').innerHTML=values.map(i=>`<option value="${esc(i.value)}">${esc(i.label)}</option>`).join('');updateAssignees();});
    $('task-site').addEventListener('change',updateAssignees);$('task-department').addEventListener('change',updateAssignees);
    $('new-task-form').addEventListener('submit',e=>{e.preventDefault();submitTask();});
  }
  function updateAssignees(){const opts=employeeOptions($('task-site')?.value,$('task-department')?.value);if($('task-assignee'))$('task-assignee').innerHTML=opts.map(i=>`<option value="${esc(i.value)}">${esc(i.label)}</option>`).join('');}
  function validateForm(id){const form=$(id);if(!form)return false;if(!form.reportValidity())return false;return true;}
  function submitTask(){if(!validateForm('new-task-form'))return;if(!$('task-title').value.trim()){toast('أدخل عنوانًا صالحًا للمهمة');$('task-title').focus();return;}const siteId=$('task-site').value;const comp=$('task-company').value;if(site(siteId)?.companyId!==comp){toast('الموقع غير تابع للشركة المحددة');return;}
    const assignee=$('task-assignee').value,dept=$('task-department').value;
    if(assignee&&(!employee(assignee)||employee(assignee).siteId!==siteId||employee(assignee).department!==dept)){toast('الموظف غير مؤهل للتكليف الحالي');return;}
    const ids=data.tasks.map(t=>Number(t.id.replace(/\D/g,''))).filter(Number.isFinite);const num=Math.max(1000,...ids)+1;
    data.tasks.unshift({id:'TSK-'+num,title:$('task-title').value.trim(),companyId:comp,siteId,department:dept,assignedTo:assignee,priority:$('task-priority').value,status:'pending',due:$('task-due').value,description:$('task-description').value.trim()});
    save();closeDialog();refresh();toast('تم إنشاء المهمة في بيانات العرض المحلي');
  }

  function taskDetail(id){const t=data.tasks.find(x=>x.id===id);if(!t)return;const detail=`<div class="detail-list"><div><small>رقم المهمة</small><strong>${esc(t.id)}</strong></div><div><small>الموقع</small><strong>${esc(siteName(t.siteId))}</strong></div><div><small>الشركة</small><strong>${esc(companyName(t.companyId))}</strong></div><div><small>القسم</small><strong>${esc(deptName(t.department))}</strong></div><div><small>المسؤول</small><strong>${esc(employeeName(t.assignedTo))}</strong></div><div><small>تاريخ الاستحقاق</small><strong>${fmtDate(t.due)}</strong></div><div><small>الأولوية</small><strong>${priority(t.priority)}</strong></div><div><small>الحالة الحالية</small><strong>${badge(t.status)}</strong></div></div><div class="modal-label">وصف المهمة</div><div class="description-box">${esc(t.description)||'لا توجد تعليمات إضافية.'}</div><div class="modal-label">تحديث الحالة (تجريبي)</div>${selectGroup('الحالة الجديدة','detail-status',[{value:'pending',label:'بانتظار التنفيذ'},{value:'progress',label:'قيد التنفيذ'},{value:'done',label:'مكتملة'}],true,true)}<div class="warn-box">هذه تجربة لمسار العمل؛ الاعتمادات الفعلية، والتدقيق، والصور، والإسناد الحقيقي تتطلب الخادم والصلاحيات.</div>`;
    dialog(t.title,detail,`<button class="btn" data-action="close-dialog">إلغاء</button><button class="btn btn-primary" data-action="update-task" data-id="${esc(t.id)}">حفظ التغيير</button>`);$('detail-status').value=t.status;
  }
  function csvExport(){const records=fTasks();const fields=['رقم المهمة','المهمة','الشركة','الموقع','القسم','المسؤول','الأولوية','الحالة','الموعد'];const values=records.map(t=>[t.id,t.title,companyName(t.companyId),siteName(t.siteId),deptName(t.department),employeeName(t.assignedTo),LABELS[t.priority],LABELS[t.status],t.due]);const cell=safeCsvCell;const csv='\ufeff'+[fields,...values].map(row=>row.map(cell).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='arcadia-memaar-demo-tasks.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('تم تصدير بيانات المهام التجريبية');}
  return { newTask, updateAssignees, validateForm, submitTask, taskDetail, csvExport };
}
