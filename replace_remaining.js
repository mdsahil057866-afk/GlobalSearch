const fs = require('fs');

const replacements = [
  { file: 'SyncMeet.jsx', search: /Bharat<span/g, replace: 'Sync<span' },
  { file: 'SwiftPayLogo.jsx', search: /Bharat<tspan/g, replace: 'Swift<tspan' },
  { file: 'SwiftPay.jsx', search: /BHARAT WALLET/g, replace: 'SWIFTPAY WALLET' },
  { file: 'SwiftPay.jsx', search: /BHARAT UPI/g, replace: 'SWIFTPAY UPI' },
  { file: 'SwiftPay.jsx', search: /@bharat/g, replace: '@swift' },
  { file: 'SearchResults.jsx', search: /Bharat App/g, replace: 'Core App' },
  { file: 'SearchBar.jsx', search: /bharat-glow/g, replace: 'core-glow' },
  { file: 'QuickChat.jsx', search: /\(Bharat\)/g, replace: '(Nova)' },
  { file: 'QuickChat.jsx', search: /Bharat Dev Team/g, replace: 'Core Dev Team' },
  { file: 'QuickChat.jsx', search: /Bharat Developers Network/g, replace: 'Core Developers Network' },
  { file: 'QuickChat.jsx', search: /BHARATPAY/g, replace: 'SWIFTPAY' },
  { file: 'QuickChat.jsx', search: /Bharat AI/g, replace: 'Nova AI' },
  { file: 'QuickChat.jsx', search: /Bharat ID/g, replace: 'Core ID' },
  { file: 'QuickChat.jsx', search: /@bharat/g, replace: '@swift' },
  { file: 'Pixora.jsx', search: /Bharat<span/g, replace: 'Pixora<span' },
  { file: 'Pixora.jsx', search: />Social</g, replace: '></' },
  { file: 'NovaAI.jsx', search: /भारत एआई/g, replace: 'नोवा एआई' },
  { file: 'NovaAI.jsx', search: /\(Bharat AI\)/g, replace: '(Nova AI)' },
  { file: 'NovaAI.jsx', search: /Bharat AI/g, replace: 'Nova AI' },
  { file: 'NovaAI.jsx', search: /Bharat<span/g, replace: 'Nova<span' },
  { file: 'NaviMapLogo.jsx', search: /BHARATMAP/g, replace: 'NAVIMAP' },
  { file: 'NaviMap.jsx', search: /Bharat<span/g, replace: 'Navi<span' },
  { file: 'MailInbox.jsx', search: /Bharat<span/g, replace: 'Swift<span' },
  { file: 'MailInbox.jsx', search: /bharatdrive/g, replace: 'corecloud' },
  { file: 'GlobalSearchAppStore.jsx', search: /bharatdrive/g, replace: 'corecloud' },
  { file: 'GlobalSearchAppStore.jsx', search: /BharatDrive/g, replace: 'CoreCloud' },
  { file: 'CoreNetShowcase.jsx', search: /Bharat Search/g, replace: 'Global Search' },
  { file: 'CoreNetShowcase.jsx', search: /bharat_search/g, replace: 'global_search' },
  { file: 'CoreNetShowcase.jsx', search: /Bharat platforms/g, replace: 'Core platforms' },
  { file: 'CoreCloud.jsx', search: /Bharat<span/g, replace: 'Core<span' },
  { file: 'BharatDrive.jsx', search: /BharatDrive/g, replace: 'CoreCloud' },
];

const basePath = 'C:\\Users\\LC\\Desktop\\indisearch\\frontend\\src\\components\\';

for (let rep of replacements) {
  let filepath = basePath + rep.file;
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    content = content.replace(rep.search, rep.replace);
    fs.writeFileSync(filepath, content, 'utf8');
  }
}
console.log('Done replacing inner texts');
