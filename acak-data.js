const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

if (!fs.existsSync('www')) fs.mkdirSync('www');

try {
    const dataAsli = fs.readFileSync('data.js', 'utf8');
    const dataAcak = JavaScriptObfuscator.obfuscate(dataAsli, {
        compact: true,
        controlFlowFlattening: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        identifierNamesGenerator: 'hexadecimal'
    }).getObfuscatedCode();
    
    fs.writeFileSync(path.join('www', 'data.js'), dataAcak);
    console.log('✅ SUKSES: www/data.js berhasil diacak!');
} catch(e) {
    console.log('❌ GAGAL acak data.js:', e.message);
                                     }
