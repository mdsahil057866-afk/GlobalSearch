const fs = require('fs');
try {
  const content = fs.readFileSync('C:/Users/LC/.gemini/antigravity/brain/d72abf9a-1063-4c6f-b09c-72a9c06899f6/.system_generated/logs/overview.txt', 'utf8');
  const lines = content.split('\n');
  const startIndex = lines.findIndex(l => l.includes('Showing lines 1 to 706'));
  
  if (startIndex === -1) {
    console.log('Could not find the start marker');
    process.exit(1);
  }
  
  let result = [];
  // Skip "Showing lines..." and "The following code has been modified..."
  for (let i = startIndex + 2; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('The above content shows the entire')) {
      break;
    }
    // Remove the line number prefix like "1: " or "123: "
    result.push(line.replace(/^\d+:\s?/, ''));
  }
  
  fs.writeFileSync('C:/Users/LC/Desktop/indisearch/recovered_app_store.jsx', result.join('\n'));
  console.log('Recovery successful. Found ' + result.length + ' lines.');
} catch (e) {
  console.error('Error:', e);
}
