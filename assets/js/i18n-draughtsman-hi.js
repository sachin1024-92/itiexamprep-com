/* Draughtsman Mechanical HI i18n extras — merges into ITI_I18N.dict */
(function () {
  "use strict";
  var extra = {
    hi: {
      "blog.draughtsman.crumb": "ड्राफ्ट्समैन चेकलिस्ट",
      "blog.draughtsman.h1": "ITI ड्राफ्ट्समैन मैकेनिकल CBT: ऑर्थोग्राफिक व्यू, डाइमेंशनिंग और ड्राइंग ऑफिस सुरक्षा चेकलिस्ट",
      "blog.draughtsman.lead": "ड्राफ्ट्समैन मैकेनिकल प्रशिक्षुओं के लिए व्यावहारिक, मूल रिवीजन नक्शा — ऑर्थोग्राफिक प्रोजेक्शन मूल बातें, सामान्य व्यू व सेक्शन CBT जाल, लाइन प्रकार व डाइमेंशनिंग पसंदीदा, उपकरण व ड्राइंग आदतें, और AITT CBT के लिए ड्राइंग-ऑफिस सुरक्षा।",
      "blog.draughtsman.meta": "3 अक्टूबर 2026 · ड्राफ्ट्समैन मैकेनिकल · ~9 मिनट पढ़ें",
      "blog.draughtsman.intro": "ड्राफ्ट्समैन मैकेनिकल थ्योरी CBT अस्पष्ट ब्रांड CAD मेनू रटने से अधिक स्पष्ट उद्देश्य सोच को पुरस्कृत करता है। यदि आप समझा सकें कि फ्रंट व्यू ऊँचाई और चौड़ाई क्यों दिखाता है, या हिडन लाइन वह किनारा क्यों प्रकट करती है जो दिखता नहीं, तो उलझे विकल्प आसान हो जाते हैं। यह चेकलिस्ट मूल अध्ययन सलाह है — किसी NIMI पुस्तक या कोचिंग PDF की नकल नहीं। अपने बैच का सिलेबस Bharat Skills पर पुष्टि करें।",
      "blog.draughtsman.callout": "अनौपचारिक गाइड। परीक्षा पैटर्न और तिथियाँ हमेशा DGT / NCVT MIS / Skill India Digital पर जाँचें। हम कॉपीराइट NIMI PDF होस्ट नहीं करते।",
      "blog.draughtsman.h2.basics": "1. ड्राइंग मूल बातें फ्लैश कार्ड (इन्हें याद रखें)",
      "blog.draughtsman.b1": "ड्राइंग शीट व लेआउट: मानक शीट आकार (A0–A4 विचार) मार्जिन और टाइटल ब्लॉक के साथ। टाइटल ब्लॉक में पार्ट नाम, स्केल, प्रोजेक्शन विधि और अन्य पहचान होती है — केवल सजावट नहीं।",
      "blog.draughtsman.b2": "स्केल: ड्राइंग आकार और वास्तविक आकार का अनुपात — पूर्ण आकार (1:1), बड़ा करना या छोटा करना जैसा सिखाया जाए। स्केल का अर्थ “हमेशा आधा आकार” नहीं है।",
      "blog.draughtsman.b3": "ऑर्थोग्राफिक प्रोजेक्शन: 3D वस्तु का मुख्य दिशाओं से देखकर बहु-व्यू 2D निरूपण। उद्देश्य = आकार स्पष्ट बताना, एक स्केच से अनुमान नहीं।"
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
