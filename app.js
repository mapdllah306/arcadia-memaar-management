'use strict';
/* ARCADIA × MEMAAR DEGLA / interactive LOCAL DEMO only.
   No real authentication, authorization, server storage, or site attendance verification. */
(() => {
  const $ = (id) => document.getElementById(id);
  const icon = (name, cls='') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const day = (offset=0) => {const d=new Date(); d.setHours(12,0,0,0);d.setDate(d.getDate()+offset);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const SEED = {
    companies:[{id:'arc',name:'ARCADIA',arabic:'أركاديا',logo:'assets/arcadia-logo.png'},{id:'mem',name:'MEMAAR DEGLA',arabic:'معمار دجلة',logo:'assets/memaar-degla-logo.png'}],
    sites:[
      {id:'s1',companyId:'arc',name:'مول أركاديا — تجريبي',type:'مول تجاري',city:'القاهرة',zones:18,status:'active'},
      {id:'s2',companyId:'arc',name:'مركز تجاري B — تجريبي',type:'مركز تجاري',city:'الجيزة',zones:12,status:'active'},
      {id:'s3',companyId:'mem',name:'كمبوند دجلة — تجريبي',type:'كمبوند سكني',city:'القاهرة',zones:24,status:'active'},
      {id:'s4',companyId:'mem',name:'مبنى إداري D — تجريبي',type:'مبنى إداري',city:'القاهرة',zones:9,status:'active'}
    ],
    employees:[
      {id:'e1',code:'ARC-001',name:'أحمد محمود',companyId:'arc',siteId:'s1',department:'security',job:'فرد أمن',shift:'صباحية',presence:'present'},
      {id:'e2',code:'ARC-002',name:'محمد سالم',companyId:'arc',siteId:'s1',department:'security',job:'مشرف أمن',shift:'مسائية',presence:'present'},
      {id:'e3',code:'ARC-003',name:'سامي حسن',companyId:'arc',siteId:'s1',department:'cleaning',job:'عامل نظافة',shift:'صباحية',presence:'present'},
      {id:'e4',code:'ARC-004',name:'خالد إبراهيم',companyId:'arc',siteId:'s1',department:'maintenance',job:'فني كهرباء',shift:'صباحية',presence:'present'},
      {id:'e5',code:'ARC-005',name:'محمود فتحي',companyId:'arc',siteId:'s2',department:'cleaning',job:'عامل نظافة',shift:'مسائية',presence:'absent'},
      {id:'e6',code:'ARC-006',name:'تامر فوزي',companyId:'arc',siteId:'s2',department:'maintenance',job:'فني تكييف',shift:'صباحية',presence:'present'},
      {id:'e7',code:'MEM-001',name:'حسن عبد الله',companyId:'mem',siteId:'s3',department:'security',job:'فرد أمن',shift:'مسائية',presence:'present'},
      {id:'e8',code:'MEM-002',name:'علي منصور',companyId:'mem',siteId:'s3',department:'security',job:'مشرف أمن',shift:'صباحية',presence:'present'},
      {id:'e9',code:'MEM-003',name:'عمر إبراهيم',companyId:'mem',siteId:'s3',department:'cleaning',job:'عامل نظافة',shift:'صباحية',presence:'present'},
      {id:'e10',code:'MEM-004',name:'يوسف هشام',companyId:'mem',siteId:'s3',department:'maintenance',job:'فني سباكة',shift:'صباحية',presence:'absent'},
      {id:'e11',code:'MEM-005',name:'حازم عبد الحميد',companyId:'mem',siteId:'s4',department:'cleaning',job:'مشرف نظافة',shift:'صباحية',presence:'present'},
      {id:'e12',code:'MEM-006',name:'طارق ناصر',companyId:'mem',siteId:'s4',department:'maintenance',job:'فني صيانة',shift:'مسائية',presence:'present'}
    ],
    tasks:[
      {id:'TSK-1001',title:'مراجعة البوابة الرئيسية',companyId:'arc',siteId:'s1',department:'security',assignedTo:'e1',priority:'medium',status:'done',due:day(),description:'فحص البوابة والتأكد من سلامة حركة الدخول والخروج.'},
      {id:'TSK-1002',title:'تنظيف الممر الشرقي',companyId:'arc',siteId:'s1',department:'cleaning',assignedTo:'e3',priority:'medium',status:'progress',due:day(),description:'تنظيف الأرضيات والممرات وإفراغ سلال المهملات.'},
      {id:'TSK-1003',title:'فحص لوحة الكهرباء بالدور الثاني',companyId:'arc',siteId:'s1',department:'maintenance',assignedTo:'e4',priority:'high',status:'pending',due:day(),description:'فحص فني بواسطة شخص مخوّل، وفق تعليمات السلامة.'},
      {id:'TSK-1004',title:'جولة تفتيش مسائية',companyId:'arc',siteId:'s2',department:'security',assignedTo:'',priority:'low',status:'pending',due:day(1),description:'المرور على نقاط الدخول والمخارج.'},
      {id:'TSK-1005',title:'صيانة تكييف المدخل',companyId:'arc',siteId:'s2',department:'maintenance',assignedTo:'e6',priority:'high',status:'progress',due:day(1),description:'تشخيص وإصلاح التكييف وتوثيق العمل.'},
      {id:'TSK-1006',title:'تنظيف بوابة الكمبوند',companyId:'mem',siteId:'s3',department:'cleaning',assignedTo:'e9',priority:'medium',status:'done',due:day(),description:'تنظيف أرضيات ومحيط المدخل.'},
      {id:'TSK-1007',title:'تفقد سور الموقع',companyId:'mem',siteId:'s3',department:'security',assignedTo:'e7',priority:'high',status:'progress',due:day(),description:'تسجيل أي ملاحظات تتعلق بسلامة السياج الخارجي.'},
      {id:'TSK-1008',title:'إصلاح تسريب مياه',companyId:'mem',siteId:'s3',department:'maintenance',assignedTo:'e10',priority:'high',status:'pending',due:day(),description:'تحديد مصدر التسريب وتصعيده للمشرف المختص.'},
      {id:'TSK-1009',title:'فحص نظافة دورات المياه',companyId:'mem',siteId:'s4',department:'cleaning',assignedTo:'e11',priority:'low',status:'done',due:day(-1),description:'فحص الجودة وفق قائمة الفحص المعتمدة.'},
      {id:'TSK-1010',title:'صيانة إنارة الاستقبال',companyId:'mem',siteId:'s4',department:'maintenance',assignedTo:'e12',priority:'medium',status:'pending',due:day(2),description:'إصلاح وحدة الإضاءة مع الالتزام بإجراءات السلامة.'}
    ],
    incidents:[
      {id:'INC-201',siteId:'s1',title:'ملاحظة على مدخل شحن البضائع',level:'medium',status:'progress',date:day()},
      {id:'INC-202',siteId:'s3',title:'بلاغ عن عطل كاميرا مراقبة',level:'high',status:'pending',date:day()}
    ]
  };
  const LABELS={security:'الأمن',cleaning:'النظافة',maintenance:'الصيانة',done:'مكتملة',pending:'بانتظار التنفيذ',progress:'قيد التنفيذ',high:'عالية',medium:'متوسطة',low:'منخفضة',present:'حاضر',absent:'غائب',active:'نشط'};
  const STATUS_CLASS={done:'done',pending:'pending',progress:'progress',present:'present',absent:'absent',active:'active'};
  const NAV=[
    ['dashboard','grid','لوحة التحكم'],['companies','building','الشركات'],['sites','map','المواقع والمنشآت'],['employees','users','الموظفون'],['tasks','clipboard','المهام والتكليفات'],['security','shield','إدارة الأمن'],['cleaning','spark','إدارة النظافة'],['maintenance','wrench','الصيانة والفنيون'],['attendance','calendar','الورديات والحضور'],['reports','chart','التقارير والإحصائيات'],['settings','settings','إعدادات النظام']
  ];
  const storageKey='am-ops-demo-v1';
  let data;
  try { const raw=JSON.parse(localStorage.getItem(storageKey)||'null'); data=raw&&Array.isArray(raw.tasks)&&Array.isArray(raw.sites)&&Array.isArray(raw.employees)?raw:structuredClone(SEED); }
  catch(_){data=structuredClone(SEED);}
  const state={page:'dashboard',company:'all',site:'all',search:'',status:'all'};
  const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(data));}catch(_){} };
  const company=id=>data.companies.find(x=>x.id===id);
  const site=id=>data.sites.find(x=>x.id===id);
  const employee=id=>data.employees.find(x=>x.id===id);
  const companyName=id=>company(id)?.arabic||'—';
  const siteName=id=>site(id)?.name||'—';
  const employeeName=id=>id?employee(id)?.name||'غير معروف':'غير مسندة';
  const deptName=id=>LABELS[id]||id;
  const matches=x=>(state.company==='all'||x.companyId===state.company)&&(state.site==='all'||x.siteId===state.site);
  const fTasks=()=>data.tasks.filter(matches);
  const fEmployees=()=>data.employees.filter(matches);
  const fSites=()=>data.sites.filter(s=>(state.company==='all'||s.companyId===state.company)&&(state.site==='all'||s.id===state.site));
  const badge=(status)=>`<span class="status ${STATUS_CLASS[status]||'muted'}">${esc(LABELS[status]||status)}</span>`;
  const priority=v=>`<span class="priority ${esc(v)}">${esc(LABELS[v]||v)}</span>`;
  const fmtDate=(d)=>{if(!d)return '—';const n=new Date(`${d}T12:00:00`);return Number.isNaN(n.getTime())?'—':new Intl.DateTimeFormat('ar-EG',{day:'numeric',month:'short'}).format(n);};
  const stat=(label,value,ic,foot)=>`<div class="metric-card"><div class="metric-head"><span>${label}</span>${icon(ic)}</div><div class="metric-value">${value}</div><div class="metric-foot">${foot}</div></div>`;
  const heading=(english,title,desc,actions='')=>`<div class="page-heading"><div><p class="eyebrow">${esc(english)}</p><h1>${title}</h1><p>${desc}</p></div><div class="heading-actions">${actions}</div></div>`;
  const btn=(title,onclick,ic='plus',variant='btn-primary')=>`<button class="btn ${variant}" data-action="${onclick}">${icon(ic)}${title}</button>`;
  const panel=(title,content,subtitle='')=>`<section class="panel"><div class="panel-title"><h2>${title}</h2>${subtitle?`<small>${subtitle}</small>`:''}</div>${content}</section>`;
  const table=(heads,rows,empty='لا توجد نتائج ضمن نطاق البحث الحالي')=>`<div class="table-wrap"><table class="data-table"><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.join(''):`<tr><td colspan="${heads.length}" class="empty-state">${empty}</td></tr>`}</tbody></table></div>`;
  const searchToolbar=(placeholder='ابحث بالاسم أو الرقم...')=>`<div class="table-toolbar"><label class="search-box">${icon('search')}<input type="search" id="page-search" value="${esc(state.search)}" placeholder="${esc(placeholder)}" autocomplete="off" aria-label="بحث"></label><select class="select-plain" id="status-filter" aria-label="تصفية الحالة"><option value="all">كل الحالات</option><option value="pending" ${state.status==='pending'?'selected':''}>بانتظار التنفيذ</option><option value="progress" ${state.status==='progress'?'selected':''}>قيد التنفيذ</option><option value="done" ${state.status==='done'?'selected':''}>مكتملة</option></select></div>`;
  const demoNotice=`<div class="banner-note">${icon('alert')} <span>هذه بيانات افتراضية للتجربة فقط، ولا تمثل سجلات الموظفين أو المنشآت الحقيقية للشركتين. جميع التعديلات محفوظة محليًا في هذا المتصفح فقط.</span></div>`;

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
  function companies(){
    const cards=data.companies.filter(c=>state.company==='all'||state.company===c.id).map(c=>{const sites=data.sites.filter(s=>s.companyId===c.id),people=data.employees.filter(e=>e.companyId===c.id),tasks=data.tasks.filter(t=>t.companyId===c.id);return `<article class="data-card"><div class="company-card"><img class="brand-company-logo" src="${esc(c.logo)}" alt="شعار ${esc(c.name)}"><div><h3>${esc(c.name)}</h3><p>${esc(c.arabic)}</p></div></div><div class="card-bottom"><span>${sites.length} مواقع <span class="small-sep"></span> ${people.length} موظف</span><span>${tasks.filter(t=>t.status!=='done').length} مهمة مفتوحة</span></div></article>`;}).join('');
    return heading('Group administration','الشركات','الإدارة المشتركة للشركتين مع الفصل بين سجلات كل شركة')+demoNotice+`<div class="cards-grid">${cards||'<div class="empty-state">لا توجد شركات في الفلتر الحالي</div>'}</div>`;
  }
  function sitesPage(){
    const cards=fSites().map(s=>{const people=data.employees.filter(e=>e.siteId===s.id).length,tasks=data.tasks.filter(t=>t.siteId===s.id);return `<article class="data-card"><div class="card-top"><div class="card-icon">${icon('building')}</div>${badge('active')}</div><h3>${esc(s.name)}</h3><p>${esc(s.type)} <span class="small-sep"></span> ${esc(s.city)}<br>${esc(companyName(s.companyId))}</p><div class="card-bottom"><span>${people} موظفين</span><span>${tasks.length} مهام <span class="small-sep"></span> ${s.zones} منطقة</span></div></article>`;}).join('');
    return heading('Sites & facilities','المواقع والمنشآت','إدارة المولات والكمبوندات والمباني والمناطق',btn('إضافة موقع','new-site'))+demoNotice+`<div class="cards-grid">${cards||'<div class="empty-state">لا توجد مواقع ضمن النطاق الحالي</div>'}</div>`;
  }
  function employeesPage(){
    const search=state.search.trim().toLowerCase();
    const people=fEmployees().filter(e=>(e.name+' '+e.code+' '+e.job).toLowerCase().includes(search));
    const rows=people.map(e=>`<tr><td><strong>${esc(e.name)}</strong><br><span class="muted">${esc(e.code)}</span></td><td>${esc(e.job)}</td><td>${esc(deptName(e.department))}</td><td>${esc(siteName(e.siteId))}</td><td>${esc(e.shift)}</td><td>${badge(e.presence)}</td></tr>`);
    return heading('Workforce directory','الموظفون','ملفات الموظفين وتوزيعهم على المواقع والأقسام',btn('إضافة موظف','new-employee'))+demoNotice+panel('دليل الموظفين',searchToolbar('ابحث بالاسم أو الكود الوظيفي...')+table(['الموظف','الوظيفة','القسم','الموقع','الوردية','الحضور'],rows),`${people.length} موظف`);
  }
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
    return heading(dept?dept.toUpperCase()+' operations':'Task center',label,desc,btn('مهمة جديدة','new-task'))+demoNotice+extra+panel(dept?'مهام '+label:'جميع المهام',searchToolbar()+table(heads,rows),`${tasks.length} نتيجة`)+notes;
  }
  function tile(title,num,caption){return `<div class="feature-tile"><span>${title}</span><strong>${num}</strong><small>${caption}</small></div>`;}
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
      `<section class="panel-grid">${panel('بيئة العرض',`<div class="report-stat"><span>اسم النظام</span><strong>Operations Hub</strong></div><div class="report-stat"><span>نسخة النموذج</span><strong>0.1</strong></div><div class="report-stat"><span>طريقة التخزين الحالية</span><strong>LocalStorage</strong></div><div class="report-stat"><span>تسجيل الدخول والصلاحيات</span><strong style="color:#e4b37e">غير مفعّل بعد</strong></div><div class="report-stat"><span>قاعدة بيانات حقيقية</span><strong style="color:#e4b37e">غير متصلة</strong></div>`) }
      ${panel('بيانات النموذج',`<p class="muted">يمكن إعادة بيانات الاختبار إلى وضعها الأصلي. ستُحذف التعديلات التجريبية المخزنة في هذا المتصفح فقط.</p>${btn('إعادة البيانات الافتراضية','reset-demo','reload','btn-danger')}<div class="warn-box">لا تستخدم النموذج لتخزين بيانات حقيقية أو شخصية: هذه نسخة لتجربة التصميم ومسارات العمل، وليست نظامًا آمنًا للنشر.</div>`)}</section>`;
  }
  function renderPage(){
    const renderers={dashboard,companies,sites:sitesPage,employees:employeesPage,tasks:()=>tasksPage(),security:()=>tasksPage('security'),cleaning:()=>tasksPage('cleaning'),maintenance:()=>tasksPage('maintenance'),attendance,reports,settings};
    $('side-nav').innerHTML=NAV.map(([id,ic,title])=>`<button class="nav-item ${state.page===id?'active':''}" data-page="${id}" ${state.page===id?'aria-current="page"':''}>${icon(ic)}<span>${title}</span></button>`).join('');
    const label=NAV.find(x=>x[0]===state.page)?.[2]||'لوحة التحكم';
    $('breadcrumb').innerHTML=`النظام <span class="small-sep"></span> <strong>${esc(label)}</strong>`;
    $('content').innerHTML=(renderers[state.page]||dashboard)();
  }
  function renderFilters(){
    $('company-filter').innerHTML=`<option value="all">جميع الشركات</option>`+data.companies.map(c=>`<option value="${esc(c.id)}" ${state.company===c.id?'selected':''}>${esc(c.name)}</option>`).join('');
    if(state.site!=='all'&&!data.sites.some(s=>s.id===state.site&&(state.company==='all'||s.companyId===state.company)))state.site='all';
    $('site-filter').innerHTML=`<option value="all">جميع المواقع</option>`+data.sites.filter(s=>state.company==='all'||s.companyId===state.company).map(s=>`<option value="${esc(s.id)}" ${state.site===s.id?'selected':''}>${esc(s.name)}</option>`).join('');
  }
  function refresh(){renderFilters();renderPage();}
  function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>$('toast').classList.remove('visible'),3300);}
  function closeDialog(){ $('dialog-root').innerHTML=''; document.body.style.overflow=''; }
  function dialog(title,body,footer=''){document.body.style.overflow='hidden';$('dialog-root').innerHTML=`<div class="dialog-backdrop" id="dialog-backdrop"><div class="dialog" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="dialog-header"><h2>${esc(title)}</h2><button class="icon-btn" data-action="close-dialog" aria-label="إغلاق">${icon('close')}</button></div><div class="dialog-content">${body}</div>${footer?`<div class="dialog-footer">${footer}</div>`:''}</div></div>`;$('dialog-root').querySelector('input,select,button')?.focus();}
  function formGroup(label,id,type='text',required=true,extra='',full=false){return `<div class="form-group ${full?'full':''}"><label for="${id}" class="${required?'required':''}">${label}</label><input id="${id}" name="${id}" type="${type}" ${required?'required':''} ${extra}></div>`;}
  function selectGroup(label,id,items,required=true,full=false){return `<div class="form-group ${full?'full':''}"><label for="${id}" class="${required?'required':''}">${label}</label><select id="${id}" name="${id}" ${required?'required':''}>${items.map(i=>`<option value="${esc(i.value)}">${esc(i.label)}</option>`).join('')}</select></div>`;}
  function companyOptions(){return data.companies.map(c=>({value:c.id,label:c.name}));}
  function siteOptions(companyId){return data.sites.filter(s=>!companyId||s.companyId===companyId).map(s=>({value:s.id,label:s.name}));}
  function employeeOptions(siteId,department){return [{value:'',label:'بدون تكليف حالي'},...data.employees.filter(e=>(!siteId||e.siteId===siteId)&&(!department||e.department===department)).map(e=>({value:e.id,label:e.name+' — '+e.job}))];}
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
  function submitTask(){if(!validateForm('new-task-form'))return;const siteId=$('task-site').value;const comp=$('task-company').value;if(site(siteId)?.companyId!==comp){toast('الموقع غير تابع للشركة المحددة');return;}
    const assignee=$('task-assignee').value,dept=$('task-department').value;
    if(assignee&&(!employee(assignee)||employee(assignee).siteId!==siteId||employee(assignee).department!==dept)){toast('الموظف غير مؤهل للتكليف الحالي');return;}
    const ids=data.tasks.map(t=>Number(t.id.replace(/\D/g,''))).filter(Number.isFinite);const num=Math.max(1000,...ids)+1;
    data.tasks.unshift({id:'TSK-'+num,title:$('task-title').value.trim(),companyId:comp,siteId,department:dept,assignedTo:assignee,priority:$('task-priority').value,status:'pending',due:$('task-due').value,description:$('task-description').value.trim()});
    save();closeDialog();refresh();toast('تم إنشاء المهمة في بيانات العرض المحلي');
  }
  function newSite(){const companyId=state.company==='all'?data.companies[0].id:state.company;
    dialog('إضافة موقع',`<form id="new-site-form"><div class="form-grid">${formGroup('اسم الموقع','site-name','text',true,'maxlength="100"',true)}${selectGroup('الشركة','site-company',companyOptions())}${selectGroup('نوع المنشأة','site-type',[{value:'مول تجاري',label:'مول تجاري'},{value:'كمبوند سكني',label:'كمبوند سكني'},{value:'مبنى إداري',label:'مبنى إداري'},{value:'منشأة أخرى',label:'منشأة أخرى'}])}${formGroup('المدينة','site-city','text',true,'maxlength="80"')}${formGroup('عدد المناطق','site-zones','number',true,'min="0" max="9999" value="1"')}</div></form>`, `<button class="btn" data-action="close-dialog">إلغاء</button><button class="btn btn-primary" data-action="submit-site">حفظ الموقع</button>`);
    $('site-company').value=companyId;$('new-site-form').addEventListener('submit',e=>{e.preventDefault();submitSite();});
  }
  function submitSite(){if(!validateForm('new-site-form'))return;const id='s'+(Math.max(0,...data.sites.map(s=>Number(s.id.replace(/\D/g,''))||0))+1);data.sites.push({id,name:$('site-name').value.trim(),companyId:$('site-company').value,type:$('site-type').value,city:$('site-city').value.trim(),zones:Number($('site-zones').value),status:'active'});save();closeDialog();refresh();toast('تمت إضافة الموقع في بيانات العرض المحلي');}
  function newEmployee(){if(!data.sites.length){toast('أضف موقعًا أولًا');return;}const companyId=state.company==='all'?data.sites[0].companyId:state.company;
    dialog('إضافة موظف تجريبي',`<form id="new-employee-form"><div class="form-grid">${formGroup('الاسم','employee-name','text',true,'maxlength="100"',true)}${selectGroup('الشركة','employee-company',companyOptions())}${selectGroup('الموقع','employee-site',siteOptions(companyId))}${selectGroup('القسم','employee-department',[{value:'security',label:'الأمن'},{value:'cleaning',label:'النظافة'},{value:'maintenance',label:'الصيانة'}])}${formGroup('المسمى الوظيفي','employee-job','text',true,'maxlength="80"')}${selectGroup('الوردية','employee-shift',[{value:'صباحية',label:'صباحية'},{value:'مسائية',label:'مسائية'},{value:'ليلية',label:'ليلية'}])}</div></form>`, `<button class="btn" data-action="close-dialog">إلغاء</button><button class="btn btn-primary" data-action="submit-employee">حفظ الموظف</button>`);
    $('employee-company').value=companyId;$('employee-site').value=state.site!=='all'?state.site:siteOptions(companyId)[0]?.value;
    $('employee-company').addEventListener('change',()=>{$('employee-site').innerHTML=siteOptions($('employee-company').value).map(i=>`<option value="${esc(i.value)}">${esc(i.label)}</option>`).join('');});
    $('new-employee-form').addEventListener('submit',e=>{e.preventDefault();submitEmployee();});
  }
  function submitEmployee(){if(!validateForm('new-employee-form'))return;const comp=$('employee-company').value,siteId=$('employee-site').value;if(site(siteId)?.companyId!==comp){toast('الموقع لا يتبع هذه الشركة');return;}const max=Math.max(0,...data.employees.map(e=>Number(e.id.replace(/\D/g,''))||0))+1;
    data.employees.push({id:'e'+max,code:(comp==='arc'?'ARC':'MEM')+'-'+String(max).padStart(3,'0'),name:$('employee-name').value.trim(),companyId:comp,siteId,department:$('employee-department').value,job:$('employee-job').value.trim(),shift:$('employee-shift').value,presence:'absent'});save();closeDialog();refresh();toast('تم حفظ الموظف في بيانات العرض المحلي');
  }
  function taskDetail(id){const t=data.tasks.find(x=>x.id===id);if(!t)return;const detail=`<div class="detail-list"><div><small>رقم المهمة</small><strong>${esc(t.id)}</strong></div><div><small>الموقع</small><strong>${esc(siteName(t.siteId))}</strong></div><div><small>الشركة</small><strong>${esc(companyName(t.companyId))}</strong></div><div><small>القسم</small><strong>${esc(deptName(t.department))}</strong></div><div><small>المسؤول</small><strong>${esc(employeeName(t.assignedTo))}</strong></div><div><small>تاريخ الاستحقاق</small><strong>${fmtDate(t.due)}</strong></div><div><small>الأولوية</small><strong>${priority(t.priority)}</strong></div><div><small>الحالة الحالية</small><strong>${badge(t.status)}</strong></div></div><div class="modal-label">وصف المهمة</div><div class="description-box">${esc(t.description)||'لا توجد تعليمات إضافية.'}</div><div class="modal-label">تحديث الحالة (تجريبي)</div>${selectGroup('الحالة الجديدة','detail-status',[{value:'pending',label:'بانتظار التنفيذ'},{value:'progress',label:'قيد التنفيذ'},{value:'done',label:'مكتملة'}],true,true)}<div class="warn-box">هذه تجربة لمسار العمل؛ الاعتمادات الفعلية، والتدقيق، والصور، والإسناد الحقيقي تتطلب الخادم والصلاحيات.</div>`;
    dialog(t.title,detail,`<button class="btn" data-action="close-dialog">إلغاء</button><button class="btn btn-primary" data-action="update-task" data-id="${esc(t.id)}">حفظ التغيير</button>`);$('detail-status').value=t.status;
  }
  function csvExport(){const records=fTasks();const fields=['رقم المهمة','المهمة','الشركة','الموقع','القسم','المسؤول','الأولوية','الحالة','الموعد'];const values=records.map(t=>[t.id,t.title,companyName(t.companyId),siteName(t.siteId),deptName(t.department),employeeName(t.assignedTo),LABELS[t.priority],LABELS[t.status],t.due]);const cell=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const csv='\ufeff'+[fields,...values].map(row=>row.map(cell).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='arcadia-memaar-demo-tasks.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('تم تصدير بيانات المهام التجريبية');}
  function resetDemo(){if(!confirm('هل تريد حذف التعديلات التجريبية وإعادة البيانات الأصلية؟'))return;data=structuredClone(SEED);save();closeDialog();state.company='all';state.site='all';state.search='';state.status='all';refresh();toast('أُعيدت البيانات التجريبية');}
  function closeSidebar(){$('sidebar').classList.remove('open');$('overlay').classList.remove('visible');}
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
  $('menu-btn').addEventListener('click',()=>{$('sidebar').classList.add('open');$('overlay').classList.add('visible');});
  $('overlay').addEventListener('click',closeSidebar);
  $('notification-btn').addEventListener('click',()=>{state.page='maintenance';state.status='pending';state.search='';renderPage();toast('عرض المهام المعلقة — الإشعارات الحقيقية ستُضاف لاحقًا');});
  refresh();
})();
