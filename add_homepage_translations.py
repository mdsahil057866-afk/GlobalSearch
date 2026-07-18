import json
import codecs

homepage_keys = {
  "English": {
    "shortcuts": {
      "CoreNet": "CoreNet",
      "PlayTube": "PlayTube",
      "QuickChat": "QuickChat",
      "Pixora": "Pixora",
      "Pixora": "Pixora",
      "Drive": "Drive",
      "NovaAI": "NovaAI",
      "VillageNet": "VillageNet",
      "NaviMap": "NaviMap",
      "SwiftPay": "SwiftPay",
      "SyncMeet": "SyncMeet",
      "SwiftMail": "SwiftMail"
    },
    "voice": {
      "listening": "Listening for \"Hey Bharat\"...",
      "tapToSpeak": "Tap to speak"
    },
    "customize": {
      "title": "Customize INDISearch",
      "appearance": "Appearance",
      "backgroundImage": "Background Image",
      "currentTheme": "Current theme or custom image",
      "uploadFromDevice": "Upload from device",
      "removeBackground": "Remove Background",
      "setBackground": "Set Background",
      "light": "Light",
      "dark": "Dark"
    }
  },
  "Hindi": {
    "shortcuts": {
      "CoreNet": "भारतनेट",
      "PlayTube": "भारतट्यूब",
      "QuickChat": "भारतचैट",
      "Pixora": "भारतसोशल",
      "Pixora": "भारतकनेक्ट",
      "Drive": "ड्राइव",
      "NovaAI": "भारतAI",
      "VillageNet": "विलेजनेट",
      "NaviMap": "भारतमैप्स",
      "SwiftPay": "भारतपे",
      "SyncMeet": "भारतमेट",
      "SwiftMail": "भारतमेल"
    },
    "voice": {
      "listening": "\"हे भारत\" के लिए सुन रहा है...",
      "tapToSpeak": "बोलने के लिए टैप करें"
    },
    "customize": {
      "title": "INDISearch को कस्टमाइज़ करें",
      "appearance": "दिखावट",
      "backgroundImage": "पृष्ठभूमि छवि",
      "currentTheme": "वर्तमान थीम या कस्टम छवि",
      "uploadFromDevice": "डिवाइस से अपलोड करें",
      "removeBackground": "पृष्ठभूमि हटाएं",
      "setBackground": "पृष्ठभूमि सेट करें",
      "light": "लाइट",
      "dark": "डार्क"
    }
  },
  "Punjabi": {
    "shortcuts": {
      "CoreNet": "ਭਾਰਤਨੈੱਟ",
      "PlayTube": "ਭਾਰਤਟਿਊਬ",
      "QuickChat": "ਭਾਰਤਚੈਟ",
      "Pixora": "ਭਾਰਤਸੋਸ਼ਲ",
      "Pixora": "ਭਾਰਤਕਨੈਕਟ",
      "Drive": "ਡਰਾਈਵ",
      "NovaAI": "ਭਾਰਤAI",
      "VillageNet": "ਵਿਲੇਜਨੈੱਟ",
      "NaviMap": "ਭਾਰਤਮੈਪਸ",
      "SwiftPay": "ਭਾਰਤਪੇ",
      "SyncMeet": "ਭਾਰਤਮੀਟ",
      "SwiftMail": "ਭਾਰਤਮੇਲ"
    },
    "voice": {
      "listening": "\"ਹੇ ਭਾਰਤ\" ਲਈ ਸੁਣ ਰਿਹਾ ਹੈ...",
      "tapToSpeak": "ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ"
    },
    "customize": {
      "title": "INDISearch ਨੂੰ ਕਸਟਮਾਈਜ਼ ਕਰੋ",
      "appearance": "ਦਿੱਖ",
      "backgroundImage": "ਪਿਛੋਕੜ ਚਿੱਤਰ",
      "currentTheme": "ਮੌਜੂਦਾ ਥੀਮ ਜਾਂ ਕਸਟਮ ਚਿੱਤਰ",
      "uploadFromDevice": "ਡਿਵਾਈਸ ਤੋਂ ਅੱਪਲੋਡ ਕਰੋ",
      "removeBackground": "ਪਿਛੋਕੜ ਹਟਾਓ",
      "setBackground": "ਪਿਛੋਕੜ ਸੈੱਟ ਕਰੋ",
      "light": "ਲਾਈਟ",
      "dark": "ਡਾਰਕ"
    }
  },
  "Bengali": {
    "shortcuts": {
      "CoreNet": "ভারতনেট",
      "PlayTube": "ভারতটিউব",
      "QuickChat": "ভারতচ্যাট",
      "Pixora": "ভারতসোশ্যাল",
      "Pixora": "ভারতকানেক্ট",
      "Drive": "ড্রাইভ",
      "NovaAI": "ভারতAI",
      "VillageNet": "ভিলেজনেট",
      "NaviMap": "ভারতম্যাপস",
      "SwiftPay": "ভারতপে",
      "SyncMeet": "ভারতমীট",
      "SwiftMail": "ভারতমেইল"
    },
    "voice": {
      "listening": "\"হে ভারত\" শোনার অপেক্ষায়...",
      "tapToSpeak": "কথা বলতে ট্যাপ করুন"
    },
    "customize": {
      "title": "INDISearch কাস্টমাইজ করুন",
      "appearance": "চেহারা",
      "backgroundImage": "পটভূমি চিত্র",
      "currentTheme": "বর্তমান থিম বা কাস্টম চিত্র",
      "uploadFromDevice": "ডিভাইস থেকে আপলোড করুন",
      "removeBackground": "পটভূমি সরান",
      "setBackground": "পটভূমি সেট করুন",
      "light": "হালকা",
      "dark": "অন্ধকার"
    }
  },
  "Marathi": {
    "shortcuts": {
      "CoreNet": "भारतनेट",
      "PlayTube": "भारतट्यूब",
      "QuickChat": "भारतचॅट",
      "Pixora": "भारतसोशल",
      "Pixora": "भारतकनेक्ट",
      "Drive": "ड्राइव्ह",
      "NovaAI": "भारतAI",
      "VillageNet": "व्हिलेजनेट",
      "NaviMap": "भारतमॅप्स",
      "SwiftPay": "भारतपे",
      "SyncMeet": "भारतमिट",
      "SwiftMail": "भारतमेल"
    },
    "voice": {
      "listening": "\"हे भारत\" ऐकत आहे...",
      "tapToSpeak": "बोलण्यासाठी टॅप करा"
    },
    "customize": {
      "title": "INDISearch कस्टमाइज करा",
      "appearance": "स्वरूप",
      "backgroundImage": "पार्श्वभूमी प्रतिमा",
      "currentTheme": "सध्याची थीम किंवा कस्टम प्रतिमा",
      "uploadFromDevice": "डिव्हाइसवरून अपलोड करा",
      "removeBackground": "पार्श्वभूमी काढा",
      "setBackground": "पार्श्वभूमी सेट करा",
      "light": "लाइट",
      "dark": "डार्क"
    }
  }
}

try:
    with codecs.open(r'c:\Users\LC\Desktop\indisearch\frontend\src\utils\translations.js', 'r', 'utf-8') as f:
        content = f.read()

    start_idx = content.find('{', content.find('export const translations ='))
    end_idx = content.find('};\n', start_idx) + 1

    json_str = content[start_idx:end_idx]
    translations = json.loads(json_str)

    for lang in translations:
        if lang in homepage_keys:
            translations[lang].update(homepage_keys[lang])
        else:
            translations[lang].update(homepage_keys["English"])

    output = "// frontend/src/utils/translations.js\n\nexport const translations = " + json.dumps(translations, indent=2, ensure_ascii=False) + ";\n\n" + content[end_idx:]

    with codecs.open(r'c:\Users\LC\Desktop\indisearch\frontend\src\utils\translations.js', 'w', 'utf-8') as f:
        f.write(output)

    print("Successfully updated translations.js with homepage text!")
except Exception as e:
    print(f"Error: {e}")
