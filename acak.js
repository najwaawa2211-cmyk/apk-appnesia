const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Memulai proses pengacakan aman...');

// 1. ACAK DATA.JS
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
        console.log('✅ data.js berhasil diacak.');
    }
} catch (e) {
    console.error('❌ Gagal data.js:', e.message);
    process.exit(1);
}

// 2. ACAK INDEX.HTML
try {
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

        // Simpan index.html asli yang udah diacak (biar data.js bisa dibaca)
        fs.writeFileSync(path.join(targetDir, 'index.html'), html);
        console.log('✅ index.html asli disimpan (tapi disembunyikan).');

        // Buat file loader
        const base64Html = Buffer.from(html, 'utf8').toString('base64');
        
        const loaderHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appnesia</title>
<style>
  body, html { margin:0; padding:0; height:100%; background:#000; overflow:hidden; }
  #frame { width:100%; height:100%; border:none; }
</style>
</head>
<body>
<script>
  try {
    var b64 = "${base64Html}";
    var binary = atob(b64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    var decodedHtml = new TextDecoder('utf-8').decode(bytes);

    // Kita timpa isi index.html pakai hasil decode
    // Lalu buka pakai iframe lokal supaya data.js kebaca
    var iframe = document.createElement('iframe');
    iframe.id = 'frame';
    
    // iframe ini ngarah ke file index.html yang ada di folder yang sama
    iframe.src = './index.html';
    document.body.appendChild(iframe);

  } catch (e) {
    document.body.innerHTML = "<h2 style='color:red;text-align:center;margin-top:20vh;'>Gagal memuat: " + e.message + "</h2>";
  }
</script>
</body>
</html>`;

        // Simpan loader ke file terpisah, misal app.html
        // Kita nanti ubah entry point capacitor ke app.html
        fs.writeFileSync(path.join(targetDir, 'app.html'), loaderHtml);
        console.log('✅ app.html (loader) berhasil dibuat!');
    } else {
        console.error('❌ File index.html tidak ditemukan!');
        process.exit(1);
    }
} catch (e) {
    console.error('❌ Gagal index.html:', e.message);
    process.exit(1);
}
