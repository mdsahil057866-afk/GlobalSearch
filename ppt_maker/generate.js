const pptxgen = require('pptxgenjs');
const QRCode = require('qrcode');

async function createPPT() {
let pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'GlobalSearch';
pptx.company = 'GlobalSearch';

// Title Slide
let slide1 = pptx.addSlide();
slide1.background = { color: "0B2447" };
slide1.addText("GlobalSearch Ecosystem", { x: 1, y: 2, w: '80%', fontSize: 44, bold: true, color: "FFFFFF", align: "center" });
slide1.addText("A Step Towards 'Atmanirbhar Digital Administration'", { x: 1, y: 3.2, w: '80%', fontSize: 24, color: "FF9933", align: "center" });
slide1.addText("Empowering the District with Secure, Sovereign & Inclusive Technology.", { x: 1, y: 4, w: '80%', fontSize: 18, color: "138808", align: "center" });

function addSlide(title, bulletPoints) {
    let slide = pptx.addSlide();
    slide.addText(title, { x: 0.5, y: 0.5, w: '90%', fontSize: 32, bold: true, color: "0B2447" });
    
    let yPos = 1.5;
    for (let point of bulletPoints) {
        slide.addText(point.title, { x: 0.5, y: yPos, w: '90%', fontSize: 24, bold: true, color: "333333", bullet: true });
        yPos += 0.5;
        if (point.desc) {
            slide.addText(point.desc, { x: 1.0, y: yPos, w: '85%', fontSize: 18, color: "666666" });
            yPos += 0.8;
        } else {
            yPos += 0.3;
        }
    }
}

// Slide 2
addSlide("The Vision (Project Objective)", [
    { title: "What is GlobalSearch?", desc: "A 100% secure, Indian alternative to foreign search engines, designed as a 'Super App'." },
    { title: "Core Administrative Benefit", desc: "Providing citizens with education, health, safety, and employment services on a single platform." },
    { title: "Data Sovereignty", desc: "'Zero-Logs Policy' - Citizen data remains secure and localized within the country." }
]);

// Slide 3
addSlide("Citizen Safety First (Zygo - Next-Gen Mobility)", [
    { title: "Women's Safety (Women-Only Safe Mode)", desc: "Exclusive option for female passengers to request female drivers, strengthening law and order." },
    { title: "Transparent Commuting", desc: "Real-time fare negotiation to protect citizens from overcharging." },
    { title: "AR Radar", desc: "Augmented Reality technology to safely locate cabs in crowded bus stands or stations." }
]);

// Slide 4
addSlide("Smart City & Traffic Management (NaviMap)", [
    { title: "Live Safety Scoring", desc: "Real-time 'Safety Score' for every route, helping the administration identify unsafe areas." },
    { title: "Disaster & Emergency Management", desc: "Accurate mapping of hospitals, police stations, and EV charging stations." },
    { title: "Urban Planning", desc: "3D Holographic view for precise analysis of city traffic and routes." }
]);

// Slide 5
addSlide("Rural Digital Inclusion (VillageNet)", [
    { title: "Connectivity to Every Village", desc: "Using 'Mesh Networking' to provide internet to remote villages without massive telecom towers." },
    { title: "Panchayat Integration", desc: "Connecting Gram Panchayats to the digital mainstream to deliver government schemes directly to the public." }
]);

// Slide 6
addSlide("AI for the Common Man (BharatAI)", [
    { title: "Multilingual Support", desc: "Available in 30+ regional languages so language is no longer a barrier." },
    { title: "Farmer Mode", desc: "AI provides satellite weather data, crop rotation advice, and soil moisture info in the farmer's local language." },
    { title: "Student Mode", desc: "Providing education to remote students in their mother tongue." }
]);

// Slide 7
addSlide("Boosting Local Economy (ShopNova & SwiftPay)", [
    { title: "Empowering Local Businesses", desc: "A platform for local shopkeepers and farmers to sell their products online." },
    { title: "Digital Payments (SwiftPay)", desc: "Secure digital transactions that promote a Cashless Economy." },
    { title: "CraveDrop", desc: "A zero-commission delivery model for local restaurants and vendors." }
]);

// Slide 8
addSlide("Proposal for Pilot Implementation", [
    { title: "Our Request to the DM", desc: "Permission to launch a Pilot Project of this ecosystem in a selected Block or Municipal Corporation area." },
    { title: "Administrative Collaboration", desc: "We want to integrate this system with local traffic police, women safety cells, and Gram Panchayats." },
    { title: "Goal", desc: "To make the district a role model for 'Smart & Sovereign Tech' for the entire country." }
]);

// Slide 9 (Live Demo with QR)
let slide9 = pptx.addSlide();
slide9.addText("Live Project Demo & Access", { x: 0.5, y: 0.5, w: '90%', fontSize: 32, bold: true, color: "0B2447" });
slide9.addText("The live version of the project is fully ready for the administration to test.", { x: 0.5, y: 1.5, w: '90%', fontSize: 24, bold: true, color: "333333", bullet: true });
slide9.addText("Portal URL: http://192.168.43.14:5173", { x: 0.5, y: 2.5, w: '60%', fontSize: 24, bold: true, color: "333333", bullet: true });
slide9.addText("Demo Credentials", { x: 0.5, y: 3.5, w: '60%', fontSize: 24, bold: true, color: "333333", bullet: true });
slide9.addText("ID: dm_demo@globalsearch, Pass: secure123", { x: 1.0, y: 4.0, w: '60%', fontSize: 18, color: "666666" });

// Generate QR Code
const qrUrl = "http://192.168.43.14:5173";
const qrData = await QRCode.toDataURL(qrUrl, { margin: 1, width: 250 });
slide9.addImage({ data: qrData, x: 6.5, y: 2.0, w: 2.5, h: 2.5 });
slide9.addText("Scan to Open in Phone", { x: 6.5, y: 4.6, w: 2.5, fontSize: 14, bold: true, color: "007BFF", align: "center" });

let fileName = await pptx.writeFile({ fileName: "C:\\Users\\LC\\Desktop\\globalsearch\\DM_Presentation.pptx" });
console.log("created file: " + fileName);
}

createPPT().catch(console.error);
