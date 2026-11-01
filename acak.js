const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Memulai proses PENGHAPUSAN file asli...');

// 1. BACA & ACAK DATA.JS
let dataJsObfuscated = '';
if (fs.existsSync('data.js')) {
    const data = fs.readFileSync('data.js', 'utf8');
    const result = JavaScriptObfuscator.obfuscate(data, {
        compact: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        identifierNamesGenerator: 'hexadecimal'
    });
    dataJsObfuscated = result.getObfuscatedCode();
    console.log('✅ data.js diacak (dan akan dihapus).');
}

// 2. BACA & ACAK INDEX.HTML
if (fs.existsSync('index.html')) {
    let html = fs.readFileSync('index.html', 'utf8');

    // Acak script internal
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

    // 🔥 SUNTIK DATA.JS KE DALAM HTML (biar gak perlu file data.js lagi)
    if (dataJsObfuscated) {
        html = html.replace('</body>', `<script>\n${dataJsObfuscated}\n</script>\n</body>`);
    }

    // Ubah seluruh HTML jadi Base64
    const base64Html = Buffer.from(html, 'utf8').toString('base64');
    
    // Simpan Base64 ini ke dalam file javascript murni (bukan html)
    const jsLoader = `document.addEventListener('DOMContentLoaded', function() {
    try {
        var b64 = "${base64Html}";
        var binary = atob(b64);
        var bytes = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        var decodedHtml = new TextDecoder('utf-8').decode(bytes);
        
        document.open();
        document.write(decodedHtml);
        document.close();
    } catch (e) {
        document.body.innerHTML = "<h2 style='color:red;text-align:center;margin-top:20vh;'>Gagal memuat: " + e.message + "</h2>";
    }
});`;

    // KITA SIMPAN SEBAGAI SCRIPT.JS, BUKAN HTML!
    fs.writeFileSync(path.join(targetDir, 'script.js'), jsLoader);
    console.log('✅ index.html diubah jadi script.js (File HTML asli DIHAPUS).');
}

// 3. BUAT INDEX.HTML PALSU (Cuma buat manggil script.js, gak ada kode asli lu)
const fakeIndex = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appnesia</title>
<style>body{margin:0;background:#000;}</style>
</head>
<body>
  <script src="script.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(targetDir, 'index.html'), fakeIndex);
console.log('✅ index.html asli LENYAP, diganti dengan file pemanggil kosong.');
console.log('🎉 Selesai! APK lu sekarang gak ada file HTML/Data aslinya.');
