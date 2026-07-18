const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace 'http://localhost:5000' with (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000') when it's standalone
  content = content.replace(/'http:\/\/localhost:5000'/g, "(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000')");
  
  // Replace 'http://localhost:5000/api/... ' with `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/...`
  content = content.replace(/'http:\/\/localhost:5000(\/api[^']*)'/g, "`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}$1`");

  // Replace `http://localhost:5000/api/...` with `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/...`
  content = content.replace(/`http:\/\/localhost:5000(\/api[^`]*)`/g, "`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}$1`");

  fs.writeFileSync(filePath, content);
}

const files = [
  'src/components/PlayTube.jsx',
  'src/components/QuickChat.jsx',
  'src/components/SearchBar.jsx'
];

files.forEach(f => {
  const fp = path.join(__dirname, f);
  if (fs.existsSync(fp)) {
    replaceInFile(fp);
    console.log('Updated', f);
  }
});
