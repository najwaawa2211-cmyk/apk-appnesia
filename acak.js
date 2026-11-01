// acak.js - Script otomatis ngacak Appnesia
const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

try {
    console.log('🛡️ Mulai mengacak data.js dan index.html...');

    // 1. Baca data.js asli, lalu acak jadi data.min.js
    if (fs.existsSync('data.js')) {
        const dataAsli = fs.readFileSync('data.js', 'utf8');
        const dataAcak = JavaScriptObfuscator.obfuscate(dataAsli, {
            compact: true,
            controlFlowFlattening: true,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            identifierNamesGenerator: 'hexadecimal'
        }).getObfuscatedCode();
        
        fs.writeFileSync('data.min.js', dataAcak);
        console.log('✅ data.min.js berhasil dibuat (sejajar)');
    }

    // 2. Baca index.html asli, ubah data.js jadi data.min.js, lalu acak
    if (fs.existsSync('index.html')) {
        let indexAsli = fs.readFileSync('index.html', 'utf8');
        
        // Ganti referensi data.js ke data.min.js biar pas di-build pakai yang acak
        indexAsli = indexAsli.replace(/src="data.js"/g, 'src="data.min.js"');
        
        // Ekstrak dan acak script di dalam index.html
        const acakHtml = indexAsli.replace(/<script>([\s\S]*?)<\/script>/g, (match, scriptContent) => {
            if (scriptContent.trim() === '' || scriptContent.includes('src=')) return match;
            const acak = JavaScriptObfuscator.obfuscate(scriptContent, {
                compact: true,
                stringArray: true,
                stringArrayEncoding: ['base64']
            }).getObfuscatedCode();
            return `<script>${acak}</script>`;
        });

        fs.writeFileSync('index.min.html', acakHtml);
        console.log('✅ index.min.html berhasil dibuat (sejajar)');
    }

    console.log('🚀 Selesai! File acak sudah siap di-build.');

} catch (error) {
    console.error('❌ Gagal ngacak:', error);
          }
