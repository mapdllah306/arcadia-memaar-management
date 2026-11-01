// Modular V0.2.1: createDialogs. UI demo only.
export function createDialogs(ctx) {
  const { data, icon, esc, btn } = ctx;
  function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>$('toast').classList.remove('visible'),3300);}
  let previousFocus=null;
  function closeDialog(){previousFocus?.focus?.(); previousFocus=null; $('dialog-root').innerHTML=''; document.body.style.overflow=''; }
  function dialog(title,body,footer=''){previousFocus=document.activeElement;document.body.style.overflow='hidden';$('dialog-root').innerHTML=`<div class="dialog-backdrop" id="dialog-backdrop"><div class="dialog" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="dialog-header"><h2>${esc(title)}</h2><button class="icon-btn" data-action="close-dialog" aria-label="إغلاق">${icon('close')}</button></div><div class="dialog-content">${body}</div>${footer?`<div class="dialog-footer">${footer}</div>`:''}</div></div>`;$('dialog-root').querySelector('input,select,button')?.focus();}
  function formGroup(label,id,type='text',required=true,extra='',full=false){return `<div class="form-group ${full?'full':''}"><label for="${id}" class="${required?'required':''}">${label}</label><input id="${id}" name="${id}" type="${type}" ${required?'required':''} ${extra}></div>`;}
  function selectGroup(label,id,items,required=true,full=false){return `<div class="form-group ${full?'full':''}"><label for="${id}" class="${required?'required':''}">${label}</label><select id="${id}" name="${id}" ${required?'required':''}>${items.map(i=>`<option value="${esc(i.value)}">${esc(i.label)}</option>`).join('')}</select></div>`;}
  return { toast, closeDialog, dialog, formGroup, selectGroup };
}
