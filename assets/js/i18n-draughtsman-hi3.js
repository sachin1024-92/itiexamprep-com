/* Draughtsman HI extras part 3 — merges into ITI_I18N.dict */
(function () {
  "use strict";
  var extra = {
    hi: {
      "blog.draughtsman.h2.safety": "5. ड्राइंग ऑफिस व वर्कशॉप सुरक्षा चेकलिस्ट (उच्च-लाभ)",
      "blog.draughtsman.safe1": "दुकान/साइट जाते समय PPE: आँखों की सुरक्षा और उपयुक्त जूते जहाँ आवश्यक — ड्राइंग अक्सर वास्तविक मशीनों से जुड़ती हैं",
      "blog.draughtsman.safe2": "नुकीले उपकरण: कम्पास नोक, डिवाइडर, चाकू/कटर — सुरक्षित रखें; साझा डेस्क या रास्ते पर नोक ऊपर की ओर न छोड़ें",
      "blog.draughtsman.safe3": "एर्गोनॉमिक्स: अच्छी रोशनी, सही आसन, और CAD सत्रों में स्क्रीन ब्रेक — तनाव कम करें जैसा सिखाया जाए",
      "blog.draughtsman.safe4": "CAD कमरों में बिजली / केबल आदतें: रास्तों पर केबल न बिछाएँ; सावधानी से अनप्लग करें; क्षतिग्रस्त प्लग/लीड रिपोर्ट करें",
      "blog.draughtsman.safe5": "रसायन जागरूकता: सॉल्वेंट, स्याही, क्लीनर — हवादार जगह और लेबल वाले कंटेनर जैसा सिखाया जाए; बनावटी “रहस्यमय मिश्रण” नहीं",
      "blog.draughtsman.safe6": "आग व हाउसकीपिंग: निकास साफ रखें, कागज कचरा नियंत्रित करें, निकासी मार्ग जानें — अव्यवस्थित ड्राइंग स्टोर आग और ठोकर का खतरा हैं",
      "blog.draughtsman.h2.ex": "6. तीन उदाहरण MCQ (मूल)",
      "blog.draughtsman.q1": "इंजीनियरिंग ड्राइंग पर टाइटल ब्लॉक के मुख्य उद्देश्य का सबसे अच्छा वर्णन कौन-सा कथन करता है?",
      "blog.draughtsman.q1a": "यह केवल बॉर्डर को रंग से सजाता है",
      "blog.draughtsman.q1b": "यह ड्राइंग की पहचान मुख्य डेटा जैसे पार्ट नाम, स्केल, प्रोजेक्शन विधि और अन्य आवश्यक जानकारी से करता है जैसा सिखाया जाए",
      "blog.draughtsman.q1c": "यह वर्कशॉप लेथ के लिए स्थायी रूप से कटिंग ऑयल संग्रहित करता है",
      "blog.draughtsman.q1d": "यह हर शीट पर किसी भी ऑर्थोग्राफिक व्यू की आवश्यकता हटा देता है",
      "blog.draughtsman.q1ans": "उत्तर: B — टाइटल ब्लॉक = पहचान और मुख्य ड्राइंग डेटा।",
      "blog.draughtsman.q2": "एक प्रशिक्षु कहता है हिडन लाइन और सेंटर लाइन एक ही हैं और हमेशा अदल-बदल इस्तेमाल हो सकती हैं। सबसे अच्छा सुधार कौन-सा है?",
      "blog.draughtsman.q2a": "हाँ — हर डैश्ड लाइन का एक ही मतलब है, कोई उद्देश्य अंतर नहीं",
      "blog.draughtsman.q2b": "उद्देश्य मिलाएँ: हिडन लाइनें उस व्यू में न दिखने वाले किनारे दिखाती हैं; सेंटर लाइनें अक्ष/सममिति चिह्नित करती हैं — अंधाधुंध अदला-बदली न करें",
      "blog.draughtsman.q2c": "मैकेनिकल ड्राइंग पर इनमें से कोई लाइन प्रकार कभी इस्तेमाल नहीं होता",
      "blog.draughtsman.q2d": "सेंटर लाइनें केवल पेंसिल लीड को ठंडा करती हैं",
      "blog.draughtsman.q2ans": "उत्तर: B — हिडन ≠ सेंटर; लाइन प्रकार उद्देश्य से मिलाएँ।"
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
