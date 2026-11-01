// Demonstration-only synthetic data. Never place actual employee data here.
export function createSeed(day) {
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
  return SEED;
}
