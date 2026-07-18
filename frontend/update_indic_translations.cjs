const fs = require('fs');
const path = './src/utils/translations.js';

let content = fs.readFileSync(path, 'utf8');

const updates = {
  "Tamil": {
    "shortcuts": {
      "BharatNet": "பாரத்நெட்",
      "BharatTube": "பாரத்தியூப்",
      "BharatChat": "பாரத்சாட்",
      "BharatSocial": "பாரத்சோஷியல்",
      "BharatConnect": "பாரத்கனெக்ட்",
      "Drive": "டிரைவ்",
      "BharatAI": "பாரத்AI",
      "VillageNet": "வில்லேஜ்நெட்",
      "BharatMaps": "பாரத்மேப்ஸ்",
      "BharatPay": "பாரத்பே",
      "BharatMeet": "பாரத்மீட்",
      "BharatMail": "பாரத்மெயில்"
    },
    "voice": {
      "listening": "\"ஹே பாரத்\" கேட்கிறது...",
      "tapToSpeak": "பேச தட்டவும்"
    },
    "customize": {
      "title": "INDISearch ஐ தனிப்பயனாக்கு",
      "appearance": "தோற்றம்",
      "backgroundImage": "பின்னணி படம்",
      "currentTheme": "தற்போதைய தீம் அல்லது தனிப்பயன் படம்",
      "uploadFromDevice": "சாதனத்திலிருந்து பதிவேற்றவும்",
      "removeBackground": "பின்னணியை அகற்று",
      "setBackground": "பின்னணியை அமை",
      "light": "வெளிச்சம்",
      "dark": "இருட்டு"
    }
  },
  "Telugu": {
    "shortcuts": {
      "BharatNet": "భారత్‌నెట్",
      "BharatTube": "భారత్‌ట్యూబ్",
      "BharatChat": "భారత్‌చాట్",
      "BharatSocial": "భారత్‌సోషల్",
      "BharatConnect": "భారత్‌కనెక్ట్",
      "Drive": "డ్రైవ్",
      "BharatAI": "భారత్AI",
      "VillageNet": "విలేజ్‌నెట్",
      "BharatMaps": "భారత్‌మ్యాప్స్",
      "BharatPay": "భారత్‌పే",
      "BharatMeet": "భారత్‌మీట్",
      "BharatMail": "భారత్‌మెయిల్"
    },
    "voice": {
      "listening": "\"హే భారత్\" వింటుంది...",
      "tapToSpeak": "మాట్లాడటానికి నొక్కండి"
    },
    "customize": {
      "title": "INDISearch ని అనుకూలీకరించండి",
      "appearance": "స్వరూపం",
      "backgroundImage": "నేపథ్య చిత్రం",
      "currentTheme": "ప్రస్తుత థీమ్ లేదా అనుకూల చిత్రం",
      "uploadFromDevice": "పరికరం నుండి అప్‌లోడ్ చేయండి",
      "removeBackground": "నేపథ్యాన్ని తీసివేయండి",
      "setBackground": "నేపథ్యాన్ని సెట్ చేయండి",
      "light": "లైట్",
      "dark": "డార్క్"
    }
  },
  "Gujarati": {
    "shortcuts": {
      "BharatNet": "ભારતનેટ",
      "BharatTube": "ભારતટ્યુબ",
      "BharatChat": "ભારતચેટ",
      "BharatSocial": "ભારતસોશિયલ",
      "BharatConnect": "ભારતકનેક્ટ",
      "Drive": "ડ્રાઇવ",
      "BharatAI": "ભારતAI",
      "VillageNet": "વિલેજનેટ",
      "BharatMaps": "ભારતમેપ્સ",
      "BharatPay": "ભારતપે",
      "BharatMeet": "ભારતમીટ",
      "BharatMail": "ભારતમેઇલ"
    },
    "voice": {
      "listening": "\"હે ભારત\" સાંભળી રહ્યું છે...",
      "tapToSpeak": "બોલવા માટે ટેપ કરો"
    },
    "customize": {
      "title": "INDISearch કસ્ટમાઇઝ કરો",
      "appearance": "દેખાવ",
      "backgroundImage": "પૃષ્ઠભૂમિ છબી",
      "currentTheme": "વર્તમાન થીમ અથવા કસ્ટમ છબી",
      "uploadFromDevice": "ઉપકરણમાંથી અપલોડ કરો",
      "removeBackground": "પૃષ્ઠભૂમિ દૂર કરો",
      "setBackground": "પૃષ્ઠભૂમિ સેટ કરો",
      "light": "લાઇટ",
      "dark": "ડાર્ક"
    }
  },
  "Kannada": {
    "shortcuts": {
      "BharatNet": "ಭಾರತ್‌ನೆಟ್",
      "BharatTube": "ಭಾರತ್‌ಟ್ಯೂಬ್",
      "BharatChat": "ಭಾರತ್‌ಚಾಟ್",
      "BharatSocial": "ಭಾರತ್‌ಸೋಷಿಯಲ್",
      "BharatConnect": "ಭಾರತ್‌ಕನೆಕ್ಟ್",
      "Drive": "ಡ್ರೈವ್",
      "BharatAI": "ಭಾರತ್AI",
      "VillageNet": "ವಿಲೇಜ್‌ನೆಟ್",
      "BharatMaps": "ಭಾರತ್‌ಮ್ಯಾಪ್ಸ್",
      "BharatPay": "ಭಾರತ್‌ಪೇ",
      "BharatMeet": "ಭಾರತ್‌ಮೀಟ್",
      "BharatMail": "ಭಾರತ್‌ಮೇಲ್"
    },
    "voice": {
      "listening": "\"ಹೇ ಭಾರತ್\" ಕೇಳುತ್ತಿದೆ...",
      "tapToSpeak": "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ"
    },
    "customize": {
      "title": "INDISearch ಕಸ್ಟಮೈಸ್ ಮಾಡಿ",
      "appearance": "ಗೋಚರತೆ",
      "backgroundImage": "ಹಿನ್ನೆಲೆ ಚಿತ್ರ",
      "currentTheme": "ಪ್ರಸ್ತುತ ಥೀಮ್ ಅಥವಾ ಕಸ್ಟಮ್ ಚಿತ್ರ",
      "uploadFromDevice": "ಸಾಧನದಿಂದ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      "removeBackground": "ಹಿನ್ನೆಲೆ ತೆಗೆದುಹಾಕಿ",
      "setBackground": "ಹಿನ್ನೆಲೆ ಹೊಂದಿಸಿ",
      "light": "ಲೈಟ್",
      "dark": "ಡಾರ್ಕ್"
    }
  },
  "Malayalam": {
    "shortcuts": {
      "BharatNet": "ഭാരത്‌നെറ്റ്",
      "BharatTube": "ഭാരത്‌ട്യൂബ്",
      "BharatChat": "ഭാരത്‌ചാറ്റ്",
      "BharatSocial": "ഭാരത്‌സോഷ്യൽ",
      "BharatConnect": "ഭാരത്‌കണക്റ്റ്",
      "Drive": "ഡ്രൈവ്",
      "BharatAI": "ഭാരത്AI",
      "VillageNet": "വില്ലേജ്‌നെറ്റ്",
      "BharatMaps": "ഭാരത്‌മാപ്‌സ്",
      "BharatPay": "ഭാരത്‌പേ",
      "BharatMeet": "ഭാരത്‌മീറ്റ്",
      "BharatMail": "ഭാരത്‌മെയിൽ"
    },
    "voice": {
      "listening": "\"ഹേ ഭാരത്\" കേൾക്കുന്നു...",
      "tapToSpeak": "സംസാരിക്കാൻ ടാപ്പുചെയ്യുക"
    },
    "customize": {
      "title": "INDISearch കസ്റ്റമൈസ് ചെയ്യുക",
      "appearance": "രൂപഭാവം",
      "backgroundImage": "പശ്ചാത്തല ചിത്രം",
      "currentTheme": "നിലവിലെ തീം അല്ലെങ്കിൽ കസ്റ്റം ചിത്രം",
      "uploadFromDevice": "ഉപകരണത്തിൽ നിന്ന് അപ്‌ലോഡ് ചെയ്യുക",
      "removeBackground": "പശ്ചാത്തലം മാറ്റുക",
      "setBackground": "പശ്ചാത്തലം സജ്ജമാക്കുക",
      "light": "ലൈറ്റ്",
      "dark": "ഡാർക്ക്"
    }
  },
  "Odia": {
    "shortcuts": {
      "BharatNet": "ଭାରତନେଟ୍",
      "BharatTube": "ଭାରତଟ୍ୟୁବ୍",
      "BharatChat": "ଭାରତଚାଟ୍",
      "BharatSocial": "ଭାରତସୋସିଆଲ୍",
      "BharatConnect": "ଭାରତକନେକ୍ଟ",
      "Drive": "ଡ୍ରାଇଭ୍",
      "BharatAI": "ଭାରତAI",
      "VillageNet": "ଭିଲେଜନେଟ୍",
      "BharatMaps": "ଭାରତମ୍ୟାପ୍ସ",
      "BharatPay": "ଭାରତପେ",
      "BharatMeet": "ଭାରତମିଟ୍",
      "BharatMail": "ଭାରତମେଲ୍"
    },
    "voice": {
      "listening": "\"ହେ ଭାରତ\" ଶୁଣୁଛି...",
      "tapToSpeak": "କହିବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ"
    },
    "customize": {
      "title": "INDISearch କଷ୍ଟମାଇଜ୍ କରନ୍ତୁ",
      "appearance": "ରୂପ",
      "backgroundImage": "ପୃଷ୍ଠଭୂମି ଚିତ୍ର",
      "currentTheme": "ବର୍ତ୍ତମାନର ଥିମ୍ କିମ୍ବା କଷ୍ଟମ୍ ଚିତ୍ର",
      "uploadFromDevice": "ଡିଭାଇସରୁ ଅପଲୋଡ୍ କରନ୍ତୁ",
      "removeBackground": "ପୃଷ୍ଠଭୂମି ହଟାନ୍ତୁ",
      "setBackground": "ପୃଷ୍ଠଭୂମି ସେଟ୍ କରନ୍ତୁ",
      "light": "ଲାଇଟ୍",
      "dark": "ଡାର୍କ"
    }
  },
  "Urdu": {
    "shortcuts": {
      "BharatNet": "بھارت نیٹ",
      "BharatTube": "بھارت ٹیوب",
      "BharatChat": "بھارت چیٹ",
      "BharatSocial": "بھارت سوشل",
      "BharatConnect": "بھارت کنیکٹ",
      "Drive": "ڈرائیو",
      "BharatAI": "بھارتAI",
      "VillageNet": "ولیج نیٹ",
      "BharatMaps": "بھارت میپس",
      "BharatPay": "بھارت پے",
      "BharatMeet": "بھارت میٹ",
      "BharatMail": "بھارت میل"
    },
    "voice": {
      "listening": "\"ہے بھارت\" سن رہا ہے...",
      "tapToSpeak": "بولنے کے لیے ٹیپ کریں"
    },
    "customize": {
      "title": "INDISearch کو اپنی مرضی کے مطابق بنائیں",
      "appearance": "ظاہری شکل",
      "backgroundImage": "پس منظر کی تصویر",
      "currentTheme": "موجودہ تھیم یا حسب ضرورت تصویر",
      "uploadFromDevice": "آلہ سے اپ لوڈ کریں",
      "removeBackground": "پس منظر کو ہٹائیں",
      "setBackground": "پس منظر سیٹ کریں",
      "light": "لائٹ",
      "dark": "ڈارک"
    }
  }
};

const match = content.match(/export const translations = ({[\s\S]+?});\s*$/m);
if (match) {
  let translationsObj;
  try {
    translationsObj = eval('(' + match[1] + ')');
  } catch(e) {
    console.error("Eval failed", e);
    process.exit(1);
  }
  
  for (const [lang, langUpdates] of Object.entries(updates)) {
    if (translationsObj[lang]) {
      translationsObj[lang].shortcuts = { ...translationsObj[lang].shortcuts, ...langUpdates.shortcuts };
      translationsObj[lang].voice = { ...translationsObj[lang].voice, ...langUpdates.voice };
      translationsObj[lang].customize = { ...translationsObj[lang].customize, ...langUpdates.customize };
    }
  }
  
  const newContent = 'export const translations = ' + JSON.stringify(translationsObj, null, 2) + ';\n';
  fs.writeFileSync(path, newContent, 'utf8');
  console.log("Successfully updated translations!");
} else {
  console.error("Could not find translations export");
}
