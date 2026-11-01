const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Memulai Enkripsi Tingkat Dewa (Anti-Bongkar)...');

// 1. BACA & ACAK DATA.JS
let dataJsCode = '';
if (fs.existsSync('data.js')) {
    const data = fs.readFileSync('data.js', 'utf8');
    const result = JavaScriptObfuscator.obfuscate(data, {
        compact: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        identifierNamesGenerator: 'hexadecimal'
    });
    dataJsCode = result.getObfuscatedCode();
}

// 2. PROSES INDEX.HTML
if (fs.existsSync('index.html')) {
    let html = fs.readFileSync('index.html', 'utf8');

    // Acak script JS di dalam HTML
    html = html.replace(/<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi, (match, code) => {
        if (!code.trim()) return match;
        try {
            const res = JavaScriptObfuscator.obfuscate(code, {
                compact: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                identifierNamesGenerator: 'hexadecimal'
            });
            return `<script>${res.getObfuscatedCode()}</script>`;
        } catch (err) {
            return match;
        }
    });

    // Suntik data.js ke dalam HTML (biar gak perlu file eksternal)
    if (dataJsCode) {
        html = html.replace('</body>', `<script>\n${dataJsCode}\n</script>\n</body>`);
    }

    // Ubah HTML jadi Base64 (bukan teks biasa)
    const base64Html = Buffer.from(html, 'utf8').toString('base64');
    
    // Simpan sebagai file .bin (File Binary, Gak Bisa Dibaca Manusia)
    fs.writeFileSync(path.join(targetDir, 'app.bin'), base64Html);
    console.log('✅ Kode asli disembunyikan ke dalam app.bin');
}

// 3. BUAT INDEX.HTML PALSU UNTUK MEMBUKA .BIN
const fakeIndex = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appnesia</title>
<style>body { margin:0; padding:0; background:#000; color:#fff; display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; }</style>
</head>
<body>
<div id="root"><h3>Memuat Aplikasi...</h3></div>
<script>
  // Ambil file .bin (file rahasia), lalu ubah jadi HTML
  fetch('./app.bin')
    .then(res => res.text())
    .then(b64 => {
        var binary = atob(b64);
        var bytes = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        var decodedHtml = new TextDecoder('utf-8').decode(bytes);
        
        // Tulis ke halaman tanpa nge-blank
        document.open();
        document.write(decodedHtml);
        document.close();
    })
    .catch(e => {
        document.getElementById('root').innerHTML = "<h2 style='color:red;'>Gagal: " + e.message + "</h2>";
    });
</script>
</body>
</html>`;

fs.writeFileSync(path.join(targetDir, 'index.html'), fakeIndex);
console.log('✅ Index asli LENYAP, diganti file peluncur .bin');
