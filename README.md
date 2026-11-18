# Portfolio Website — قالب معرض أعمال شخصي

موقع Portfolio عربي RTL، متجاوب مع الهاتف والتابلت والحاسوب، مبني باستخدام HTML5 وCSS3 وJavaScript Vanilla دون إطار عمل أو أدوات بناء.

## محتويات المشروع

```text
portfolio-website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── favicon.svg
    ├── og-cover.svg
    └── cv-placeholder.txt
```

## التشغيل محلياً

1. فك ضغط المشروع.
2. افتح `index.html` في المتصفح.
3. يفضّل استخدام إضافة Live Server في VS Code لتجربة الموقع عبر خادم محلي.

## التخصيص قبل النشر

ابحث في `index.html` عن النصوص التالية واستبدلها ببياناتك:

- `اسمك هنا` و`اسمك`: اسمك الحقيقي ولقبك المهني.
- `hello@example.com`: بريدك الإلكتروني.
- `yourusername`: أسماء حساباتك على المنصات.
- `https://wa.me/213000000000`: رقم واتساب بصيغة دولية دون `+` أو مسافات.
- روابط `href="#"` في بطاقات المشاريع: رابط العرض المباشر ورابط المصدر.
- الأرقام ونسب المهارات ووصف المشاريع: استخدم بيانات دقيقة تعكس خبرتك الفعلية.
- `https://example.com` في JSON-LD: رابط موقعك بعد النشر.
- `assets/cv-placeholder.txt`: استبدله بسيرتك الذاتية PDF مع تحديث رابط التحميل في HTML.

الصورة الشخصية الحالية رمزية بالأحرف الأولى، ويمكن استبدال كتلة `.avatar` بصورة حقيقية مع `alt` مناسب و`loading="lazy"`.

## تفعيل نموذج التواصل عبر Formspree

1. أنشئ نموذجاً في [Formspree](https://formspree.io/).
2. انسخ رابط endpoint الذي تحصل عليه.
3. افتح `script.js` وضع الرابط داخل المتغير `FORMSPREE_ENDPOINT`:

```js
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
```

4. جرّب إرسال رسالة من الموقع المنشور.

لا تضع مفاتيح API سرية في JavaScript أو HTML العام. إعداد Formspree يتم عبر endpoint المخصص للنموذج.

## النشر

### GitHub Pages
1. أنشئ مستودعاً جديداً على GitHub وارفع جميع ملفات المجلد.
2. افتح **Settings → Pages**.
3. اختر **Deploy from a branch** ثم الفرع `main` والمجلد `/root`.
4. احفظ وانتظر رابط الموقع.

### Netlify
1. افتح [Netlify](https://www.netlify.com/).
2. اختر إضافة موقع جديد ثم اسحب مجلد المشروع إلى منطقة النشر اليدوي، أو اربط مستودع GitHub.
3. لا تحتاج إلى Build command؛ مجلد النشر هو جذر المشروع.

### Vercel
1. ارفع المشروع إلى GitHub.
2. استورده من [Vercel](https://vercel.com/).
3. اختر **Other** أو إعداد Static Site، واترك Build Command فارغاً ومجلد الإخراج `.`.

## SEO والأداء

- يتضمن الموقع عنوان الصفحة والوصف وOpen Graph وTwitter Card وبيانات JSON-LD من نوع Person.
- الصور التجريبية مرسومة بـ CSS وSVG ولا تحتاج إلى تنزيل صور كبيرة.
- عند إضافة صور حقيقية، استخدم WebP/AVIF، وحدد `width` و`height` وأضف `loading="lazy"` للصور غير الظاهرة أولاً.
- حدّث `og:image` وبيانات JSON-LD والرابط canonical عند امتلاك نطاقك.
- اختبر الموقع عبر Lighthouse وGoogle Search Console بعد النشر.

## ملاحظات

- المحتوى والروابط الحالية تجريبية ويجب استبدالها قبل مشاركة الموقع.
- زر الوضع الليلي/النهاري يحفظ الاختيار في `localStorage`.
- تأثيرات الظهور تحترم إعداد تقليل الحركة في نظام التشغيل.
