const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

if (!fs.existsSync('www')) fs.mkdirSync('www');

try {
    let indexAsli = fs.readFileSync('index.html', 'utf8');
    console.log('Membaca index.html (Panjang:', indexAsli.length, 'karakter)');

    // Cari script yang gak ada src="..." nya
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
                controlFlowFlattening: false, // WAJIB FALSE biar DOM gak error
                deadCodeInjection: false      // WAJIB FALSE biar DOM gak error
            }).getObfuscatedCode();
            
            isChanged = true;
            return `<script>\n${obfuscated}\n</script>`;
        } catch (err) {
            console.log('❌ Gagal mengacak satu bagian script:', err.message);
            return match;
        }
    });

    fs.writeFileSync(path.join('www', 'index.html'), indexAcak);
    
    if(isChanged) {
        console.log('✅ SUKSES: www/index.html berhasil diacak!');
        console.log('Panjang index baru:', indexAcak.length, 'karakter');
    } else {
        console.log('⚠️ PERINGATAN: Gak ada script yang keacak di index.html.');
    }
} catch(e) {
    console.log('❌ GAGAL baca index.html:', e.message);
