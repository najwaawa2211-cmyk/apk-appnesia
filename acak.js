const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';

// Buat folder www jika belum ada
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Memulai proses obfuscation...');

// 1. Proses pengacakan data.js
try {
    if (fs.existsSync('data.js')) {
        const data = fs.readFileSync('data.js', 'utf8');
        const result = JavaScriptObfuscator.obfuscate(data, {
            compact: true,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            identifierNamesGenerator: 'hexadecimal'
        });
        fs.writeFileSync(path.join(targetDir, 'data.js'), result.getObfuscatedCode());
        console.log('✅ data.js berhasil diacak ke folder www.');
    } else {
        console.log('⚠️ Warning: File data.js tidak ditemukan, dilewati.');
    }
} catch (e) {
    console.error('❌ Gagal mengacak data.js:', e.message);
    process.exit(1); 
}

// 2. Proses pengacakan index.html (dan script di dalamnya)
try {
    if (fs.existsSync('index.html')) {
        let html = fs.readFileSync('index.html', 'utf8');
        
        // Regex untuk mendeteksi script internal
        html = html.replace(/<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi, (match, code) => {
            if (!code.trim()) return match;
            try {
                const res = JavaScriptObfuscator.obfuscate(code, {
                    compact: true,
                    stringArray: true,
                    stringArrayEncoding: ['base64'],
                    identifierNamesGenerator: 'hexadecimal',
                    controlFlowFlattening: false,
                    deadCodeInjection: false
                });
                return `<script>${res.getObfuscatedCode()}</script>`;
            } catch (err) {
                return match;
            }
        });

        fs.writeFileSync(path.join(targetDir, 'index.html'), html);
        console.log('✅ index.html berhasil diacak ke folder www.');
    } else {
        console.error('❌ Error: File index.html wajib ada!');
        process.exit(1);
    }
} catch (e) {
    console.error('❌ Gagal memproses index.html:', e.message);
    process.exit(1);
}
