// Modular V0.2.1: createTemplates. UI demo only.
export function createTemplates(ctx) {
  const { data, state, icon, esc, day, LABELS, STATUS_CLASS } = ctx;
  const badge=(status)=>`<span class="status ${STATUS_CLASS[status]||'muted'}">${esc(LABELS[status]||status)}</span>`;
  const priority=v=>`<span class="priority ${esc(v)}">${esc(LABELS[v]||v)}</span>`;
  const fmtDate=(d)=>{if(!d)return '—';const n=new Date(`${d}T12:00:00`);return Number.isNaN(n.getTime())?'—':new Intl.DateTimeFormat('ar-EG',{day:'numeric',month:'short'}).format(n);};
  const stat=(label,value,ic,foot)=>`<div class="metric-card"><div class="metric-head"><span>${label}</span>${icon(ic)}</div><div class="metric-value">${value}</div><div class="metric-foot">${foot}</div></div>`;
  const heading=(english,title,desc,actions='')=>`<div class="page-heading"><div><p class="eyebrow">${esc(english)}</p><h1>${title}</h1><p>${desc}</p></div><div class="heading-actions">${actions}</div></div>`;
  const btn=(title,onclick,ic='plus',variant='btn-primary')=>`<button class="btn ${variant}" data-action="${onclick}">${icon(ic)}${title}</button>`;
  const panel=(title,content,subtitle='')=>`<section class="panel"><div class="panel-title"><h2>${title}</h2>${subtitle?`<small>${subtitle}</small>`:''}</div>${content}</section>`;
  const table=(heads,rows,empty='لا توجد نتائج ضمن نطاق البحث الحالي')=>`<div class="table-wrap"><table class="data-table"><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.join(''):`<tr><td colspan="${heads.length}" class="empty-state">${empty}</td></tr>`}</tbody></table></div>`;
  const searchToolbar=(placeholder='ابحث بالاسم أو الرقم...')=>`<div class="table-toolbar"><label class="search-box">${icon('search')}<input type="search" id="page-search" value="${esc(state.search)}" placeholder="${esc(placeholder)}" autocomplete="off" aria-label="بحث"></label><select class="select-plain" id="status-filter" aria-label="تصفية الحالة"><option value="all">كل الحالات</option><option value="pending" ${state.status==='pending'?'selected':''}>بانتظار التنفيذ</option><option value="progress" ${state.status==='progress'?'selected':''}>قيد التنفيذ</option><option value="done" ${state.status==='done'?'selected':''}>مكتملة</option></select></div>`;
  const mobileTaskCard=(t,{siteName,deptName,employeeName,showEmployee=false,showDepartment=true})=>`<article class="mobile-record-card">
    <div class="record-top"><span class="record-id">${esc(t.id)}</span>${badge(t.status)}</div>
    <h3>${esc(t.title)}</h3>
    <div class="record-meta"><span>${icon('map')}${esc(siteName(t.siteId))}</span>${showDepartment?`<span>${icon('shield')}${esc(deptName(t.department))}</span>`:''}${showEmployee?`<span>${icon('users')}${esc(employeeName(t.assignedTo))}</span>`:''}</div>
    <div class="record-bottom"><span class="record-priority">${priority(t.priority)}</span><button class="table-link" data-action="task-detail" data-id="${esc(t.id)}">عرض التفاصيل ${icon('chevron')}</button></div>
  </article>`;
  const demoNotice=`<div class="banner-note">${icon('alert')} <span>هذه بيانات افتراضية للتجربة فقط، ولا تمثل سجلات الموظفين أو المنشآت الحقيقية للشركتين. جميع التعديلات محفوظة محليًا في هذا المتصفح فقط.</span></div>`;

  function tile(title,num,caption){return `<div class="feature-tile"><span>${title}</span><strong>${num}</strong><small>${caption}</small></div>`;}
  return { badge, priority, fmtDate, stat, heading, btn, panel, table, searchToolbar, demoNotice, tile, mobileTaskCard };
}
