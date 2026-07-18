const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/\|\| 'http:\/\/localhost:5000'/g, "|| ''");
  fs.writeFileSync(filePath, content);
}

const files = [
  'src/components/PlayTube.jsx',
  'src/components/QuickChat.jsx',
  'src/components/SearchBar.jsx',
  'src/context/SocialContext.jsx',
  'src/components/Social/PostCard.jsx'
];

files.forEach(f => {
  const fp = path.join(__dirname, f);
  if (fs.existsSync(fp)) {
    replaceInFile(fp);
    console.log('Updated', f);
  }
});
