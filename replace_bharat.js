const fs = require('fs');
const path = require('path');

const replacements = {
  'PlayTube': 'PlayTube',
  'QuickChat': 'QuickChat',
  'Pixora': 'Pixora',
  'Pixora': 'Pixora',
  'NovaAI': 'NovaAI',
  'NaviMap': 'NaviMap',
  'NaviMap': 'NaviMap',
  'SwiftPay': 'SwiftPay',
  'SyncMeet': 'SyncMeet',
  'SwiftMail': 'SwiftMail',
  'CoreNet': 'CoreNet',
  'playtube': 'playtube',
  'quickchat': 'quickchat',
  'pixora': 'pixora',
  'pixora': 'pixora',
  'novaai': 'novaai',
  'navimap': 'navimap',
  'navimap': 'navimap',
  'swiftpay': 'swiftpay',
  'syncmeet': 'syncmeet',
  'swiftmail': 'swiftmail',
  'corenet': 'corenet',
};

// Ignore node_modules, .git, etc.
const ignoreDirs = ['node_modules', '.git', 'build', 'dist', '.gemini', 'assets', 'public'];

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignoreDirs.includes(file)) {
        processDirectory(fullPath);
      }
    } else if (stat.isFile() && /\.(js|jsx|ts|tsx|html|css|json|md|py)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Make sure not to mess up image names if we can help it, but we also want to rename imports.
      // Wait, let's just do a global replace for these exact words.
      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(key, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, value);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Modified: ${fullPath}`);
      }
    }
  }
}

const rootDir = 'C:\\Users\\LC\\Desktop\\indisearch';
processDirectory(rootDir);
console.log("Replacement complete.");
