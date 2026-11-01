# Changelog

## V0.2.2 — إصلاح الشاشة الفارغة (Hotfix)

- إصلاح دالة `$` المفقودة في 6 وحدات JavaScript، التي أوقفت تحميل لوحة التحكم.
- إصلاح زر إعادة بيانات العرض إلى الافتراضي باستخدام `resetData()`.
- إضافة معامل إصدار `?v=0.2.2` للملف الرئيسي ووارداته لتقليل تأثير التخزين المؤقت بعد النشر.
- تنظيف تعبير CSV من محارف تحكم غير قابلة للطباعة.
- اختبار إنشاء الواجهة والعرض الأولي لكل الأقسام الـ11 باستخدام محاكاة DOM، وفحص صياغة كل ملفات JavaScript.
- **لم يكتمل اختبار تفاعل مرئي بمتصفح حقيقي في بيئة الاختبار** بسبب قيود التصفح؛ يرجى التحقق بعد النشر.

---

# Changelog — V0.2.1

## Changes made
- Preserve V0.1's Arabic dark/gold UI, original logos, 11 navigation sections, and demo-only flows.
- Split styles into `css/main.css`, `css/components.css`, `css/dashboard.css`, and `css/responsive.css`.
- Split JavaScript into ES modules under `js/core`, `js/pages`, `js/features`, and `js/ui`.
- Preserve the old `am-ops-demo-v1` localStorage key to avoid losing existing local demo edits.
- Improve error handling for unavailable local storage.
- Protect exported CSV cells from spreadsheet-formula injection.
- Prevent saving employee, site, or task names containing only spaces.
- Improve dialog closing focus restoration.
- Update demo version labels from 0.1 to 0.2.1.
- Add `.gitignore`, test checklist, and deployment guide.

## Verification performed
- Syntax-checked all generated JavaScript modules with Node.js.
- Headless Chromium test using an injected in-memory bundle (not a live GitHub Pages deployment): visited all 11 sections, created a task, modified its status, rejected a blank task name, downloaded CSV, opened the mobile menu, and visited the employee page on mobile.
- No page JavaScript errors reported in that harness; no document-level horizontal scroll at 390px.
- Direct navigation to the local HTTP server was blocked by the test environment; actual deployment must still be checked after uploading.

## Still not implemented
- Real authentication, permissions, Supabase integration, cross-device synchronization, audit logs, approvals and production security.
- This is **NOT** suitable for storing real employee data or confidential incidents.
