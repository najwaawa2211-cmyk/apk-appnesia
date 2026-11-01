const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const TARGET_DIR = 'www'; 
if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR);

// 1. ACAK DATA.JS (Pakai pengaturan paling kuat)
try {
    const dataAsli = fs.readFileSync('data.js', 'utf8');
    const dataAcak = JavaScriptObfuscator.obfuscate(dataAsli, {
        compact: true, 
        controlFlowFlattening: true, 
        stringArray: true, 
        stringArrayEncoding: ['base64'], 
        identifierNamesGenerator: 'hexadecimal'
    }).getObfuscatedCode();
    
    fs.writeFileSync(path.join(TARGET_DIR, 'data.js'), dataAcak);
    console.log('✅ www/data.js berhasil diacak total.');
} catch(e) { console.log('Gagal acak data.js:', e.message); }

// 2. ACAK INDEX.HTML (Matikan fitur yang bikin crash)
try {
    let indexAsli = fs.readFileSync('index.html', 'utf8');
    console.log('Panjang index asli:', indexAsli.length);

    const regex = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;
    let isChanged = false;

    const indexAcak = indexAsli.replace(regex, (match, scriptContent) => {
        if (scriptContent.trim() === '') return match;
        
        try {
            const obfuscated = JavaScriptObfuscator.obfuscate(scriptContent, {
                compact: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                identifierNamesGenerator: 'hexadecimal',
                controlFlowFlattening: false, // WAJIB FALSE biar gak crash di DOM
                deadCodeInjection: false      // WAJIB FALSE biar gak crash di DOM
            }).getObfuscatedCode();
            
            isChanged = true;
            return `<script>\n${obfuscated}\n</script>`;
        } catch (err) {
            console.log('❌ Gagal mengacak script di HTML:', err.message);
            return match;
        }
    });

    fs.writeFileSync(path.join(TARGET_DIR, 'index.html'), indexAcak);
    console.log('Panjang index acak:', indexAcak.length);
    
    if(isChanged) {
        console.log('✅ www/index.html berhasil diacak!');
    } else {
        console.log('⚠️ PERINGATAN: Script di index.html tidak berubah.');
    }
} catch(e) { console.log('Gagal baca index.html:', e.message); }
