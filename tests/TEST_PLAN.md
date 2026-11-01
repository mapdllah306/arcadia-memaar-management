# V0.2.1 — اختبار قبول النسخة

- افتح الصفحة من HTTP أو HTTPS، وتأكد من عدم ظهور أخطاء JavaScript في وحدة التحكم.
- افتح كل أقسام القائمة الـ11 وتحقق من الانتقال بينها.
- غيّر فلتر الشركة ثم الموقع، وتأكّد من تطابق المهام والموظفين مع الفلاتر.
- أضف مهمة وغيّر حالتها؛ تحقق من بقائها بعد Refresh.
- أضف موقعًا ثم موظفًا مرتبطًا به؛ تحقق من ظهورهما.
- حاول حفظ اسم مكوّن من مسافات فقط: يجب رفضه.
- صدّر CSV من التقارير وتحقق من الترميز والقيم وعدم تفسير العناوين كنصوص صيغ.
- تحقق من شاشة الموبايل وعمل زر فتح/إغلاق القائمة.
- تأكد من عدم وجود استخدام لبيانات فعلية أو مفاتيح سرية في المستودع.
- قبل أي إطلاق حقيقي: نفّذ اختبارات الصلاحيات من قاعدة البيانات، والتحقق من الجلسات، والنسخ الاحتياطي.

## V0.2.4 focused checks
- 320/360/393/430/768px: floating dock detached from side and bottom edges, no horizontal scroll.
- Tabs: selection glow slides for the first 4 destinations; More indicates other sections.
- Navigation: graceful content entrance only on actual page switches (not search/filter changes).
- Reduced motion: zero page/dock animations and no focus regression.
- Open sidebar from top and More, dismiss by backdrop/Escape.
- Try modal, task card and both filters; ensure content is not obscured by dock.
