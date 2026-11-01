// Modular V0.2.2: createSiteActions. UI demo only.
export function createSiteActions(ctx) {
  const { $, data, state, save, company, site, btn, companies, refresh, toast, closeDialog, dialog, formGroup, selectGroup, companyOptions, validateForm } = ctx;
  function newSite(){const companyId=state.company==='all'?data.companies[0].id:state.company;
    dialog('إضافة موقع',`<form id="new-site-form"><div class="form-grid">${formGroup('اسم الموقع','site-name','text',true,'maxlength="100"',true)}${selectGroup('الشركة','site-company',companyOptions())}${selectGroup('نوع المنشأة','site-type',[{value:'مول تجاري',label:'مول تجاري'},{value:'كمبوند سكني',label:'كمبوند سكني'},{value:'مبنى إداري',label:'مبنى إداري'},{value:'منشأة أخرى',label:'منشأة أخرى'}])}${formGroup('المدينة','site-city','text',true,'maxlength="80"')}${formGroup('عدد المناطق','site-zones','number',true,'min="0" max="9999" value="1"')}</div></form>`, `<button class="btn" data-action="close-dialog">إلغاء</button><button class="btn btn-primary" data-action="submit-site">حفظ الموقع</button>`);
    $('site-company').value=companyId;$('new-site-form').addEventListener('submit',e=>{e.preventDefault();submitSite();});
  }
  function submitSite(){if(!validateForm('new-site-form'))return;if(!$('site-name').value.trim()||!$('site-city').value.trim()){toast('أدخل اسم موقع ومدينة صالحين');return;}const id='s'+(Math.max(0,...data.sites.map(s=>Number(s.id.replace(/\D/g,''))||0))+1);data.sites.push({id,name:$('site-name').value.trim(),companyId:$('site-company').value,type:$('site-type').value,city:$('site-city').value.trim(),zones:Number($('site-zones').value),status:'active'});save();closeDialog();refresh();toast('تمت إضافة الموقع في بيانات العرض المحلي');}
  return { newSite, submitSite };
}
