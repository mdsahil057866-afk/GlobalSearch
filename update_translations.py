import json
import codecs

existing_js = """
export const getTranslation = (lang, key) => {
  const dictionary = translations[lang] || translations['English'];
  const keys = key.split('.');
  let value = dictionary;
  
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      // Fallback to English if key doesn't exist in selected language
      let fallbackValue = translations['English'];
      for (const fk of keys) {
        if (fallbackValue && fallbackValue[fk] !== undefined) {
          fallbackValue = fallbackValue[fk];
        } else {
          return key; // Return key as string if not found anywhere
        }
      }
      return fallbackValue;
    }
  }
  return value;
};
"""

translations = {
  "English": {
    "tagline": "India ka Apna Search Engine",
    "searchPlaceholder": "Search INDISearch or type a URL",
    "offeredIn": "INDISearch offered in:",
    "aboutResults": "About {count} results (incognito)",
    "tabs": {
      "aiMode": "AI Mode",
      "all": "All",
      "videos": "Videos",
      "images": "Images",
      "shortVideos": "Short videos",
      "shopping": "Shopping",
      "news": "News",
      "more": "More"
    },
    "footer": {
      "india": "India",
      "zeroLogs": "Zero-Logs Policy Active",
      "about": "About",
      "advertising": "Advertising",
      "business": "Business",
      "howSearchWorks": "How Search works",
      "privacy": "Privacy",
      "terms": "Terms",
      "settings": "Settings"
    }
  },
  "Hindi": {
    "tagline": "भारत का अपना सर्च इंजन",
    "searchPlaceholder": "INDISearch पर खोजें या URL टाइप करें",
    "offeredIn": "INDISearch इन भाषाओं में उपलब्ध है:",
    "aboutResults": "लगभग {count} परिणाम (इंकॉग्निटो)",
    "tabs": {
      "aiMode": "AI मोड",
      "all": "सभी",
      "videos": "वीडियो",
      "images": "इमेज",
      "shortVideos": "शॉर्ट वीडियो",
      "shopping": "शॉपिंग",
      "news": "समाचार",
      "more": "और"
    },
    "footer": {
      "india": "भारत",
      "zeroLogs": "ज़ीरो-लॉग्स पॉलिसी सक्रिय",
      "about": "हमारे बारे में",
      "advertising": "विज्ञापन",
      "business": "व्यापार",
      "howSearchWorks": "सर्च कैसे काम करता है",
      "privacy": "गोपनीयता",
      "terms": "शर्तें",
      "settings": "सेटिंग्स"
    }
  },
  "Spanish": {
    "tagline": "El propio motor de búsqueda de la India",
    "searchPlaceholder": "Busca en INDISearch o escribe una URL",
    "offeredIn": "INDISearch ofrecido en:",
    "aboutResults": "Cerca de {count} resultados (incógnito)",
    "tabs": {
      "aiMode": "Modo IA",
      "all": "Todo",
      "videos": "Vídeos",
      "images": "Imágenes",
      "shortVideos": "Vídeos cortos",
      "shopping": "Compras",
      "news": "Noticias",
      "more": "Más"
    },
    "footer": {
      "india": "India",
      "zeroLogs": "Política de cero registros activa",
      "about": "Acerca de",
      "advertising": "Publicidad",
      "business": "Negocios",
      "howSearchWorks": "Cómo funciona la Búsqueda",
      "privacy": "Privacidad",
      "terms": "Términos",
      "settings": "Configuración"
    }
  },
  "French": {
    "tagline": "Le propre moteur de recherche de l'Inde",
    "searchPlaceholder": "Recherchez sur INDISearch ou tapez une URL",
    "offeredIn": "INDISearch proposé en :",
    "aboutResults": "Environ {count} résultats (incognito)",
    "tabs": {
      "aiMode": "Mode IA",
      "all": "Tout",
      "videos": "Vidéos",
      "images": "Images",
      "shortVideos": "Vidéos courtes",
      "shopping": "Shopping",
      "news": "Actualités",
      "more": "Plus"
    },
    "footer": {
      "india": "Inde",
      "zeroLogs": "Politique de zéro journal active",
      "about": "À propos",
      "advertising": "Publicité",
      "business": "Entreprise",
      "howSearchWorks": "Comment fonctionne la recherche",
      "privacy": "Confidentialité",
      "terms": "Conditions",
      "settings": "Paramètres"
    }
  },
  "Bengali": {
    "tagline": "ভারতের নিজস্ব সার্চ ইঞ্জিন",
    "searchPlaceholder": "INDISearch-এ খুঁজুন বা URL টাইপ করুন",
    "offeredIn": "INDISearch এই ভাষায় উপলব্ধ:",
    "aboutResults": "প্রায় {count}টি ফলাফল (ইনকগনিটো)",
    "tabs": {
      "aiMode": "এআই মোড",
      "all": "সব",
      "videos": "ভিডিও",
      "images": "ছবি",
      "shortVideos": "শর্ট ভিডিও",
      "shopping": "শপিং",
      "news": "খবর",
      "more": "আরও"
    },
    "footer": {
      "india": "ভারত",
      "zeroLogs": "জিরো-লগ নীতি সক্রিয়",
      "about": "সম্পর্কে",
      "advertising": "বিজ্ঞাপন",
      "business": "ব্যবসা",
      "howSearchWorks": "কীভাবে সার্চ কাজ করে",
      "privacy": "গোপনীয়তা",
      "terms": "শर्तাবলী",
      "settings": "সেটিংস"
    }
  },
  "Arabic": {
    "tagline": "محرك البحث الخاص بالهند",
    "searchPlaceholder": "ابحث في INDISearch أو اكتب عنوان URL",
    "offeredIn": "يتوفر INDISearch باللغات:",
    "aboutResults": "حوالي {count} من النتائج (التصفح المتخفي)",
    "tabs": {
      "aiMode": "وضع الذكاء الاصطناعي",
      "all": "الكل",
      "videos": "فيديو",
      "images": "صور",
      "shortVideos": "فيديوهات قصيرة",
      "shopping": "تسوق",
      "news": "أخبار",
      "more": "المزيد"
    },
    "footer": {
      "india": "الهند",
      "zeroLogs": "سياسة عدم الاحتفاظ بالسجلات نشطة",
      "about": "لمحة",
      "advertising": "إعلانات",
      "business": "أعمال",
      "howSearchWorks": "كيفية عمل بحث",
      "privacy": "الخصوصية",
      "terms": "البنود",
      "settings": "الإعدادات"
    }
  },
  "Mandarin": {
    "tagline": "印度的专属搜索引擎",
    "searchPlaceholder": "在 INDISearch 中搜索或输入 URL",
    "offeredIn": "INDISearch 提供以下语言：",
    "aboutResults": "约 {count} 条结果（无痕模式）",
    "tabs": {
      "aiMode": "AI 模式",
      "all": "全部",
      "videos": "视频",
      "images": "图片",
      "shortVideos": "短视频",
      "shopping": "购物",
      "news": "新闻",
      "more": "更多"
    },
    "footer": {
      "india": "印度",
      "zeroLogs": "零日志政策已激活",
      "about": "关于",
      "advertising": "广告",
      "business": "商业",
      "howSearchWorks": "搜索运作方式",
      "privacy": "隐私",
      "terms": "条款",
      "settings": "设置"
    }
  },
  "Russian": {
    "tagline": "Собственная поисковая система Индии",
    "searchPlaceholder": "Введите запрос в INDISearch или URL",
    "offeredIn": "INDISearch доступен на:",
    "aboutResults": "Результатов: примерно {count} (инкогнито)",
    "tabs": {
      "aiMode": "Режим ИИ",
      "all": "Все",
      "videos": "Видео",
      "images": "Картинки",
      "shortVideos": "Короткие видео",
      "shopping": "Покупки",
      "news": "Новости",
      "more": "Ещё"
    },
    "footer": {
      "india": "Индия",
      "zeroLogs": "Политика нулевых логов активна",
      "about": "О сервисе",
      "advertising": "Реклама",
      "business": "Бизнес",
      "howSearchWorks": "Как работает поиск",
      "privacy": "Конфиденциальность",
      "terms": "Условия",
      "settings": "Настройки"
    }
  },
  "Portuguese": {
    "tagline": "O motor de busca próprio da Índia",
    "searchPlaceholder": "Pesquise no INDISearch ou digite um URL",
    "offeredIn": "INDISearch oferecido em:",
    "aboutResults": "Cerca de {count} resultados (incógnito)",
    "tabs": {
      "aiMode": "Modo IA",
      "all": "Tudo",
      "videos": "Vídeos",
      "images": "Imagens",
      "shortVideos": "Vídeos curtos",
      "shopping": "Shopping",
      "news": "Notícias",
      "more": "Mais"
    },
    "footer": {
      "india": "Índia",
      "zeroLogs": "Política de Zero Logs Ativa",
      "about": "Sobre",
      "advertising": "Publicidade",
      "business": "Negócios",
      "howSearchWorks": "Como funciona a Pesquisa",
      "privacy": "Privacidade",
      "terms": "Termos",
      "settings": "Configurações"
    }
  },
  "Indonesian": {
    "tagline": "Mesin Pencari Milik India",
    "searchPlaceholder": "Telusuri INDISearch atau ketik URL",
    "offeredIn": "INDISearch ditawarkan dalam:",
    "aboutResults": "Sekitar {count} hasil (penyamaran)",
    "tabs": {
      "aiMode": "Mode AI",
      "all": "Semua",
      "videos": "Video",
      "images": "Gambar",
      "shortVideos": "Video pendek",
      "shopping": "Belanja",
      "news": "Berita",
      "more": "Lainnya"
    },
    "footer": {
      "india": "India",
      "zeroLogs": "Kebijakan Tanpa Log Aktif",
      "about": "Tentang",
      "advertising": "Periklanan",
      "business": "Bisnis",
      "howSearchWorks": "Cara kerja Penelusuran",
      "privacy": "Privasi",
      "terms": "Persyaratan",
      "settings": "Setelan"
    }
  },
  "German": {
    "tagline": "Indiens eigene Suchmaschine",
    "searchPlaceholder": "In INDISearch suchen oder URL eingeben",
    "offeredIn": "INDISearch angeboten auf:",
    "aboutResults": "Ungefähr {count} Ergebnisse (Inkognito)",
    "tabs": {
      "aiMode": "KI-Modus",
      "all": "Alle",
      "videos": "Videos",
      "images": "Bilder",
      "shortVideos": "Kurzvideos",
      "shopping": "Shopping",
      "news": "News",
      "more": "Mehr"
    },
    "footer": {
      "india": "Indien",
      "zeroLogs": "Zero-Logs-Richtlinie aktiv",
      "about": "Über",
      "advertising": "Werbung",
      "business": "Unternehmen",
      "howSearchWorks": "Wie die Suche funktioniert",
      "privacy": "Datenschutz",
      "terms": "Nutzungsbedingungen",
      "settings": "Einstellungen"
    }
  },
  "Japanese": {
    "tagline": "インド独自の検索エンジン",
    "searchPlaceholder": "INDISearchで検索するか、URLを入力してください",
    "offeredIn": "INDISearch の提供言語:",
    "aboutResults": "約 {count} 件の結果（シークレット）",
    "tabs": {
      "aiMode": "AIモード",
      "all": "すべて",
      "videos": "動画",
      "images": "画像",
      "shortVideos": "ショート動画",
      "shopping": "ショッピング",
      "news": "ニュース",
      "more": "もっと見る"
    },
    "footer": {
      "india": "インド",
      "zeroLogs": "ゼロログポリシー有効",
      "about": "概要",
      "advertising": "広告",
      "business": "ビジネス",
      "howSearchWorks": "検索の仕組み",
      "privacy": "プライバシー",
      "terms": "利用規約",
      "settings": "設定"
    }
  },
  "Korean": {
    "tagline": "인도 자체 검색 엔진",
    "searchPlaceholder": "INDISearch 검색 또는 URL 입력",
    "offeredIn": "INDISearch 제공 언어:",
    "aboutResults": "결과 약 {count}개 (시크릿 모드)",
    "tabs": {
      "aiMode": "AI 모드",
      "all": "전체",
      "videos": "동영상",
      "images": "이미지",
      "shortVideos": "짧은 동영상",
      "shopping": "쇼핑",
      "news": "뉴스",
      "more": "더보기"
    },
    "footer": {
      "india": "인도",
      "zeroLogs": "제로 로그 정책 활성화됨",
      "about": "정보",
      "advertising": "광고",
      "business": "비즈니스",
      "howSearchWorks": "검색 작동 방식",
      "privacy": "개인정보처리방침",
      "terms": "약관",
      "settings": "설정"
    }
  },
  "Italian": {
    "tagline": "Il motore di ricerca indiano",
    "searchPlaceholder": "Cerca in INDISearch o inserisci un URL",
    "offeredIn": "INDISearch offerto in:",
    "aboutResults": "Circa {count} risultati (in incognito)",
    "tabs": {
      "aiMode": "Modalità IA",
      "all": "Tutti",
      "videos": "Video",
      "images": "Immagini",
      "shortVideos": "Video brevi",
      "shopping": "Shopping",
      "news": "Notizie",
      "more": "Altro"
    },
    "footer": {
      "india": "India",
      "zeroLogs": "Politica Zero-Logs Attiva",
      "about": "Informazioni",
      "advertising": "Pubblicità",
      "business": "Business",
      "howSearchWorks": "Come funziona la Ricerca",
      "privacy": "Privacy",
      "terms": "Termini",
      "settings": "Impostazioni"
    }
  },
  "Turkish": {
    "tagline": "Hindistan'ın Kendi Arama Motoru",
    "searchPlaceholder": "INDISearch'te arama yapın veya bir URL yazın",
    "offeredIn": "INDISearch şu dillerde sunulmaktadır:",
    "aboutResults": "Yaklaşık {count} sonuç (gizli sekme)",
    "tabs": {
      "aiMode": "Yapay Zeka Modu",
      "all": "Tümü",
      "videos": "Videolar",
      "images": "Görseller",
      "shortVideos": "Kısa videolar",
      "shopping": "Alışveriş",
      "news": "Haberler",
      "more": "Daha fazla"
    },
    "footer": {
      "india": "Hindistan",
      "zeroLogs": "Sıfır Günlük Politikası Aktif",
      "about": "Hakkında",
      "advertising": "Reklam",
      "business": "İşletme",
      "howSearchWorks": "Arama nasıl çalışır?",
      "privacy": "Gizlilik",
      "terms": "Şartlar",
      "settings": "Ayarlar"
    }
  },
  "Vietnamese": {
    "tagline": "Công cụ tìm kiếm của riêng Ấn Độ",
    "searchPlaceholder": "Tìm kiếm trên INDISearch hoặc nhập URL",
    "offeredIn": "INDISearch được cung cấp bằng:",
    "aboutResults": "Khoảng {count} kết quả (ẩn danh)",
    "tabs": {
      "aiMode": "Chế độ AI",
      "all": "Tất cả",
      "videos": "Video",
      "images": "Hình ảnh",
      "shortVideos": "Video ngắn",
      "shopping": "Mua sắm",
      "news": "Tin tức",
      "more": "Thêm"
    },
    "footer": {
      "india": "Ấn Độ",
      "zeroLogs": "Chính sách không lưu nhật ký đang hoạt động",
      "about": "Giới thiệu",
      "advertising": "Quảng cáo",
      "business": "Doanh nghiệp",
      "howSearchWorks": "Cách hoạt động của Tìm kiếm",
      "privacy": "Quyền riêng tư",
      "terms": "Điều khoản",
      "settings": "Cài đặt"
    }
  },
  "Urdu": {
    "tagline": "ہندوستان کا اپنا سرچ انجن",
    "searchPlaceholder": "INDISearch میں تلاش کریں یا URL ٹائپ کریں",
    "offeredIn": "INDISearch ان زبانوں میں دستیاب ہے:",
    "aboutResults": "تقریباً {count} نتائج (پوشیدہ)",
    "tabs": {
      "aiMode": "AI موڈ",
      "all": "سبھی",
      "videos": "ویڈیوز",
      "images": "تصاویر",
      "shortVideos": "مختصر ویڈیوز",
      "shopping": "شاپنگ",
      "news": "خبریں",
      "more": "مزید"
    },
    "footer": {
      "india": "ہندوستان",
      "zeroLogs": "زیرو لاگز پالیسی فعال ہے",
      "about": "ہمارے بارے میں",
      "advertising": "اشتہارات",
      "business": "کاروبار",
      "howSearchWorks": "تلاش کیسے کام کرتی ہے",
      "privacy": "رازداری",
      "terms": "شرائط",
      "settings": "ترتیبات"
    }
  },
  "Punjabi": {
    "tagline": "ਭਾਰਤ ਦਾ ਆਪਣਾ ਸਰਚ ਇੰਜਣ",
    "searchPlaceholder": "INDISearch ਵਿੱਚ ਖੋਜੋ ਜਾਂ URL ਟਾਈਪ ਕਰੋ",
    "offeredIn": "INDISearch ਇਹਨਾਂ ਵਿੱਚ ਉਪਲਬਧ ਹੈ:",
    "aboutResults": "ਲਗਭਗ {count} ਨਤੀਜੇ (ਇਨਕੋਗਨਿਟੋ)",
    "tabs": {
      "aiMode": "AI ਮੋਡ",
      "all": "ਸਾਰੇ",
      "videos": "ਵੀਡੀਓ",
      "images": "ਚਿੱਤਰ",
      "shortVideos": "ਛੋਟੇ ਵੀਡੀਓ",
      "shopping": "ਖਰੀਦਦਾਰੀ",
      "news": "ਖ਼ਬਰਾਂ",
      "more": "ਹੋਰ"
    },
    "footer": {
      "india": "ਭਾਰਤ",
      "zeroLogs": "ਜ਼ੀਰੋ-ਲੌਗਸ ਨੀਤੀ ਸਰਗਰਮ",
      "about": "ਸਾਡੇ ਬਾਰੇ",
      "advertising": "ਇਸ਼ਤਿਹਾਰਬਾਜ਼ੀ",
      "business": "ਕਾਰੋਬਾਰ",
      "howSearchWorks": "ਖੋਜ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ",
      "privacy": "ਗੋਪਨੀਯਤਾ",
      "terms": "ਸ਼ਰਤਾਂ",
      "settings": "ਸੈਟਿੰਗਾਂ"
    }
  },
  "Marathi": {
    "tagline": "भारताचे स्वतःचे सर्च इंजिन",
    "searchPlaceholder": "INDISearch वर शोधा किंवा URL टाइप करा",
    "offeredIn": "INDISearch यामध्ये उपलब्ध आहे:",
    "aboutResults": "सुमारे {count} परिणाम (इन्कॉग्निटो)",
    "tabs": {
      "aiMode": "AI मोड",
      "all": "सर्व",
      "videos": "व्हिडिओ",
      "images": "इमेज",
      "shortVideos": "शॉर्ट व्हिडिओ",
      "shopping": "शॉपिंग",
      "news": "बातम्या",
      "more": "अधिक"
    },
    "footer": {
      "india": "भारत",
      "zeroLogs": "झिरो-लॉग पॉलिसी सक्रिय",
      "about": "आमच्याबद्दल",
      "advertising": "जाहिरात",
      "business": "व्यवसाय",
      "howSearchWorks": "सर्च कसे काम करते",
      "privacy": "गोपनीयता",
      "terms": "अटी",
      "settings": "सेटिंग्ज"
    }
  },
  "Telugu": {
    "tagline": "భారతదేశం యొక్క స్వంత సెర్చ్ ఇంజిన్",
    "searchPlaceholder": "INDISearch‌లో వెదకండి లేదా URL టైప్ చేయండి",
    "offeredIn": "INDISearch ఇందులో అందుబాటులో ఉంది:",
    "aboutResults": "సుమారు {count} ఫలితాలు (ఇన్‌కాగ్నిటో)",
    "tabs": {
      "aiMode": "AI మోడ్",
      "all": "అన్నీ",
      "videos": "వీడియోలు",
      "images": "చిత్రాలు",
      "shortVideos": "షార్ట్ వీడియోలు",
      "shopping": "షాపింగ్",
      "news": "వార్తలు",
      "more": "మరిన్ని"
    },
    "footer": {
      "india": "భారతదేశం",
      "zeroLogs": "జీరో-లాగ్స్ పాలసీ సక్రియం",
      "about": "గురించి",
      "advertising": "ప్రకటనలు",
      "business": "వ్యాపారం",
      "howSearchWorks": "సెర్చ్ ఎలా పనిచేస్తుంది",
      "privacy": "గోప్యత",
      "terms": "షరతులు",
      "settings": "సెట్టింగ్‌లు"
    }
  },
  "Tamil": {
    "tagline": "இந்தியாவின் சொந்த தேடுபொறி",
    "searchPlaceholder": "INDISearch-ல் தேடவும் அல்லது URL-ஐ உள்ளிடவும்",
    "offeredIn": "INDISearch இதில் வழங்கப்படுகிறது:",
    "aboutResults": "சுமார் {count} முடிவுகள் (மறைநிலை)",
    "tabs": {
      "aiMode": "AI பயன்முறை",
      "all": "அனைத்தும்",
      "videos": "வீடியோக்கள்",
      "images": "படங்கள்",
      "shortVideos": "குறுகிய வீடியோக்கள்",
      "shopping": "ஷாப்பிங்",
      "news": "செய்திகள்",
      "more": "மேலும்"
    },
    "footer": {
      "india": "இந்தியா",
      "zeroLogs": "ஜீரோ-லாக்ஸ் கொள்கை செயலில் உள்ளது",
      "about": "பற்றி",
      "advertising": "விளம்பரம்",
      "business": "வணிகம்",
      "howSearchWorks": "தேடல் எவ்வாறு செயல்படுகிறது",
      "privacy": "தனியுரிமை",
      "terms": "விதிமுறைகள்",
      "settings": "அமைப்புகள்"
    }
  },
  "Gujarati": {
    "tagline": "ભારતનું પોતાનું સર્ચ એન્જિન",
    "searchPlaceholder": "INDISearch પર શોધો અથવા URL ટાઇપ કરો",
    "offeredIn": "INDISearch આમાં ઉપલબ્ધ છે:",
    "aboutResults": "આશરે {count} પરિણામો (ઇન્કોગ્નિટો)",
    "tabs": {
      "aiMode": "AI મોડ",
      "all": "બધા",
      "videos": "વીડિયો",
      "images": "ચિત્રો",
      "shortVideos": "શોર્ટ વીડિયો",
      "shopping": "શોપિંગ",
      "news": "સમાચાર",
      "more": "વધુ"
    },
    "footer": {
      "india": "ભારત",
      "zeroLogs": "ઝીરો-લૉગ્સ નીતિ સક્રિય",
      "about": "અમારા વિશે",
      "advertising": "જાહેરાત",
      "business": "વ્યાપાર",
      "howSearchWorks": "સર્ચ કેવી રીતે કામ કરે છે",
      "privacy": "ગોપનીયતા",
      "terms": "શરતો",
      "settings": "સેટિંગ્સ"
    }
  },
  "Kannada": {
    "tagline": "ಭಾರತದ ಸ್ವಂತ ಸರ್ಚ್ ಎಂಜಿನ್",
    "searchPlaceholder": "INDISearch ನಲ್ಲಿ ಹುಡುಕಿ ಅಥವಾ URL ಟೈಪ್ ಮಾಡಿ",
    "offeredIn": "INDISearch ಇದರಲ್ಲಿ ಲಭ್ಯವಿದೆ:",
    "aboutResults": "ಸುಮಾರು {count} ಫಲಿತಾಂಶಗಳು (ಇನ್‌ಕಾಗ್ನಿಟೋ)",
    "tabs": {
      "aiMode": "AI ಮೋಡ್",
      "all": "ಎಲ್ಲಾ",
      "videos": "ವೀಡಿಯೊಗಳು",
      "images": "ಚಿತ್ರಗಳು",
      "shortVideos": "ಕಿರು ವೀಡಿಯೊಗಳು",
      "shopping": "ಶಾಪಿಂಗ್",
      "news": "ಸುದ್ದಿ",
      "more": "ಇನ್ನಷ್ಟು"
    },
    "footer": {
      "india": "ಭಾರತ",
      "zeroLogs": "ಶೂನ್ಯ-ಲಾಗ್ಸ್ ನೀತಿ ಸಕ್ರಿಯವಾಗಿದೆ",
      "about": "ಬಗ್ಗೆ",
      "advertising": "ಜಾಹೀರಾತು",
      "business": "ವ್ಯಾಪಾರ",
      "howSearchWorks": "ಹುಡುಕಾಟ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
      "privacy": "ಗೌಪ್ಯತೆ",
      "terms": "ನಿಯಮಗಳು",
      "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು"
    }
  },
  "Malayalam": {
    "tagline": "ഇന്ത്യയുടെ സ്വന്തം സെർച്ച് എഞ്ചിൻ",
    "searchPlaceholder": "INDISearch-ൽ തിരയുക അല്ലെങ്കിൽ URL ടൈപ്പ് ചെയ്യുക",
    "offeredIn": "INDISearch ഇതിൽ ലഭ്യമാണ്:",
    "aboutResults": "ഏകദേശം {count} ഫലങ്ങൾ (ഇൻകോഗ്നിറ്റോ)",
    "tabs": {
      "aiMode": "AI മോഡ്",
      "all": "എല്ലാം",
      "videos": "വീഡിയോകൾ",
      "images": "ചിത്രങ്ങൾ",
      "shortVideos": "ഷോർട്ട് വീഡിയോകൾ",
      "shopping": "ഷോപ്പിംഗ്",
      "news": "വാർത്തകൾ",
      "more": "കൂടുതൽ"
    },
    "footer": {
      "india": "ഇന്ത്യ",
      "zeroLogs": "സീറോ-ലോഗ്സ് നയം സജീവം",
      "about": "കുറിച്ച്",
      "advertising": "പരസ്യം",
      "business": "ബിസിനസ്സ്",
      "howSearchWorks": "തിരയൽ എങ്ങനെ പ്രവർത്തിക്കുന്നു",
      "privacy": "സ്വകാര്യത",
      "terms": "നിബന്ധനകൾ",
      "settings": "ക്രമീകരണങ്ങൾ"
    }
  },
  "Odia": {
    "tagline": "ଭାରତର ନିଜସ୍ୱ ସର୍ଚ୍ଚ ଇଞ୍ଜିନ",
    "searchPlaceholder": "INDISearch ରେ ସର୍ଚ୍ଚ କରନ୍ତୁ କିମ୍ବା URL ଟାଇପ୍ କରନ୍ତୁ",
    "offeredIn": "INDISearch ଏଥିରେ ଉପଲବ୍ଧ:",
    "aboutResults": "ପ୍ରାୟ {count} ଫଳାଫଳ (ଇନକଗନିଟୋ)",
    "tabs": {
      "aiMode": "AI ମୋଡ୍",
      "all": "ସବୁ",
      "videos": "ଭିଡିଓ",
      "images": "ଇମେଜ୍",
      "shortVideos": "ସର୍ଟ ଭିଡିଓ",
      "shopping": "ସପିଂ",
      "news": "ଖବର",
      "more": "ଅଧିକ"
    },
    "footer": {
      "india": "ଭାରତ",
      "zeroLogs": "ଜିରୋ-ଲଗ୍ସ ପଲିସି ସକ୍ରିୟ",
      "about": "ଆମ ବିଷୟରେ",
      "advertising": "ବିଜ୍ଞାପନ",
      "business": "ବ୍ୟବସାୟ",
      "howSearchWorks": "ସର୍ଚ୍ଚ କିପରି କାମ କରେ",
      "privacy": "ଗୋପନୀୟତା",
      "terms": "ସର୍ତ୍ତାବଳୀ",
      "settings": "ସେଟିଂସ"
    }
  },
  "Dutch": {
    "tagline": "India's Eigen Zoekmachine",
    "searchPlaceholder": "Zoek in INDISearch of typ een URL",
    "offeredIn": "INDISearch aangeboden in:",
    "aboutResults": "Ongeveer {count} resultaten (incognito)",
    "tabs": {
      "aiMode": "AI Modus",
      "all": "Alles",
      "videos": "Video's",
      "images": "Afbeeldingen",
      "shortVideos": "Korte video's",
      "shopping": "Winkelen",
      "news": "Nieuws",
      "more": "Meer"
    },
    "footer": {
      "india": "India",
      "zeroLogs": "Zero-Logs Beleid Actief",
      "about": "Over",
      "advertising": "Adverteren",
      "business": "Bedrijf",
      "howSearchWorks": "Hoe Zoeken werkt",
      "privacy": "Privacy",
      "terms": "Voorwaarden",
      "settings": "Instellingen"
    }
  },
  "Polish": {
    "tagline": "Własna wyszukiwarka Indii",
    "searchPlaceholder": "Szukaj w INDISearch lub wpisz URL",
    "offeredIn": "INDISearch oferowane w:",
    "aboutResults": "Około {count} wyników (incognito)",
    "tabs": {
      "aiMode": "Tryb AI",
      "all": "Wszystko",
      "videos": "Wideo",
      "images": "Grafika",
      "shortVideos": "Krótkie wideo",
      "shopping": "Zakupy",
      "news": "Wiadomości",
      "more": "Więcej"
    },
    "footer": {
      "india": "Indie",
      "zeroLogs": "Polityka Zero-Logs Aktywna",
      "about": "O nas",
      "advertising": "Reklama",
      "business": "Firma",
      "howSearchWorks": "Jak działa Wyszukiwarka",
      "privacy": "Prywatność",
      "terms": "Warunki",
      "settings": "Ustawienia"
    }
  },
  "Thai": {
    "tagline": "เครื่องมือค้นหาของอินเดียเอง",
    "searchPlaceholder": "ค้นหาใน INDISearch หรือพิมพ์ URL",
    "offeredIn": "INDISearch ให้บริการใน:",
    "aboutResults": "ประมาณ {count} รายการ (ไม่ระบุตัวตน)",
    "tabs": {
      "aiMode": "โหมด AI",
      "all": "ทั้งหมด",
      "videos": "วิดีโอ",
      "images": "ค้นหารูปภาพ",
      "shortVideos": "วิดีโอสั้น",
      "shopping": "ช็อปปิ้ง",
      "news": "ข่าวสาร",
      "more": "เพิ่มเติม"
    },
    "footer": {
      "india": "อินเดีย",
      "zeroLogs": "นโยบายไม่บันทึกข้อมูลทำงานอยู่",
      "about": "เกี่ยวกับ",
      "advertising": "โฆษณา",
      "business": "ธุรกิจ",
      "howSearchWorks": "การค้นหาทำงานอย่างไร",
      "privacy": "ความเป็นส่วนตัว",
      "terms": "ข้อกำหนด",
      "settings": "การตั้งค่า"
    }
  },
  "Persian": {
    "tagline": "موتور جستجوی اختصاصی هند",
    "searchPlaceholder": "در INDISearch جستجو کنید یا URL را وارد کنید",
    "offeredIn": "INDISearch به زبان‌های زیر ارائه می‌شود:",
    "aboutResults": "حدود {count} نتیجه (ناشناس)",
    "tabs": {
      "aiMode": "حالت هوش مصنوعی",
      "all": "همه",
      "videos": "ویدیوها",
      "images": "تصاویر",
      "shortVideos": "ویدیوهای کوتاه",
      "shopping": "خرید",
      "news": "اخبار",
      "more": "بیشتر"
    },
    "footer": {
      "india": "هند",
      "zeroLogs": "خط مشی صفر-لاگ فعال است",
      "about": "درباره",
      "advertising": "تبلیغات",
      "business": "کسب و کار",
      "howSearchWorks": "جستجو چگونه کار می کند",
      "privacy": "حریم خصوصی",
      "terms": "شرایط",
      "settings": "تنظیمات"
    }
  },
  "Swahili": {
    "tagline": "Injini ya Utafutaji ya India",
    "searchPlaceholder": "Tafuta kwenye INDISearch au andika URL",
    "offeredIn": "INDISearch inapatikana katika:",
    "aboutResults": "Takriban matokeo {count} (fiche)",
    "tabs": {
      "aiMode": "Hali ya AI",
      "all": "Zote",
      "videos": "Video",
      "images": "Picha",
      "shortVideos": "Video fupi",
      "shopping": "Manunuzi",
      "news": "Habari",
      "more": "Zaidi"
    },
    "footer": {
      "india": "India",
      "zeroLogs": "Sera ya Kutohifadhi Kumbukumbu Inatumika",
      "about": "Kuhusu",
      "advertising": "Utangazaji",
      "business": "Biashara",
      "howSearchWorks": "Jinsi Utafutaji unavyofanya kazi",
      "privacy": "Faragha",
      "terms": "Masharti",
      "settings": "Mipangilio"
    }
  }
}

output = "// frontend/src/utils/translations.js\n\nexport const translations = " + json.dumps(translations, indent=2, ensure_ascii=False) + ";\n\n" + existing_js

with codecs.open(r'c:\Users\LC\Desktop\indisearch\frontend\src\utils\translations.js', 'w', 'utf-8') as f:
    f.write(output)
