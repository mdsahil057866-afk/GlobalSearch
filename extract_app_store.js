const fs = require('fs');
const lines = fs.readFileSync('C:/Users/LC/.gemini/antigravity/brain/24216ee6-0574-4761-a130-83590b4a3eac/.system_generated/logs/overview.txt', 'utf8').split('\n');
const stepLine = lines.find(l => l.includes('INDISearchAppStore.jsx') && l.includes('CodeContent') && l.includes('TargetFile'));
if(stepLine){
  const j = JSON.parse(stepLine.replace(/^\d+:\s*/, ''));
  const toolCall = j.tool_calls.find(t => t.name === 'write_to_file');
  if(toolCall) {
    fs.writeFileSync('temp_app_store.jsx', toolCall.args.CodeContent);
  }
}
