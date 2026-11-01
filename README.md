# ARCADIA × MEMAAR DEGLA — Operations Hub V0.2.4

واجهة إدارة تجريبية باللغة العربية لشركتين تحت إدارة واحدة، مع أقسام الأمن والنظافة والصيانة والحضور والتقارير.

## نشر النسخة على GitHub Pages

1. فك ضغط الملف ثم ارفع **محتويات المجلد** (وليس المجلد نفسه) إلى جذر مستودع `arcadia-memaar-management`.
2. يجب أن يوجد `index.html` مباشرة في الجذر، ومعه مجلدات `css/` و `js/` و `assets/` و `database/`.
3. افتح Settings > Pages وحدد `Deploy from a branch` ثم `main` و `/(root)`.
4. افحص المتصفح عبر رابط HTTPS الخاص بالموقع، ثم اختبر إنشاء مهمة وإضافة موظف والموبايل والتصدير.

## التشغيل المحلي

**لا تفتح `index.html` بالنقر المزدوج**: ملفات JavaScript تستخدم ES modules التي تتطلب خادم HTTP محليًا في كثير من المتصفحات.

```bash
python -m http.server 8000
```

ثم افتح http://localhost:8000/ في المتصفح.

## بنية المشروع

- `index.html` — هيكل الصفحة فقط.
- `css/` — الأنماط العامة والمكونات ولوحة التحكم وتصميم الهاتف.
- `js/app.js` — تهيئة الوحدات.
- `js/core/` — البيانات التجريبية والمخزن المحلي والدوال المشتركة.
- `js/pages/` — مولدات صفحات Dashboard والمواقع والموظفين والمهام والتقارير.
- `js/features/` — إنشاء الموظفين والمواقع والمهام والعمليات المتعلقة بها.
- `js/ui/` — المكونات والعرض والنوافذ وتوجيه الأحداث.
- `database/schema.sql` — تصميم أولي **لا يُشغّل تلقائيًا**؛ يحتاج مراجعة قبل استخدامه للإنتاج.

## قيود الأمان

هذه واجهة محلية *بدون* حسابات حقيقية أو صلاحيات أو قاعدة بيانات على الخادم. لا تستخدم بيانات شخصية أو سجلات أمن حقيقية. تخزين المتصفح `localStorage` ليس تخزينًا آمنًا ولا متزامنًا بين الأجهزة.

## التوافق مع V0.1

يبقى مفتاح التخزين `am-ops-demo-v1` كما هو للمحافظة على البيانات التجريبية الحالية. تُعاد البيانات الأصلية من صفحة الإعدادات. أصلحنا تصدير CSV لحماية القيم التي تشبه المعادلات، والتحقق من الحقول الفارغة بعد حذف المسافات.

## الاختبارات

راجع `tests/TEST_PLAN.md` لاختبارات القبول اليدوية والآلية؛ عدم توفر الخادم لا يعني أن التطبيق جاهز للإنتاج.

## إصلاح سريع V0.2.2
- إصلاح حقن دالة الوصول إلى DOM `$` في ست وحدات JavaScript؛ كان يمنع تهيئة لوحة التحكم والقائمة.
- إصلاح زر إعادة ضبط بيانات العرض التجريبي لاستدعاء `resetData()` بدل إسناد إلى ثابت.
- إزالة المحارف الثنائية من التعبير المنتظم للـ CSV، وإضافة cache-busting لملف التشغيل.

## Mobile UX V0.2.4
- `css/mobile-premium.css` overrides responsive presentation without altering desktop styles.
- The bottom navigation renders on screens up to 820px, with the `المزيد` item opening the full sidebar.
- Dashboard and task screens use responsive cards below 820px; desktop tables remain intact.
- The company and site filter controls are visible on mobile in the second toolbar row.
- Manual test widths: 320, 360, 393, 430, 768, 1366 pixels.

## Floating Motion Upgrade V0.2.4
- Floating pill navigation with real margins on all sides (including safe area) and translucent dark glass surface.
- Gold light highlight glides between five tabs and supports all 11 pages via More.
- Soft one-off animations for page navigation, modals, progress bars and button presses.
- Honors `prefers-reduced-motion` and avoids perpetual GPU animations.
- Responsive navigation works without any library, compatible with GitHub Pages and future WebView.
- No change to the demo data storage key or business logic.
