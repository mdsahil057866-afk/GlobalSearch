import json
import codecs

search_results_map = {
  "English": {
    "officialTitle": "{query} - Official Website",
    "officialDesc": "This is the official website for {query}. Find all the latest updates, news, and official information right here on INDISearch.",
    "newsTitle": "Latest News about {query} in India",
    "newsDesc": "Read the most recent and verified news articles regarding {query}. Coverage from top Indian journalists and local news networks.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Learn everything about {query} on Wikipedia, the free encyclopedia. Detailed history, facts, and references."
  },
  "Hindi": {
    "officialTitle": "{query} - आधिकारिक वेबसाइट",
    "officialDesc": "यह {query} की आधिकारिक वेबसाइट है। सभी नवीनतम अपडेट, समाचार और आधिकारिक जानकारी INDISearch पर प्राप्त करें।",
    "newsTitle": "भारत में {query} के बारे में नवीनतम समाचार",
    "newsDesc": "{query} के बारे में सबसे हालिया और सत्यापित समाचार लेख पढ़ें। शीर्ष भारतीय पत्रकारों और स्थानीय समाचार नेटवर्क का कवरेज।",
    "wikiTitle": "{query} - विकिपीडिया",
    "wikiDesc": "मुफ़्त विश्वकोश विकिपीडिया पर {query} के बारे में सब कुछ जानें। विस्तृत इतिहास, तथ्य और संदर्भ।"
  },
  "Spanish": {
    "officialTitle": "{query} - Sitio web oficial",
    "officialDesc": "Este es el sitio web oficial de {query}. Encuentra las últimas actualizaciones, noticias e información oficial aquí en INDISearch.",
    "newsTitle": "Últimas noticias sobre {query} en la India",
    "newsDesc": "Lee los artículos de noticias más recientes y verificados sobre {query}. Cobertura de los principales periodistas indios y redes de noticias locales.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Aprende todo sobre {query} en Wikipedia, la enciclopedia libre. Historia detallada, datos y referencias."
  },
  "French": {
    "officialTitle": "{query} - Site Officiel",
    "officialDesc": "Ceci est le site officiel de {query}. Retrouvez toutes les dernières mises à jour, actualités et informations officielles ici sur INDISearch.",
    "newsTitle": "Dernières nouvelles concernant {query} en Inde",
    "newsDesc": "Lisez les articles de presse les plus récents et vérifiés concernant {query}. Couverture par les meilleurs journalistes indiens et réseaux de presse locaux.",
    "wikiTitle": "{query} - Wikipédia",
    "wikiDesc": "Apprenez tout sur {query} sur Wikipédia, l'encyclopédie libre. Histoire détaillée, faits et références."
  },
  "Bengali": {
    "officialTitle": "{query} - অফিসিয়াল ওয়েবসাইট",
    "officialDesc": "এটি {query} এর অফিসিয়াল ওয়েবসাইট। সর্বশেষ আপডেট, খবর এবং অফিসিয়াল তথ্য INDISearch-এ খুঁজুন।",
    "newsTitle": "ভারতে {query} সম্পর্কিত সর্বশেষ খবর",
    "newsDesc": "{query} সম্পর্কিত সাম্প্রতিকতম এবং যাচাইকৃত সংবাদ নিবন্ধ পড়ুন। শীর্ষস্থানীয় ভারতীয় সাংবাদিক এবং স্থানীয় সংবাদ নেটওয়ার্ক থেকে কভারেজ।",
    "wikiTitle": "{query} - উইকিপিডিয়া",
    "wikiDesc": "মুক্ত বিশ্বকোষ উইকিপিডিয়ায় {query} সম্পর্কে সবকিছু জানুন। বিস্তারিত ইতিহাস, তথ্য এবং তথ্যসূত্র।"
  },
  "Arabic": {
    "officialTitle": "{query} - الموقع الرسمي",
    "officialDesc": "هذا هو الموقع الرسمي لـ {query}. ابحث عن جميع التحديثات والأخبار والمعلومات الرسمية هنا على INDISearch.",
    "newsTitle": "آخر الأخبار حول {query} في الهند",
    "newsDesc": "اقرأ أحدث المقالات الإخبارية الموثقة بخصوص {query}. تغطية من كبار الصحفيين الهنود وشبكات الأخبار المحلية.",
    "wikiTitle": "{query} - ويكيبيديا",
    "wikiDesc": "تعرف على كل شيء عن {query} على ويكيبيديا، الموسوعة الحرة. تاريخ مفصل وحقائق ومراجع."
  },
  "Mandarin": {
    "officialTitle": "{query} - 官方网站",
    "officialDesc": "这是 {query} 的官方网站。在 INDISearch 上查找所有最新更新、新闻和官方信息。",
    "newsTitle": "关于 {query} 在印度的最新新闻",
    "newsDesc": "阅读关于 {query} 的最新和经过验证的新闻文章。来自印度顶级记者和当地新闻网络的报道。",
    "wikiTitle": "{query} - 维基百科",
    "wikiDesc": "在自由百科全书维基百科上了解关于 {query} 的一切。详细历史、事实和参考资料。"
  },
  "Russian": {
    "officialTitle": "{query} - Официальный сайт",
    "officialDesc": "Это официальный сайт {query}. Найдите все последние обновления, новости и официальную информацию прямо здесь, на INDISearch.",
    "newsTitle": "Последние новости о {query} в Индии",
    "newsDesc": "Читайте самые свежие и проверенные новостные статьи о {query}. Освещение от ведущих индийских журналистов и местных новостных сетей.",
    "wikiTitle": "{query} - Википедия",
    "wikiDesc": "Узнайте все о {query} в Википедии, свободной энциклопедии. Подробная история, факты и ссылки."
  },
  "Portuguese": {
    "officialTitle": "{query} - Site Oficial",
    "officialDesc": "Este é o site oficial de {query}. Encontre todas as atualizações, notícias e informações oficiais mais recentes aqui no INDISearch.",
    "newsTitle": "Últimas notícias sobre {query} na Índia",
    "newsDesc": "Leia as notícias mais recentes e verificadas sobre {query}. Cobertura dos principais jornalistas indianos e redes de notícias locais.",
    "wikiTitle": "{query} - Wikipédia",
    "wikiDesc": "Aprenda tudo sobre {query} na Wikipédia, a enciclopédia livre. História detalhada, fatos e referências."
  },
  "Indonesian": {
    "officialTitle": "{query} - Situs Web Resmi",
    "officialDesc": "Ini adalah situs web resmi untuk {query}. Temukan semua pembaruan, berita, dan informasi resmi terbaru di sini, di INDISearch.",
    "newsTitle": "Berita Terbaru tentang {query} di India",
    "newsDesc": "Baca artikel berita terbaru dan terverifikasi mengenai {query}. Liputan dari jurnalis top India dan jaringan berita lokal.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Pelajari segalanya tentang {query} di Wikipedia, ensiklopedia bebas. Sejarah terperinci, fakta, dan referensi."
  },
  "German": {
    "officialTitle": "{query} - Offizielle Website",
    "officialDesc": "Dies ist die offizielle Website für {query}. Finden Sie alle aktuellen Updates, Nachrichten und offiziellen Informationen hier auf INDISearch.",
    "newsTitle": "Neueste Nachrichten über {query} in Indien",
    "newsDesc": "Lesen Sie die neuesten und verifizierten Nachrichtenartikel zu {query}. Berichterstattung von führenden indischen Journalisten und lokalen Nachrichtennetzwerken.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Erfahren Sie alles über {query} auf Wikipedia, der freien Enzyklopädie. Detaillierte Geschichte, Fakten und Referenzen."
  },
  "Japanese": {
    "officialTitle": "{query} - 公式ウェブサイト",
    "officialDesc": "これは {query} の公式ウェブサイトです。最新のアップデート、ニュース、公式情報はすべてここ INDISearch で見つけることができます。",
    "newsTitle": "インドの {query} に関する最新ニュース",
    "newsDesc": "{query} に関する最新の検証済みニュース記事をお読みください。インドのトップジャーナリストやローカルニュースネットワークからの報道。",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "フリー百科事典 Wikipedia で {query} について学びましょう。詳細な歴史、事実、参照。"
  },
  "Korean": {
    "officialTitle": "{query} - 공식 웹사이트",
    "officialDesc": "이것은 {query}의 공식 웹사이트입니다. 모든 최신 업데이트, 뉴스, 공식 정보를 INDISearch에서 바로 찾으세요.",
    "newsTitle": "인도 내 {query} 관련 최신 뉴스",
    "newsDesc": "{query}에 관한 가장 최근의 검증된 뉴스 기사를 읽어보세요. 인도의 일류 언론인 및 현지 뉴스 네트워크의 보도.",
    "wikiTitle": "{query} - 위키백과",
    "wikiDesc": "자유 백과사전 위키백과에서 {query}에 대한 모든 것을 알아보세요. 상세한 역사, 사실 및 참조."
  },
  "Italian": {
    "officialTitle": "{query} - Sito Ufficiale",
    "officialDesc": "Questo è il sito ufficiale di {query}. Trova tutti gli ultimi aggiornamenti, notizie e informazioni ufficiali proprio qui su INDISearch.",
    "newsTitle": "Ultime notizie su {query} in India",
    "newsDesc": "Leggi gli articoli di notizie più recenti e verificati riguardo a {query}. Copertura dai migliori giornalisti indiani e reti di notizie locali.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Scopri tutto su {query} su Wikipedia, l'enciclopedia libera. Storia dettagliata, fatti e riferimenti."
  },
  "Turkish": {
    "officialTitle": "{query} - Resmi Web Sitesi",
    "officialDesc": "Bu, {query} için resmi web sitesidir. En son güncellemeleri, haberleri ve resmi bilgileri burada INDISearch'te bulun.",
    "newsTitle": "Hindistan'da {query} Hakkında Son Haberler",
    "newsDesc": "{query} ile ilgili en güncel ve doğrulanmış haber makalelerini okuyun. Önde gelen Hintli gazetecilerden ve yerel haber ağlarından kapsamlı haberler.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Özgür ansiklopedi Wikipedia'da {query} hakkında her şeyi öğrenin. Ayrıntılı tarihçe, gerçekler ve referanslar."
  },
  "Vietnamese": {
    "officialTitle": "{query} - Trang web Chính thức",
    "officialDesc": "Đây là trang web chính thức của {query}. Tìm tất cả các bản cập nhật, tin tức và thông tin chính thức mới nhất ngay tại đây trên INDISearch.",
    "newsTitle": "Tin tức mới nhất về {query} ở Ấn Độ",
    "newsDesc": "Đọc các bài báo mới nhất và đã được xác minh về {query}. Tin bài từ các nhà báo hàng đầu Ấn Độ và các mạng tin tức địa phương.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Tìm hiểu mọi thứ về {query} trên Wikipedia, bách khoa toàn thư mở. Lịch sử chi tiết, sự kiện và tài liệu tham khảo."
  },
  "Urdu": {
    "officialTitle": "{query} - سرکاری ویب سائٹ",
    "officialDesc": "یہ {query} کی سرکاری ویب سائٹ ہے۔ تمام تازہ ترین اپ ڈیٹس، خبریں اور سرکاری معلومات یہیں INDISearch پر تلاش کریں۔",
    "newsTitle": "ہندوستان میں {query} کے بارے میں تازہ ترین خبریں",
    "newsDesc": "{query} سے متعلق تازہ ترین اور تصدیق شدہ خبریں پڑھیں۔ ہندوستان کے سرکردہ صحافیوں اور مقامی نیوز نیٹ ورکس کی کوریج۔",
    "wikiTitle": "{query} - ویکیپیڈیا",
    "wikiDesc": "مفت انسائیکلوپیڈیا ویکیپیڈیا پر {query} کے بارے میں سب کچھ جانیں۔ تفصیلی تاریخ، حقائق اور حوالہ جات۔"
  },
  "Punjabi": {
    "officialTitle": "{query} - ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ",
    "officialDesc": "ਇਹ {query} ਲਈ ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ ਹੈ। ਇੱਥੇ INDISearch 'ਤੇ ਸਾਰੇ ਨਵੀਨਤਮ ਅੱਪਡੇਟ, ਖਬਰਾਂ ਅਤੇ ਅਧਿਕਾਰਤ ਜਾਣਕਾਰੀ ਲੱਭੋ।",
    "newsTitle": "ਭਾਰਤ ਵਿੱਚ {query} ਬਾਰੇ ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ",
    "newsDesc": "{query} ਬਾਰੇ ਸਭ ਤੋਂ ਤਾਜ਼ਾ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਖਬਰਾਂ ਪੜ੍ਹੋ। ਚੋਟੀ ਦੇ ਭਾਰਤੀ ਪੱਤਰਕਾਰਾਂ ਅਤੇ ਸਥਾਨਕ ਨਿਊਜ਼ ਨੈੱਟਵਰਕਾਂ ਤੋਂ ਕਵਰੇਜ।",
    "wikiTitle": "{query} - ਵਿਕੀਪੀਡੀਆ",
    "wikiDesc": "ਮੁਫ਼ਤ ਐਨਸਾਈਕਲੋਪੀਡੀਆ, ਵਿਕੀਪੀਡੀਆ 'ਤੇ {query} ਬਾਰੇ ਸਭ ਕੁਝ ਜਾਣੋ। ਵਿਸਤ੍ਰਿਤ ਇਤਿਹਾਸ, ਤੱਥ ਅਤੇ ਹਵਾਲੇ।"
  },
  "Marathi": {
    "officialTitle": "{query} - अधिकृत वेबसाईट",
    "officialDesc": "ही {query} ची अधिकृत वेबसाईट आहे. सर्व नवीनतम अपडेट्स, बातम्या आणि अधिकृत माहिती थेट इथे INDISearch वर शोधा.",
    "newsTitle": "भारतातील {query} बद्दलच्या ताज्या बातम्या",
    "newsDesc": "{query} बद्दलचे सर्वात अलीकडील आणि पडताळलेले वृत्त लेख वाचा. शीर्ष भारतीय पत्रकार आणि स्थानिक वृत्त नेटवर्क कडून कव्हरेज.",
    "wikiTitle": "{query} - विकिपीडिया",
    "wikiDesc": "मुक्त ज्ञानकोश विकिपीडियावर {query} बद्दल सर्व काही जाणून घ्या. तपशीलवार इतिहास, तथ्ये आणि संदर्भ."
  },
  "Telugu": {
    "officialTitle": "{query} - అధికారిక వెబ్‌సైట్",
    "officialDesc": "ఇది {query} అధికారిక వెబ్‌సైట్. అన్ని తాజా అప్‌డేట్‌లు, వార్తలు మరియు అధికారిక సమాచారాన్ని ఇక్కడే INDISearch లో కనుగొనండి.",
    "newsTitle": "భారతదేశంలో {query} గురించి తాజా వార్తలు",
    "newsDesc": "{query} కి సంబంధించిన అత్యంత ఇటీవలి మరియు ధృవీకరించబడిన వార్తా కథనాలను చదవండి. అగ్రశ్రేణి భారతీయ పాత్రికేయులు మరియు స్థానిక వార్తా నెట్‌వర్క్‌ల కవరేజ్.",
    "wikiTitle": "{query} - వికీపీడియా",
    "wikiDesc": "ఉచిత విజ్ఞాన సర్వస్వం అయిన వికీపీడియాలో {query} గురించి ప్రతిదీ తెలుసుకోండి. వివరణాత్మక చరిత్ర, వాస్తవాలు మరియు సూచనలు."
  },
  "Tamil": {
    "officialTitle": "{query} - அதிகாரப்பூர்வ இணையதளம்",
    "officialDesc": "இது {query}-க்கான அதிகாரப்பூர்வ இணையதளம். அனைத்து சமீபத்திய புதுப்பிப்புகள், செய்திகள் மற்றும் அதிகாரப்பூர்வ தகவல்களை இங்கேயே INDISearch-ல் கண்டறியவும்.",
    "newsTitle": "இந்தியாவில் {query} பற்றிய சமீபத்திய செய்திகள்",
    "newsDesc": "{query} தொடர்பான மிகச் சமீபத்திய மற்றும் சரிபார்க்கப்பட்ட செய்தி கட்டுரைகளைப் படிக்கவும். சிறந்த இந்திய செய்தியாளர்கள் மற்றும் உள்ளூர் செய்தி வலைப்பின்னல்களின் கவரேஜ்.",
    "wikiTitle": "{query} - விக்கிப்பீடியா",
    "wikiDesc": "இலவச கலைக்களஞ்சியமான விக்கிப்பீடியாவில் {query} பற்றி அனைத்தையும் தெரிந்துகொள்ளுங்கள். விரிவான வரலாறு, உண்மைகள் மற்றும் குறிப்புகள்."
  },
  "Gujarati": {
    "officialTitle": "{query} - સત્તાવાર વેબસાઇટ",
    "officialDesc": "આ {query} માટેની સત્તાવાર વેબસાઇટ છે. તમામ નવીનતમ અપડેટ્સ, સમાચાર અને સત્તાવાર માહિતી અહીં જ INDISearch પર શોધો.",
    "newsTitle": "ભારતમાં {query} વિશે નવીનતમ સમાચાર",
    "newsDesc": "{query} સંબંધિત સૌથી તાજેતરના અને ચકાસાયેલ સમાચાર લેખો વાંચો. ટોચના ભારતીય પત્રકારો અને સ્થાનિક સમાચાર નેટવર્ક્સનું કવરેજ.",
    "wikiTitle": "{query} - વિકિપીડિયા",
    "wikiDesc": "મુક્ત જ્ઞાનકોશ વિકિપીડિયા પર {query} વિશે બધું જાણો. વિગતવાર ઇતિહાસ, તથ્યો અને સંદર્ભો."
  },
  "Kannada": {
    "officialTitle": "{query} - ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್",
    "officialDesc": "ಇದು {query} ನ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಆಗಿದೆ. ಎಲ್ಲಾ ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳು, ಸುದ್ದಿಗಳು ಮತ್ತು ಅಧಿಕೃತ ಮಾಹಿತಿಯನ್ನು ಇಲ್ಲಿ INDISearch ನಲ್ಲಿ ಹುಡುಕಿ.",
    "newsTitle": "ಭಾರತದಲ್ಲಿ {query} ಬಗ್ಗೆ ಇತ್ತೀಚಿನ ಸುದ್ದಿ",
    "newsDesc": "{query} ಗೆ ಸಂಬಂಧಿಸಿದ ತೀರಾ ಇತ್ತೀಚಿನ ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ಸುದ್ದಿ ಲೇಖನಗಳನ್ನು ಓದಿ. ಉನ್ನತ ಭಾರತೀಯ ಪತ್ರಕರ್ತರು ಮತ್ತು ಸ್ಥಳೀಯ ಸುದ್ದಿ ನೆಟ್‌ವರ್ಕ್‌ಗಳಿಂದ ಕವರೇಜ್.",
    "wikiTitle": "{query} - ವಿಕಿಪೀಡಿಯಾ",
    "wikiDesc": "ಮುಕ್ತ ವಿಶ್ವಕೋಶ ವಿಕಿಪೀಡಿಯಾದಲ್ಲಿ {query} ಬಗ್ಗೆ ಎಲ್ಲವನ್ನೂ ತಿಳಿಯಿರಿ. ವಿವರವಾದ ಇತಿಹಾಸ, ಸಂಗತಿಗಳು ಮತ್ತು ಉಲ್ಲೇಖಗಳು."
  },
  "Malayalam": {
    "officialTitle": "{query} - ഔദ്യോഗിക വെബ്സൈറ്റ്",
    "officialDesc": "ഇത് {query}-ന്റെ ഔദ്യോഗിക വെബ്സൈറ്റാണ്. എല്ലാ പുതിയ അപ്‌ഡേറ്റുകളും വാർത്തകളും ഔദ്യോഗിക വിവരങ്ങളും ഇവിടെ INDISearch-ൽ കണ്ടെത്തുക.",
    "newsTitle": "ഇന്ത്യയിലെ {query}-നെക്കുറിച്ചുള്ള ഏറ്റവും പുതിയ വാർത്തകൾ",
    "newsDesc": "{query}-യുമായി ബന്ധപ്പെട്ട ഏറ്റവും പുതിയതും സ്ഥിരീകരിച്ചതുമായ വാർത്താ ലേഖനങ്ങൾ വായിക്കുക. മികച്ച ഇന്ത്യൻ പത്രപ്രവർത്തകരിലും പ്രാദേശിക വാർത്താ ശൃംഖലകളിലും നിന്നുള്ള കവറേജ്.",
    "wikiTitle": "{query} - വിക്കിപീഡിയ",
    "wikiDesc": "സ്വതന്ത്ര വിജ്ഞാനകോശമായ വിക്കിപീഡിയയിൽ {query}-നെക്കുറിച്ച് എല്ലാം പഠിക്കുക. വിശദമായ ചരിത്രം, വസ്തുതകൾ, റഫറൻസുകൾ."
  },
  "Odia": {
    "officialTitle": "{query} - ଅଫିସିଆଲ୍ ୱେବସାଇଟ୍",
    "officialDesc": "ଏହା ହେଉଛି {query} ର ଅଫିସିଆଲ୍ ୱେବସାଇଟ୍ | ସମସ୍ତ ସର୍ବଶେଷ ଅପଡେଟ୍, ଖବର ଏବଂ ଅଫିସିଆଲ୍ ସୂଚନା ଏଠାରେ INDISearch ରେ ପାଆନ୍ତୁ |",
    "newsTitle": "ଭାରତରେ {query} ବିଷୟରେ ସର୍ବଶେଷ ଖବର",
    "newsDesc": "{query} ବିଷୟରେ ସବୁଠାରୁ ସାମ୍ପ୍ରତିକ ଏବଂ ଯାଞ୍ଚ ହୋଇଥିବା ଖବର ପ୍ରବନ୍ଧଗୁଡିକ ପଢ଼ନ୍ତୁ | ଶୀର୍ଷ ଭାରତୀୟ ସାମ୍ବାଦିକ ଏବଂ ସ୍ଥାନୀୟ ନ୍ୟୁଜ୍ ନେଟୱାର୍କରୁ କଭରେଜ୍ |",
    "wikiTitle": "{query} - ୱିକିପିଡ଼ିଆ",
    "wikiDesc": "ମାଗଣା ଏନସାଇକ୍ଲୋପିଡ଼ିଆ, ୱିକିପିଡ଼ିଆରେ {query} ବିଷୟରେ ସବୁକିଛି ଜାଣନ୍ତୁ | ବିସ୍ତୃତ ଇତିହାସ, ତଥ୍ୟ ଏବଂ ସନ୍ଦର୍ଭ |"
  },
  "Dutch": {
    "officialTitle": "{query} - Officiële Website",
    "officialDesc": "Dit is de officiële website voor {query}. Vind alle laatste updates, nieuws en officiële informatie hier op INDISearch.",
    "newsTitle": "Laatste Nieuws over {query} in India",
    "newsDesc": "Lees de meest recente en geverifieerde nieuwsartikelen over {query}. Verslaggeving van top Indiase journalisten en lokale nieuwsnetwerken.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Leer alles over {query} op Wikipedia, de vrije encyclopedie. Gedetailleerde geschiedenis, feiten en referenties."
  },
  "Polish": {
    "officialTitle": "{query} - Oficjalna strona internetowa",
    "officialDesc": "To jest oficjalna strona internetowa dla {query}. Znajdź wszystkie najnowsze aktualizacje, wiadomości i oficjalne informacje tutaj, na INDISearch.",
    "newsTitle": "Najnowsze wiadomości o {query} w Indiach",
    "newsDesc": "Przeczytaj najnowsze i zweryfikowane artykuły informacyjne dotyczące {query}. Relacje najlepszych indyjskich dziennikarzy i lokalnych sieci informacyjnych.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Dowiedz się wszystkiego o {query} na Wikipedii, wolnej encyklopedii. Szczegółowa historia, fakty i referencje."
  },
  "Thai": {
    "officialTitle": "{query} - เว็บไซต์ทางการ",
    "officialDesc": "นี่คือเว็บไซต์ทางการของ {query} ค้นหาอัปเดต ข่าวสาร และข้อมูลทางการล่าสุดทั้งหมดได้ที่นี่บน INDISearch",
    "newsTitle": "ข่าวล่าสุดเกี่ยวกับ {query} ในอินเดีย",
    "newsDesc": "อ่านบทความข่าวล่าสุดและผ่านการตรวจสอบแล้วเกี่ยวกับ {query} การรายงานข่าวจากนักข่าวชั้นนำของอินเดียและเครือข่ายข่าวท้องถิ่น",
    "wikiTitle": "{query} - วิกิพีเดีย",
    "wikiDesc": "เรียนรู้ทุกสิ่งเกี่ยวกับ {query} บนวิกิพีเดีย สารานุกรมเสรี ประวัติศาสตร์โดยละเอียด ข้อเท็จจริง และแหล่งอ้างอิง"
  },
  "Persian": {
    "officialTitle": "{query} - وب‌سایت رسمی",
    "officialDesc": "این وب‌سایت رسمی {query} است. تمام آخرین به‌روزرسانی‌ها، اخبار و اطلاعات رسمی را در اینجا در INDISearch بیابید.",
    "newsTitle": "آخرین اخبار درباره {query} در هند",
    "newsDesc": "تازه‌ترین و تأییدشده‌ترین مقالات خبری در مورد {query} را بخوانید. پوشش توسط برترین روزنامه‌نگاران هندی و شبکه‌های خبری محلی.",
    "wikiTitle": "{query} - ویکی‌پدیا",
    "wikiDesc": "همه‌چیز درباره {query} را در ویکی‌پدیا، دانشنامه آزاد بیاموزید. تاریخچه دقیق، حقایق و مراجع."
  },
  "Swahili": {
    "officialTitle": "{query} - Tovuti Rasmi",
    "officialDesc": "Hii ni tovuti rasmi ya {query}. Pata masasisho yote ya hivi punde, habari na taarifa rasmi hapa INDISearch.",
    "newsTitle": "Habari za Hivi Punde kuhusu {query} nchini India",
    "newsDesc": "Soma makala za hivi punde na zilizothibitishwa kuhusu {query}. Utangazaji kutoka kwa wanahabari wakuu wa India na mitandao ya habari za ndani.",
    "wikiTitle": "{query} - Wikipedia",
    "wikiDesc": "Jifunze kila kitu kuhusu {query} kwenye Wikipedia, kamusi elezo huru. Historia ya kina, ukweli na marejeleo."
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
        if lang in search_results_map:
            translations[lang]["searchResults"] = search_results_map[lang]
        else:
            translations[lang]["searchResults"] = search_results_map["English"]

    output = "// frontend/src/utils/translations.js\n\nexport const translations = " + json.dumps(translations, indent=2, ensure_ascii=False) + ";\n\n" + content[end_idx:]

    with codecs.open(r'c:\Users\LC\Desktop\indisearch\frontend\src\utils\translations.js', 'w', 'utf-8') as f:
        f.write(output)

    print("Successfully updated translations.js with search results!")
except Exception as e:
    print(f"Error: {e}")

