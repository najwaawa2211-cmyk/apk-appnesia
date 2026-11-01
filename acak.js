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

// 2. ACAK INDEX.HTML (Base64 Aman untuk WebView Android)
try {
    if (fs.existsSync('index.html')) {
        let html = fs.readFileSync('index.html', 'utf8');

        // Acak script internal dulu
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

        // Ubah HTML ke Base64 menggunakan Buffer (Aman untuk karakter UTF-8 / Emoji / Spasi)
        const base64Html = Buffer.from(html, 'utf8').toString('base64');

        // Loader aman yang tidak bikin WebView bengong/blank
        const loaderHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appnesia</title>
</head>
<body style="margin:0;padding:0;background:#000;">
<script>
  try {
    // Decode Base64 standar yang aman untuk Android WebView
    const base64String = "${base64Html}";
    const decodedHtml = decodeURIComponent(atob(base64String).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    document.open();
    document.write(decodedHtml);
    document.close();
  } catch (e) {
    document.write("<h2 style='color:white;text-align:center;margin-top:20vh;'>Gagal memuat aplikasi: " + e.message + "</h2>");
  }
</script>
</body>
</html>`;

        fs.writeFileSync(path.join(targetDir, 'index.html'), loaderHtml);
        console.log('✅ index.html berhasil dienkripsi total dengan aman!');
    } else {
        console.error('❌ File index.html tidak ditemukan!');
        process.exit(1);
    }
} catch (e) {
    console.error('❌ Gagal index.html:', e.message);
    process.exit(1);
}
