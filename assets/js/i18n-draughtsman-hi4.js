/* Draughtsman HI extras part 4 — merges into ITI_I18N.dict */
(function () {
  "use strict";
  var extra = {
    hi: {
      "blog.draughtsman.q3": "कौन-सी जोड़ी ड्राफ्ट्समैन ड्राइंग-ऑफिस सुरक्षा आदत से सही मेल खाती है?",
      "blog.draughtsman.q3a": "कम्पास को साझा डेस्क रास्ते पर नोक ऊपर की ओर रखकर रखें",
      "blog.draughtsman.q3b": "उपकरण व कमरा सुरक्षा — नुकीले उपकरण सुरक्षित रखें, CAD के लिए अच्छी रोशनी/आसन, केबल नियंत्रित करें, सॉल्वेंट जैसा सिखाया जाए, निकास साफ रखें",
      "blog.draughtsman.q3c": "हर रास्ते पर पावर केबल “आसान पहुँच” के लिए बिछा दें",
      "blog.draughtsman.q3d": "खुली आग के पास बिना लेबल वाले सॉल्वेंट “रहस्यमय तरल” मिलाएँ",
      "blog.draughtsman.q3ans": "उत्तर: B — सुरक्षित उपकरण भंडारण, एर्गोनॉमिक्स, केबल/सॉल्वेंट सावधानी, साफ निकास।",
      "blog.draughtsman.h2.week": "7. एक-सप्ताह ड्राफ्ट्समैन मैकेनिकल थ्योरी स्प्रिंट",
      "blog.draughtsman.w1": "दिन 1–2: शीट लेआउट, टाइटल ब्लॉक, स्केल, ऑर्थोग्राफिक विचार, फर्स्ट/थर्ड एंगल जागरूकता",
      "blog.draughtsman.w2": "दिन 3: व्यू — फ्रंट, टॉप, साइड; सेक्शन; ऑक्सिलरी/डिटेल विचार; व्यू चयन आदत",
      "blog.draughtsman.w3": "दिन 4: लाइन प्रकार — दृश्य, हिडन, सेंटर; डाइमेंशन व एक्सटेंशन; प्रतीक व टॉलरेंस जागरूकता",
      "blog.draughtsman.w4": "दिन 5: उपकरण व आदतें — बोर्ड/T-स्क्वायर, सेट स्क्वायर, कम्पास, स्केल रूल, CAD मूल बातें जहाँ सिखाया जाए",
      "blog.draughtsman.w5": "दिन 6: ड्राइंग-ऑफिस सुरक्षा (उपकरण, एर्गोनॉमिक्स, केबल, सॉल्वेंट, हाउसकीपिंग) + रोजगार योग्यता कौशल",
      "blog.draughtsman.w6": "दिन 7: समयबद्ध ड्राफ्ट्समैन मिनी-मॉक / ट्रेड MCQ + केवल त्रुटि-नोटबुक सुधार",
      "blog.draughtsman.h2.next": "इस साइट पर अगले कदम",
      "blog.draughtsman.linkTrade": "सभी ट्रेड",
      "blog.draughtsman.cardTitle": "ITI ड्राफ्ट्समैन मैकेनिकल CBT: ऑर्थोग्राफिक व्यू, डाइमेंशनिंग और ड्राइंग ऑफिस सुरक्षा चेकलिस्ट",
      "blog.draughtsman.cardDesc": "ऑर्थोग्राफिक प्रोजेक्शन (फर्स्ट/थर्ड एंगल), फ्रंट/टॉप/साइड व सेक्शन जाल, लाइन प्रकार व डाइमेंशनिंग पसंदीदा, उपकरण व CAD आदतें, और ड्राइंग-ऑफिस सुरक्षा चेकलिस्ट।",
      "blog.draughtsman.cardMeta": "3 अक्टूबर 2026 · ड्राफ्ट्समैन मैकेनिकल"
    }
  };
  function mergeAndApply() {
    if (!window.ITI_I18N || !window.ITI_I18N.dict) return false;
    var d = window.ITI_I18N.dict;
    Object.keys(extra).forEach(function (lang) {
      if (!d[lang]) d[lang] = {};
      var src = extra[lang] || {};
      Object.keys(src).forEach(function (k) { d[lang][k] = src[k]; });
    });
    if (typeof window.ITI_I18N.apply === "function" && typeof window.ITI_I18N.getLang === "function") {
      window.ITI_I18N.apply(window.ITI_I18N.getLang());
    }
    return true;
  }
  if (!mergeAndApply()) {
    var n = 0;
    var t = setInterval(function () {
      if (mergeAndApply() || ++n > 80) clearInterval(t);
    }, 50);
  }
})();
