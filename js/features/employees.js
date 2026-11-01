// Modular V0.2.1: createEmployeeActions. UI demo only.
export function createEmployeeActions(ctx) {
  const { data, state, esc, save, company, site, employee, btn, refresh, toast, closeDialog, dialog, formGroup, selectGroup, companyOptions, siteOptions, validateForm } = ctx;
  function newEmployee(){if(!data.sites.length){toast('أضف موقعًا أولًا');return;}const companyId=state.company==='all'?data.sites[0].companyId:state.company;
    dialog('إضافة موظف تجريبي',`<form id="new-employee-form"><div class="form-grid">${formGroup('الاسم','employee-name','text',true,'maxlength="100"',true)}${selectGroup('الشركة','employee-company',companyOptions())}${selectGroup('الموقع','employee-site',siteOptions(companyId))}${selectGroup('القسم','employee-department',[{value:'security',label:'الأمن'},{value:'cleaning',label:'النظافة'},{value:'maintenance',label:'الصيانة'}])}${formGroup('المسمى الوظيفي','employee-job','text',true,'maxlength="80"')}${selectGroup('الوردية','employee-shift',[{value:'صباحية',label:'صباحية'},{value:'مسائية',label:'مسائية'},{value:'ليلية',label:'ليلية'}])}</div></form>`, `<button class="btn" data-action="close-dialog">إلغاء</button><button class="btn btn-primary" data-action="submit-employee">حفظ الموظف</button>`);
    $('employee-company').value=companyId;$('employee-site').value=state.site!=='all'?state.site:siteOptions(companyId)[0]?.value;
    $('employee-company').addEventListener('change',()=>{$('employee-site').innerHTML=siteOptions($('employee-company').value).map(i=>`<option value="${esc(i.value)}">${esc(i.label)}</option>`).join('');});
    $('new-employee-form').addEventListener('submit',e=>{e.preventDefault();submitEmployee();});
  }
  function submitEmployee(){if(!validateForm('new-employee-form'))return;if(!$('employee-name').value.trim()||!$('employee-job').value.trim()){toast('أدخل اسم الموظف والمسمى الوظيفي');return;}const comp=$('employee-company').value,siteId=$('employee-site').value;if(site(siteId)?.companyId!==comp){toast('الموقع لا يتبع هذه الشركة');return;}const max=Math.max(0,...data.employees.map(e=>Number(e.id.replace(/\D/g,''))||0))+1;
    data.employees.push({id:'e'+max,code:(comp==='arc'?'ARC':'MEM')+'-'+String(max).padStart(3,'0'),name:$('employee-name').value.trim(),companyId:comp,siteId,department:$('employee-department').value,job:$('employee-job').value.trim(),shift:$('employee-shift').value,presence:'absent'});save();closeDialog();refresh();toast('تم حفظ الموظف في بيانات العرض المحلي');
  }
  return { newEmployee, submitEmployee };
}
