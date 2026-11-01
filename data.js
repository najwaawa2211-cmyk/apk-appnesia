/* ============================================================
   Appnesia — Data Aplikasi (245) & Logika Misi Harian
   ============================================================ */

const APPS = [
  /* ==================== GAME (50) ==================== */
  {id:'mlbb', name:'Mobile Legends: Bang Bang', dev:'Moonton', cat:'Game', icon:'⚔️', color:'#1B4A9C', pkg:'com.mobile.legends', featured:true, tagline:'Moba 5v5 di ponselmu', video:'https://www.youtube.com/watch?v=biX4HZpeKOk', desc:'Game MOBA 5 lawan 5 untuk perangkat mobile dengan berbagai pilihan hero.'},
  {id:'freefire', name:'Free Fire', dev:'Garena', cat:'Game', icon:'🔥', color:'#FF6B00', pkg:'com.dts.freefireth', desc:'Game battle royale ringan untuk perangkat mobile.'},
  {id:'ffmax', name:'Free Fire MAX', dev:'Garena', cat:'Game', icon:'🔥', color:'#FF4500', pkg:'com.dts.freefiremax', desc:'Versi grafis lebih tinggi dari Free Fire.'},
  {id:'pubgm', name:'PUBG Mobile', dev:'Level Infinite', cat:'Game', icon:'🎯', color:'#F2A900', pkg:'com.tencent.ig', desc:'Battle royale hingga 100 pemain dengan berbagai mode.'},
  {id:'pubgns', name:'PUBG New State', dev:'Krafton', cat:'Game', icon:'🎯', color:'#F2A900', pkg:'com.pubg.newstate', desc:'Sekuel PUBG dengan grafis lebih modern.'},
  {id:'genshin', name:'Genshin Impact', dev:'HoYoverse', cat:'Game', icon:'🌸', color:'#5B8FB9', pkg:'com.miHoYo.GenshinImpact', desc:'RPG open world dengan elemen dan karakter beragam.'},
  {id:'hsr', name:'Honkai: Star Rail', dev:'HoYoverse', cat:'Game', icon:'🚂', color:'#6C5CE7', pkg:'com.HoYoverse.hkrpgoversea', desc:'RPG giliran dengan cerita luar angkasa.'},
  {id:'hi3', name:'Honkai Impact 3rd', dev:'HoYoverse', cat:'Game', icon:'⚡', color:'#6C5CE7', pkg:'com.miHoYo.bh3oversea', desc:'Action RPG dengan pertarungan cepat.'},
  {id:'codm', name:'Call of Duty: Mobile', dev:'Activision', cat:'Game', icon:'🎖️', color:'#1f2937', pkg:'com.activision.callofduty.shooter', desc:'FPS populer dengan mode multiplayer dan battle royale.'},
  {id:'coc', name:'Clash of Clans', dev:'Supercell', cat:'Game', icon:'🏰', color:'#8B5A2B', pkg:'com.supercell.clashofclans', desc:'Bangun desa, latih pasukan, serang klan lain.'},
  {id:'cr', name:'Clash Royale', dev:'Supercell', cat:'Game', icon:'👑', color:'#1E88E5', pkg:'com.supercell.clashroyale', desc:'Pertarungan kartu real-time berbasis strategi.'},
  {id:'bs', name:'Brawl Stars', dev:'Supercell', cat:'Game', icon:'💥', color:'#FDD835', pkg:'com.supercell.brawlstars', desc:'Arena pertarungan 3v3 singkat dan seru.'},
  {id:'hayday', name:'Hay Day', dev:'Supercell', cat:'Game', icon:'🌾', color:'#7CB342', pkg:'com.supercell.hayday', desc:'Kelola peternakan dan bertani bersama teman.'},
  {id:'squadb', name:'Squad Busters', dev:'Supercell', cat:'Game', icon:'🦸', color:'#00ACC1', pkg:'com.supercell.squad', desc:'Arena 10 pemain dengan pasukan pilihan.'},
  {id:'roblox', name:'Roblox', dev:'Roblox Corporation', cat:'Game', icon:'🎮', color:'#000000', pkg:'com.roblox.client', desc:'Platform game buatan pengguna dari seluruh dunia.'},
  {id:'minecraft', name:'Minecraft', dev:'Mojang', cat:'Game', icon:'⛏️', color:'#8B6F47', pkg:'com.mojang.minecraftpe', desc:'Bangun dunia dari balok tak terbatas.'},
  {id:'amongus', name:'Among Us', dev:'Innersloth', cat:'Game', icon:'🚀', color:'#E53935', pkg:'com.innersloth.spacemafia', desc:'Game sosial cari impostor di luar angkasa.'},
  {id:'stumble', name:'Stumble Guys', dev:'Kitka Games', cat:'Game', icon:'🏃', color:'#FF6F00', pkg:'com.kitkagames.fallbuddies', desc:'Battle royale ringan dengan rintangan lucu.'},
  {id:'subway', name:'Subway Surfers', dev:'SYBO', cat:'Game', icon:'🏃', color:'#00B8D4', pkg:'com.kiloo.subwaysurf', desc:'Lari menghindari rintangan di rel kereta.'},
  {id:'templerun2', name:'Temple Run 2', dev:'Imangi Studios', cat:'Game', icon:'🏃', color:'#FF8F00', pkg:'com.imangi.templerun2', desc:'Lari dari kejaran di kuil kuno.'},
  {id:'candy', name:'Candy Crush Saga', dev:'King', cat:'Game', icon:'🍬', color:'#EC407A', pkg:'com.king.candycrushsaga', desc:'Puzzle mencocokkan permen warna-warni.'},
  {id:'angry2', name:'Angry Birds 2', dev:'Rovio', cat:'Game', icon:'🐦', color:'#D32F2F', pkg:'com.rovio.baba', desc:'Luncurkan burung untuk menghancurkan benteng babi.'},
  {id:'pvz2', name:'Plants vs Zombies 2', dev:'EA', cat:'Game', icon:'🌻', color:'#7CB342', pkg:'com.ea.game.pvz2_row', desc:'Lawan zombie dengan pasukan tanaman.'},
  {id:'asphalt9', name:'Asphalt 9: Legends', dev:'Gameloft', cat:'Game', icon:'🏎️', color:'#D32F2F', pkg:'com.gameloft.android.ANMP.GloftA9HM', desc:'Balapan arcade dengan mobil mewah.'},
  {id:'rr3', name:'Real Racing 3', dev:'EA', cat:'Game', icon:'🏁', color:'#F44336', pkg:'com.ea.games.r3_row', desc:'Simulasi balapan realistis di sirkuit dunia.'},
  {id:'nfsnl', name:'Need for Speed: No Limits', dev:'EA', cat:'Game', icon:'🚗', color:'#0D47A1', pkg:'com.ea.game.nfs14_row', desc:'Balapan jalanan dengan mobil kustom.'},
  {id:'efootball', name:'eFootball', dev:'KONAMI', cat:'Game', icon:'⚽', color:'#1976D2', pkg:'jp.konami.pesam', desc:'Sepak bola virtual dari KONAMI.'},
  {id:'fifam', name:'FIFA Mobile', dev:'EA', cat:'Game', icon:'⚽', color:'#004D40', pkg:'com.ea.gp.fifamobile', desc:'Sepak bola mobile dengan lisensi resmi.'},
  {id:'dls', name:'Dream League Soccer', dev:'First Touch', cat:'Game', icon:'⚽', color:'#1E88E5', pkg:'com.firsttouchgames.dls7', desc:'Kelola tim sepak bola impianmu.'},
  {id:'aov', name:'Arena of Valor', dev:'Garena', cat:'Game', icon:'⚔️', color:'#0D47A1', pkg:'com.garena.game.kgid', desc:'MOBA 5v5 dari Garena.'},
  {id:'wildrift', name:'Wild Rift', dev:'Riot Games', cat:'Game', icon:'⚔️', color:'#1A237E', pkg:'com.riotgames.league.wildrift', desc:'League of Legends versi mobile.'},
  {id:'pkmnunite', name:'Pokémon UNITE', dev:'The Pokémon Company', cat:'Game', icon:'⚡', color:'#FFA000', pkg:'jp.pokemon.pokemonunite', desc:'MOBA dengan karakter Pokémon.'},
  {id:'pkgo', name:'Pokémon GO', dev:'Niantic', cat:'Game', icon:'🔴', color:'#D32F2F', pkg:'com.nianticlabs.pokemongo', desc:'Tangkap Pokémon di dunia nyata lewat AR.'},
  {id:'dbl', name:'Dragon Ball Legends', dev:'Bandai Namco', cat:'Game', icon:'🐉', color:'#FF6F00', pkg:'com.bandainamcoent.dblegends_ww', desc:'Pertarungan Dragon Ball dengan kontrol geser.'},
  {id:'arknights', name:'Arknights', dev:'Hypergryph', cat:'Game', icon:'🛡️', color:'#37474F', pkg:'com.YoStarEN.Arknights', desc:'Tower defense taktis dengan cerita mendalam.'},
  {id:'azurlane', name:'Azur Lane', dev:'Yostar', cat:'Game', icon:'🚢', color:'#0288D1', pkg:'com.YoStarEN.AzurLane', desc:'Game kapal perang bergaya anime.'},
  {id:'fgo', name:'Fate/Grand Order', dev:'Aniplex', cat:'Game', icon:'🗡️', color:'#212121', pkg:'com.aniplex.fategrandorder.en', desc:'RPG giliran dengan cerita Fate.'},
  {id:'bleachbs', name:'Bleach: Brave Souls', dev:'KLab', cat:'Game', icon:'⚔️', color:'#1A237E', pkg:'com.klab.bleach', desc:'Action RPG dari seri Bleach.'},
  {id:'idv', name:'Identity V', dev:'NetEase', cat:'Game', icon:'🕵️', color:'#212121', pkg:'com.netease.idv', desc:'Game horor asimetris 1v4.'},
  {id:'lifeafter', name:'LifeAfter', dev:'NetEase', cat:'Game', icon:'🧟', color:'#455A64', pkg:'com.netease.mrzh', desc:'Bertahan hidup di dunia pasca-zombie.'},
  {id:'mladv', name:'Mobile Legends: Adventure', dev:'Moonton', cat:'Game', icon:'🗡️', color:'#1565C0', pkg:'com.moonton.mobileheroes', desc:'RPG idle dari semesta Mobile Legends.'},
  {id:'magicchess', name:'Magic Chess: Bang Bang', dev:'Moonton', cat:'Game', icon:'♟️', color:'#1565C0', pkg:'com.moonton.magicchess', desc:'Auto chess dari karakter Mobile Legends.'},
  {id:'raid', name:'Raid: Shadow Legends', dev:'Plarium', cat:'Game', icon:'🐲', color:'#455A64', pkg:'com.plarium.raidlegends', desc:'RPG giliran dengan ratusan champion.'},
  {id:'afk', name:'AFK Arena', dev:'Lilith Games', cat:'Game', icon:'🛡️', color:'#6A1B9A', pkg:'com.lilithgame.hgame.gp', desc:'RPG idle dengan hero unik.'},
  {id:'rok', name:'Rise of Kingdoms', dev:'Lilith Games', cat:'Game', icon:'🏰', color:'#795548', pkg:'com.lilithgame.roc.gp', desc:'Strategi kerajaan dengan banyak peradaban.'},
  {id:'gardenscapes', name:'Gardenscapes', dev:'Playrix', cat:'Game', icon:'🌳', color:'#43A047', pkg:'com.playrix.gardenscapes', desc:'Puzzle tiga sejenis sambil merenovasi taman.'},
  {id:'homescapes', name:'Homescapes', dev:'Playrix', cat:'Game', icon:'🏠', color:'#FB8C00', pkg:'com.playrix.homescapes', desc:'Puzzle merenovasi rumah keluarga.'},
  {id:'township', name:'Township', dev:'Playrix', cat:'Game', icon:'🏘️', color:'#43A047', pkg:'com.playrix.township', desc:'Bangun dan kelola kota sendiri.'},
  {id:'coinmaster', name:'Coin Master', dev:'Moon Active', cat:'Game', icon:'🪙', color:'#FDD835', pkg:'com.moonactive.coinmaster', desc:'Putar slot, serang desa teman.'},

  /* ==================== SOSIAL (20) ==================== */
  {id:'whatsapp', name:'WhatsApp Messenger', dev:'WhatsApp LLC', cat:'Sosial', icon:'💬', color:'#25D366', pkg:'com.whatsapp', featured:true, tagline:'Pesan dan panggilan lewat internet', video:'https://www.youtube.com/watch?v=6vhVVngXNE0', desc:'Pesan instan, panggilan suara, dan video gratis.'},
  {id:'wabusiness', name:'WhatsApp Business', dev:'WhatsApp LLC', cat:'Sosial', icon:'🏷️', color:'#128C7E', pkg:'com.whatsapp.w4b', desc:'WhatsApp khusus pelaku usaha dengan katalog.'},
  {id:'instagram', name:'Instagram', dev:'Instagram', cat:'Sosial', icon:'📸', color:'#E1306C', pkg:'com.instagram.android', featured:true, tagline:'Bagikan momen lewat foto dan video', video:'https://www.youtube.com/watch?v=oAwb8QZwfPA', desc:'Bagikan foto, video, dan cerita harian.'},
  {id:'tiktok', name:'TikTok', dev:'TikTok Pte. Ltd.', cat:'Sosial', icon:'🎵', color:'#ff0050', pkg:'com.zhiliaoapp.musically', featured:true, tagline:'Video pendek yang bikin nagih', video:'https://www.youtube.com/watch?v=HqGsT6VM8Vg', desc:'Platform video pendek kreatif dengan musik.'},
  {id:'telegram', name:'Telegram', dev:'Telegram FZ-LLC', cat:'Sosial', icon:'✈️', color:'#229ED9', pkg:'org.telegram.messenger', desc:'Perpesanan berbasis awan dengan grup besar.'},
  {id:'facebook', name:'Facebook', dev:'Meta', cat:'Sosial', icon:'👥', color:'#1877F2', pkg:'com.facebook.katana', desc:'Jejaring sosial untuk berbagi pembaruan.'},
  {id:'messenger', name:'Messenger', dev:'Meta', cat:'Sosial', icon:'💬', color:'#0084FF', pkg:'com.facebook.orca', desc:'Pesan langsung dari Facebook.'},
  {id:'flite', name:'Facebook Lite', dev:'Meta', cat:'Sosial', icon:'👥', color:'#1877F2', pkg:'com.facebook.lite', desc:'Versi ringan Facebook untuk koneksi lambat.'},
  {id:'x', name:'X', dev:'X Corp.', cat:'Sosial', icon:'✖️', color:'#0f172a', pkg:'com.twitter.android', desc:'Platform berita dan percakapan singkat.'},
  {id:'threads', name:'Threads', dev:'Instagram', cat:'Sosial', icon:'🧵', color:'#1f2937', pkg:'com.instagram.barcelona', desc:'Aplikasi percakapan berbasis teks dari Instagram.'},
  {id:'discord', name:'Discord', dev:'Discord Inc.', cat:'Sosial', icon:'🎮', color:'#5865F2', pkg:'com.discord', desc:'Komunitas lewat kanal teks, suara, dan video.'},
  {id:'linkedin', name:'LinkedIn', dev:'LinkedIn Corp.', cat:'Sosial', icon:'💼', color:'#0A66C2', pkg:'com.linkedin.android', desc:'Jejaring profesional dan karier.'},
  {id:'reddit', name:'Reddit', dev:'Reddit Inc.', cat:'Sosial', icon:'🤖', color:'#FF4500', pkg:'com.reddit.frontpage', desc:'Forum diskusi berbasis topik dan komunitas.'},
  {id:'pinterest', name:'Pinterest', dev:'Pinterest', cat:'Sosial', icon:'📌', color:'#E60023', pkg:'com.pinterest', desc:'Temukan dan simpan ide inspirasi visual.'},
  {id:'snapchat', name:'Snapchat', dev:'Snap Inc.', cat:'Sosial', icon:'👻', color:'#FFFC00', pkg:'com.snapchat.android', desc:'Kirim foto dan pesan yang hilang otomatis.'},
  {id:'line', name:'LINE', dev:'LINE Corp.', cat:'Sosial', icon:'💚', color:'#00C300', pkg:'jp.naver.line.android', desc:'Perpesanan dengan stiker dan panggilan.'},
  {id:'viber', name:'Viber', dev:'Rakuten', cat:'Sosial', icon:'📞', color:'#7360F2', pkg:'com.viber.voip', desc:'Panggilan dan pesan gratis lintas negara.'},
  {id:'signal', name:'Signal', dev:'Signal Foundation', cat:'Sosial', icon:'🔒', color:'#3A76F0', pkg:'org.thoughtcrime.securesms', desc:'Perpesanan terenkripsi end-to-end.'},
  {id:'wechat', name:'WeChat', dev:'Tencent', cat:'Sosial', icon:'💬', color:'#07C160', pkg:'com.tencent.mm', desc:'Perpesanan serbaguna populer di Asia.'},
  {id:'kakao', name:'KakaoTalk', dev:'Kakao', cat:'Sosial', icon:'💛', color:'#FFCD00', pkg:'com.kakao.talk', desc:'Aplikasi pesan populer dari Korea.'},

  /* ==================== HIBURAN (20) ==================== */
  {id:'youtube', name:'YouTube', dev:'Google LLC', cat:'Hiburan', icon:'▶️', color:'#FF0000', pkg:'com.google.android.youtube', featured:true, tagline:'Tonton video dari seluruh dunia', video:'https://www.youtube.com/watch?v=-sEJUdytWFg', desc:'Tonton dan unggah video dari seluruh dunia.'},
  {id:'ytmusic', name:'YouTube Music', dev:'Google LLC', cat:'Hiburan', icon:'🎵', color:'#FF0000', pkg:'com.google.android.apps.youtube.music', desc:'Streaming musik resmi dari YouTube.'},
  {id:'spotify', name:'Spotify', dev:'Spotify AB', cat:'Hiburan', icon:'🎧', color:'#1DB954', pkg:'com.spotify.music', featured:true, tagline:'Musik dan podcast tanpa batas', video:'https://www.youtube.com/watch?v=E-wbGBc4BuY', desc:'Streaming musik dan podcast jutaan lagu.'},
  {id:'netflix', name:'Netflix', dev:'Netflix, Inc.', cat:'Hiburan', icon:'🎬', color:'#E50914', pkg:'com.netflix.mediaclient', desc:'Streaming film dan serial orisinal Netflix.'},
  {id:'disney', name:'Disney+ Hotstar', dev:'Disney', cat:'Hiburan', icon:'🏰', color:'#113CCF', pkg:'com.disney.disneyplus', desc:'Film Disney, Marvel, dan olahraga Asia.'},
  {id:'vidio', name:'Vidio', dev:'Vidio', cat:'Hiburan', icon:'📺', color:'#E62117', pkg:'com.vidio.android', desc:'Streaming film dan serial Indonesia.'},
  {id:'wetv', name:'WeTV', dev:'Tencent', cat:'Hiburan', icon:'🎥', color:'#00A4FF', pkg:'com.tencent.qqlivei18n', desc:'Drama dan film Asia dengan subtitle Indonesia.'},
  {id:'iqiyi', name:'iQIYI', dev:'iQIYI', cat:'Hiburan', icon:'🍿', color:'#00BE06', pkg:'com.iqiyi.i18n', desc:'Streaming drama dan film Asia.'},
  {id:'viu', name:'Viu', dev:'Viu', cat:'Hiburan', icon:'📺', color:'#FBBF24', pkg:'com.viu.phone', desc:'Drama Asia dan film dengan subtitle.'},
  {id:'prime', name:'Prime Video', dev:'Amazon', cat:'Hiburan', icon:'🎬', color:'#00A8E1', pkg:'com.amazon.avod.thirdpartyclient', desc:'Film dan serial orisinal Amazon Prime.'},
  {id:'joox', name:'JOOX', dev:'Tencent', cat:'Hiburan', icon:'🎶', color:'#00C853', pkg:'com.tencent.ibg.joox', desc:'Streaming musik dengan fitur karaoke.'},
  {id:'applemusic', name:'Apple Music', dev:'Apple', cat:'Hiburan', icon:'🎵', color:'#FA243C', pkg:'com.apple.android.music', desc:'Streaming musik dari Apple.'},
  {id:'soundcloud', name:'SoundCloud', dev:'SoundCloud', cat:'Hiburan', icon:'☁️', color:'#FF5500', pkg:'com.soundcloud.android', desc:'Platform musik dari kreator independen.'},
  {id:'deezer', name:'Deezer', dev:'Deezer', cat:'Hiburan', icon:'🎶', color:'#A238FF', pkg:'deezer.android.app', desc:'Streaming musik dengan playlist personal.'},
  {id:'twitch', name:'Twitch', dev:'Twitch', cat:'Hiburan', icon:'🎮', color:'#9146FF', pkg:'tv.twitch.android.app', desc:'Streaming langsung game dan konten kreator.'},
  {id:'bilibili', name:'Bilibili', dev:'Bilibili', cat:'Hiburan', icon:'📺', color:'#00A1D6', pkg:'tv.danmaku.bili', desc:'Platform video anime dan gaming Asia.'},
  {id:'webtoon', name:'WEBTOON', dev:'Naver', cat:'Hiburan', icon:'📚', color:'#00DC64', pkg:'com.naver.linewebtoon', desc:'Komik digital vertikal dari kreator dunia.'},
  {id:'crunchyroll', name:'Crunchyroll', dev:'Crunchyroll', cat:'Hiburan', icon:'🍥', color:'#F47521', pkg:'com.crunchyroll.crunchyroid', desc:'Streaming anime resmi dengan subtitle.'},
  {id:'audible', name:'Audible', dev:'Amazon', cat:'Hiburan', icon:'🎧', color:'#F8991C', pkg:'com.audible.application', desc:'Audiobook dan podcast dari Amazon.'},
  {id:'viki', name:'Viki', dev:'Rakuten', cat:'Hiburan', icon:'🎭', color:'#00B4E3', pkg:'com.viki.android', desc:'Drama Asia dengan subtitle komunitas.'},

  /* ==================== PRODUKTIVITAS (20) ==================== */
  {id:'gdrive', name:'Google Drive', dev:'Google LLC', cat:'Produktivitas', icon:'☁️', color:'#0F9D58', pkg:'com.google.android.apps.docs', desc:'Penyimpanan awan Google untuk berkas.'},
  {id:'gkeep', name:'Google Keep', dev:'Google LLC', cat:'Produktivitas', icon:'📝', color:'#FFBB00', pkg:'com.google.android.keep', desc:'Catatan digital dengan label berwarna.'},
  {id:'gcal', name:'Google Kalender', dev:'Google LLC', cat:'Produktivitas', icon:'🗓️', color:'#4285F4', pkg:'com.google.android.calendar', desc:'Kalender digital dengan pengingat.'},
  {id:'gdocs', name:'Google Docs', dev:'Google LLC', cat:'Produktivitas', icon:'📄', color:'#4285F4', pkg:'com.google.android.apps.docs.editors.docs', desc:'Editor dokumen online Google.'},
  {id:'gsheets', name:'Google Sheets', dev:'Google LLC', cat:'Produktivitas', icon:'📊', color:'#0F9D58', pkg:'com.google.android.apps.docs.editors.sheets', desc:'Spreadsheet online Google.'},
  {id:'gslides', name:'Google Slides', dev:'Google LLC', cat:'Produktivitas', icon:'📽️', color:'#F4B400', pkg:'com.google.android.apps.docs.editors.slides', desc:'Presentasi online Google.'},
  {id:'gtasks', name:'Google Tasks', dev:'Google LLC', cat:'Produktivitas', icon:'✅', color:'#4285F4', pkg:'com.google.android.apps.tasks', desc:'Daftar tugas terintegrasi dengan Google.'},
  {id:'notion', name:'Notion', dev:'Notion Labs', cat:'Produktivitas', icon:'🗂️', color:'#1f2937', pkg:'notion.id', desc:'Ruang kerja serbaguna catatan dan proyek.'},
  {id:'trello', name:'Trello', dev:'Atlassian', cat:'Produktivitas', icon:'📋', color:'#0079BF', pkg:'com.trello', desc:'Papan kanban untuk mengatur tugas tim.'},
  {id:'slack', name:'Slack', dev:'Slack Technologies', cat:'Produktivitas', icon:'🧩', color:'#611F69', pkg:'com.Slack', desc:'Komunikasi tim dengan kanal dan integrasi.'},
  {id:'teams', name:'Microsoft Teams', dev:'Microsoft', cat:'Produktivitas', icon:'👨‍💻', color:'#6264A7', pkg:'com.microsoft.teams', desc:'Kolaborasi tim dengan chat dan rapat.'},
  {id:'zoom', name:'Zoom Workplace', dev:'Zoom', cat:'Produktivitas', icon:'📹', color:'#2D8CFF', pkg:'us.zoom.videomeetings', desc:'Rapat daring dengan video konferensi.'},
  {id:'gmeet', name:'Google Meet', dev:'Google LLC', cat:'Produktivitas', icon:'📞', color:'#00897B', pkg:'com.google.android.apps.meetings', desc:'Panggilan video dari Google.'},
  {id:'gtranslate', name:'Google Translate', dev:'Google LLC', cat:'Produktivitas', icon:'🌐', color:'#4285F4', pkg:'com.google.android.apps.translate', desc:'Terjemahkan teks, foto, dan percakapan.'},
  {id:'word', name:'Microsoft Word', dev:'Microsoft', cat:'Produktivitas', icon:'📄', color:'#2B579A', pkg:'com.microsoft.office.word', desc:'Editor dokumen dari Microsoft.'},
  {id:'excel', name:'Microsoft Excel', dev:'Microsoft', cat:'Produktivitas', icon:'📊', color:'#217346', pkg:'com.microsoft.office.excel', desc:'Spreadsheet dari Microsoft.'},
  {id:'ppt', name:'Microsoft PowerPoint', dev:'Microsoft', cat:'Produktivitas', icon:'📽️', color:'#D24726', pkg:'com.microsoft.office.powerpoint', desc:'Presentasi dari Microsoft.'},
  {id:'outlook', name:'Microsoft Outlook', dev:'Microsoft', cat:'Produktivitas', icon:'📧', color:'#0078D4', pkg:'com.microsoft.office.outlook', desc:'Email dan kalender dari Microsoft.'},
  {id:'gmail', name:'Gmail', dev:'Google LLC', cat:'Produktivitas', icon:'📧', color:'#EA4335', pkg:'com.google.android.gm', desc:'Email dari Google dengan penyimpanan besar.'},
  {id:'dropbox', name:'Dropbox', dev:'Dropbox', cat:'Produktivitas', icon:'📦', color:'#0061FF', pkg:'com.dropbox.android', desc:'Penyimpanan awan dan sinkronisasi berkas.'},

  /* ==================== EDUKASI (20) ==================== */
  {id:'duolingo', name:'Duolingo', dev:'Duolingo', cat:'Edukasi', icon:'🦉', color:'#58CC02', pkg:'com.duolingo', desc:'Belajar bahasa asing dengan cara menyenangkan.'},
  {id:'udemy', name:'Udemy', dev:'Udemy', cat:'Edukasi', icon:'🎓', color:'#A435F0', pkg:'com.udemy.android', desc:'Kursus daring dari ribuan instruktur.'},
  {id:'coursera', name:'Coursera', dev:'Coursera', cat:'Edukasi', icon:'🎓', color:'#0056D2', pkg:'org.coursera.android', desc:'Kursus dari universitas terkemuka dunia.'},
  {id:'khan', name:'Khan Academy', dev:'Khan Academy', cat:'Edukasi', icon:'📖', color:'#14BF96', pkg:'org.khanacademy.android', desc:'Pelajaran gratis matematika, sains, dan lainnya.'},
  {id:'ruangguru', name:'Ruangguru', dev:'Ruangguru', cat:'Edukasi', icon:'📚', color:'#00A5CF', pkg:'com.ruangguru.learning', desc:'Bimbingan belajar online untuk siswa Indonesia.'},
  {id:'zenius', name:'Zenius', dev:'Zenius', cat:'Edukasi', icon:'🎓', color:'#E82529', pkg:'com.zenius.app', desc:'Platform belajar untuk persiapan ujian.'},
  {id:'classroom', name:'Google Classroom', dev:'Google LLC', cat:'Edukasi', icon:'🏫', color:'#0F9D58', pkg:'com.google.android.apps.classroom', desc:'Kelola kelas dan tugas online dari Google.'},
  {id:'quizlet', name:'Quizlet', dev:'Quizlet', cat:'Edukasi', icon:'🃏', color:'#4255FF', pkg:'com.quizlet.quizletandroid', desc:'Kartu belajar dan kuis interaktif.'},
  {id:'brainly', name:'Brainly', dev:'Brainly', cat:'Edukasi', icon:'🧠', color:'#FF5B00', pkg:'co.brainly', desc:'Tanya jawab pelajaran dengan siswa lain.'},
  {id:'photomath', name:'Photomath', dev:'Google LLC', cat:'Edukasi', icon:'📐', color:'#C81E1E', pkg:'com.microblink.photomath', desc:'Selesaikan soal matematika lewat kamera.'},
  {id:'babbel', name:'Babbel', dev:'Babbel', cat:'Edukasi', icon:'🗣️', color:'#FF7C00', pkg:'com.babbel.mobile.android.en', desc:'Belajar bahasa dengan percakapan praktis.'},
  {id:'memrise', name:'Memrise', dev:'Memrise', cat:'Edukasi', icon:'📖', color:'#FFCD00', pkg:'com.memrise.android.memrisecompanion', desc:'Belajar bahasa dengan video penutur asli.'},
  {id:'busuu', name:'Busuu', dev:'Busuu', cat:'Edukasi', icon:'🗣️', color:'#1D7EEA', pkg:'com.busuu.android.enc', desc:'Kursus bahasa dengan koreksi penutur asli.'},
  {id:'edx', name:'edX', dev:'edX', cat:'Edukasi', icon:'🎓', color:'#02262B', pkg:'org.edx.mobile', desc:'Kursus daring dari universitas global.'},
  {id:'linkedinlearn', name:'LinkedIn Learning', dev:'LinkedIn', cat:'Edukasi', icon:'💼', color:'#0A66C2', pkg:'com.linkedin.android.learning', desc:'Kursus keterampilan profesional.'},
  {id:'skillshare', name:'Skillshare', dev:'Skillshare', cat:'Edukasi', icon:'🎨', color:'#00FF84', pkg:'com.skillshare.Skillshare', desc:'Kelas kreatif dari praktisi industri.'},
  {id:'sololearn', name:'SoloLearn', dev:'SoloLearn', cat:'Edukasi', icon:'💻', color:'#149EF2', pkg:'com.sololearn', desc:'Belajar coding gratis di ponsel.'},
  {id:'codecademy', name:'Codecademy Go', dev:'Codecademy', cat:'Edukasi', icon:'💻', color:'#1F4056', pkg:'com.ryzac.codecademygo', desc:'Latihan coding dari Codecademy.'},
    {id:'brilliant', name:'Brilliant', dev:'Brilliant', cat:'Edukasi', icon:'💡', color:'#30B0C7', pkg:'org.brilliant.android', desc:'Belajar matematika dan sains interaktif.'},
  {id:'tofel', name:'TOEFL Go!', dev:'ETS', cat:'Edukasi', icon:'📝', color:'#0F4C81', pkg:'', desc:'Latihan resmi persiapan tes TOEFL.'},

  /* ==================== KEUANGAN (20) ==================== */
  {id:'dana', name:'DANA', dev:'DANA Indonesia', cat:'Keuangan', icon:'💳', color:'#118EEA', pkg:'id.dana', desc:'Dompet digital untuk pembayaran dan transfer.'},
  {id:'ovo', name:'OVO', dev:'Visionet Indotama', cat:'Keuangan', icon:'🟣', color:'#4C3494', pkg:'id.co.ovo', desc:'Dompet digital untuk pembayaran merchant.'},
  {id:'brimo', name:'BRImo', dev:'Bank BRI', cat:'Keuangan', icon:'🏦', color:'#00529C', pkg:'id.co.bri.brimo', desc:'Mobile banking Bank BRI.'},
  {id:'livin', name:"Livin' by Mandiri", dev:'Bank Mandiri', cat:'Keuangan', icon:'💙', color:'#003D79', pkg:'id.bmri.livin', desc:'Mobile banking Bank Mandiri.'},
  {id:'bca', name:'BCA mobile', dev:'Bank BCA', cat:'Keuangan', icon:'🏧', color:'#0060AF', pkg:'com.bca', desc:'Mobile banking Bank Central Asia.'},
  {id:'bibit', name:'Bibit', dev:'Bibit', cat:'Keuangan', icon:'📈', color:'#00B2A9', pkg:'com.bibit', desc:'Aplikasi investasi reksa dana.'},
  {id:'linkaja', name:'LinkAja', dev:'LinkAja', cat:'Keuangan', icon:'🔴', color:'#E82529', pkg:'com.telkomsel.linkaja', desc:'Dompet digital untuk pembayaran dan pulsa.'},
  {id:'gopay', name:'GoPay', dev:'Gojek', cat:'Keuangan', icon:'💚', color:'#00AA13', pkg:'', desc:'Dompet digital dari ekosistem Gojek.'},
  {id:'shopeepay', name:'ShopeePay', dev:'Shopee', cat:'Keuangan', icon:'🧡', color:'#EE4D2D', pkg:'', desc:'Dompet digital dari Shopee.'},
  {id:'flip', name:'Flip', dev:'Flip', cat:'Keuangan', icon:'💸', color:'#FF6B00', pkg:'com.flip.id', desc:'Transfer antar bank tanpa biaya admin.'},
  {id:'jenius', name:'Jenius', dev:'BTPN', cat:'Keuangan', icon:'💙', color:'#00AAE7', pkg:'com.btpn.dc', desc:'Bank digital dari BTPN.'},
  {id:'seabank', name:'SeaBank', dev:'SeaBank', cat:'Keuangan', icon:'🟠', color:'#FF5722', pkg:'com.seabank.mobile', desc:'Bank digital dari Shopee/Sea Group.'},
  {id:'ajaib', name:'Ajaib', dev:'Ajaib', cat:'Keuangan', icon:'📈', color:'#00C853', pkg:'com.ajaib', desc:'Investasi saham dan reksa dana.'},
  {id:'stockbit', name:'Stockbit', dev:'Stockbit', cat:'Keuangan', icon:'📊', color:'#1E88E5', pkg:'com.stockbit.android', desc:'Komunitas dan analisis saham Indonesia.'},
  {id:'pluang', name:'Pluang', dev:'Pluang', cat:'Keuangan', icon:'📈', color:'#6C5CE7', pkg:'com.pluang.android', desc:'Investasi emas, saham, dan kripto.'},
  {id:'indodax', name:'Indodax', dev:'Indodax', cat:'Keuangan', icon:'₿', color:'#00A8E1', pkg:'com.indodax.android', desc:'Bursa kripto terbesar di Indonesia.'},
  {id:'cimb', name:'CIMB Niaga', dev:'CIMB Niaga', cat:'Keuangan', icon:'🔴', color:'#B71C1C', pkg:'id.co.cimbniaga.mobile.android', desc:'Mobile banking CIMB Niaga.'},
  {id:'permatamobile', name:'PermataMobile X', dev:'PermataBank', cat:'Keuangan', icon:'🟢', color:'#007A33', pkg:'com.permatabank.pmb', desc:'Mobile banking PermataBank.'},
  {id:'bankjago', name:'Bank Jago', dev:'Bank Jago', cat:'Keuangan', icon:'🟠', color:'#F57C00', pkg:'', desc:'Bank digital dari Bank Jago.'},
  {id:'blu', name:'blu by BCA Digital', dev:'BCA Digital', cat:'Keuangan', icon:'💙', color:'#005BAA', pkg:'', desc:'Bank digital dari BCA.'},

  /* ==================== BELANJA (20) ==================== */
  {id:'tokopedia', name:'Tokopedia', dev:'Tokopedia', cat:'Belanja', icon:'🛍️', color:'#42B549', pkg:'com.tokopedia.tkpd', featured:true, tagline:'Belanja dari penjual seluruh Indonesia', video:'https://www.youtube.com/watch?v=8o5gZEKhfaE', desc:'Marketplace Indonesia untuk belanja produk.'},
  {id:'shopee', name:'Shopee', dev:'Shopee', cat:'Belanja', icon:'🛒', color:'#EE4D2D', pkg:'com.shopee.id', desc:'Platform belanja daring dengan promo.'},
  {id:'lazada', name:'Lazada', dev:'Lazada Group', cat:'Belanja', icon:'📦', color:'#0F146D', pkg:'com.lazada.android', desc:'Marketplace untuk belanja elektronik dan fashion.'},
  {id:'bukalapak', name:'Bukalapak', dev:'Bukalapak', cat:'Belanja', icon:'🛒', color:'#E31E52', pkg:'com.bukalapak.android', desc:'Marketplace Indonesia untuk berbagai produk.'},
  {id:'blibli', name:'Blibli', dev:'Blibli', cat:'Belanja', icon:'🛍️', color:'#0095DA', pkg:'com.blibli.oss', desc:'Marketplace dengan garansi resmi.'},
  {id:'zalora', name:'ZALORA', dev:'ZALORA', cat:'Belanja', icon:'👗', color:'#FF5722', pkg:'com.zalora.android', desc:'Belanja fashion dan gaya hidup.'},
  {id:'sociolla', name:'Sociolla', dev:'Sociolla', cat:'Belanja', icon:'💄', color:'#FF6F91', pkg:'com.sociolla.sociolla', desc:'Belanja produk kecantikan resmi.'},
  {id:'alfacart', name:'Alfacart', dev:'Alfacart', cat:'Belanja', icon:'🛒', color:'#E53935', pkg:'com.alfacart.alfacart', desc:'Belanja kebutuhan harian dari Alfamart.'},
  {id:'bhinneka', name:'Bhinneka', dev:'Bhinneka', cat:'Belanja', icon:'💻', color:'#1E88E5', pkg:'com.bhinneka.android', desc:'Toko elektronik dan gadget resmi.'},
  {id:'ikea', name:'IKEA', dev:'IKEA', cat:'Belanja', icon:'🪑', color:'#0058A3', pkg:'com.ingka.ikea.app', desc:'Belanja furnitur dari IKEA.'},
  {id:'uniqlo', name:'UNIQLO', dev:'Fast Retailing', cat:'Belanja', icon:'👕', color:'#E60012', pkg:'com.fastretailing.android.uniqlo', desc:'Belanja pakaian dari UNIQLO.'},
  {id:'hm', name:'H&M', dev:'H&M', cat:'Belanja', icon:'👗', color:'#E50010', pkg:'com.hm.alm', desc:'Fashion dari H&M resmi.'},
  {id:'nike', name:'Nike', dev:'Nike', cat:'Belanja', icon:'👟', color:'#111111', pkg:'com.nike.omega', desc:'Belanja sepatu dan apparel Nike.'},
  {id:'adidas', name:'adidas', dev:'adidas', cat:'Belanja', icon:'👟', color:'#000000', pkg:'com.adidas.confirmed.app', desc:'Belanja produk adidas resmi.'},
  {id:'sephora', name:'Sephora', dev:'Sephora', cat:'Belanja', icon:'💄', color:'#000000', pkg:'com.sephora', desc:'Belanja kosmetik dan skincare.'},
  {id:'watsons', name:'Watsons', dev:'Watsons', cat:'Belanja', icon:'💊', color:'#00A0E9', pkg:'com.aswatson.watsonsid', desc:'Belanja obat dan kebutuhan kesehatan.'},
  {id:'erafone', name:'Erafone', dev:'Erafone', cat:'Belanja', icon:'📱', color:'#E53935', pkg:'com.erafone.android', desc:'Toko gadget dan elektronik resmi.'},
  {id:'mapemall', name:'Matahari', dev:'Matahari', cat:'Belanja', icon:'👔', color:'#E53935', pkg:'com.matahari.android', desc:'Belanja fashion dari Matahari.'},
  {id:'jd', name:'JD.ID', dev:'JD', cat:'Belanja', icon:'🛍️', color:'#E1251B', pkg:'com.jd.jdandroid', desc:'Marketplace dari JD.com Indonesia.'},
  {id:'orami', name:'Orami', dev:'Orami', cat:'Belanja', icon:'👶', color:'#FF7A00', pkg:'', desc:'Belanja kebutuhan ibu dan bayi.'},

  /* ==================== PERJALANAN (15) ==================== */
  {id:'gojek', name:'Gojek', dev:'Gojek', cat:'Perjalanan', icon:'🟢', color:'#00AA13', pkg:'com.gojek.app', featured:true, tagline:'Transportasi, makanan, dan pembayaran', video:'https://www.youtube.com/watch?v=-6gRSEj1PkA', desc:'Super app transportasi dan pesan antar.'},
  {id:'grab', name:'Grab', dev:'Grab', cat:'Perjalanan', icon:'🚗', color:'#00B14F', pkg:'com.grabtaxi.passenger', desc:'Transportasi dan pesan antar makanan.'},
  {id:'traveloka', name:'Traveloka', dev:'Traveloka', cat:'Perjalanan', icon:'✈️', color:'#0770E3', pkg:'com.traveloka.android', desc:'Pesan tiket pesawat, hotel, dan kereta.'},
  {id:'agoda', name:'Agoda', dev:'Agoda', cat:'Perjalanan', icon:'🏨', color:'#5392F9', pkg:'com.agoda.mobile.consumer', desc:'Pesan hotel dan akomodasi dengan harga terbaik.'},
  {id:'booking', name:'Booking.com', dev:'Booking.com', cat:'Perjalanan', icon:'🏨', color:'#003580', pkg:'com.booking', desc:'Pesan hotel, villa, dan penerbangan.'},
  {id:'airbnb', name:'Airbnb', dev:'Airbnb', cat:'Perjalanan', icon:'🏡', color:'#FF5A5F', pkg:'com.airbnb.android', desc:'Sewa penginapan dan pengalaman lokal.'},
  {id:'tiket', name:'Tiket.com', dev:'Tiket.com', cat:'Perjalanan', icon:'✈️', color:'#003DA5', pkg:'com.tiket.gits', desc:'Pesan tiket pesawat, hotel, dan acara.'},
  {id:'pegipegi', name:'Pegipegi', dev:'Pegipegi', cat:'Perjalanan', icon:'✈️', color:'#F9A825', pkg:'com.pegipegi.activities', desc:'Booking hotel dan tiket perjalanan.'},
  {id:'kai', name:'KAI Access', dev:'KAI', cat:'Perjalanan', icon:'🚂', color:'#F37021', pkg:'com.kai.kaiticketing', desc:'Pesan tiket kereta api Indonesia.'},
  {id:'gmaps', name:'Google Maps', dev:'Google LLC', cat:'Perjalanan', icon:'🗺️', color:'#4285F4', pkg:'com.google.android.apps.maps', desc:'Peta dan navigasi dari Google.'},
  {id:'waze', name:'Waze', dev:'Google LLC', cat:'Perjalanan', icon:'🚗', color:'#00D8FF', pkg:'com.waze', desc:'Navigasi berbasis komunitas.'},
  {id:'maxim', name:'Maxim', dev:'Maxim', cat:'Perjalanan', icon:'🚕', color:'#FBBF24', pkg:'com.taxsee.taxsee', desc:'Transportasi online dengan tarif bersaing.'},
  {id:'indrive', name:'inDrive', dev:'inDrive', cat:'Perjalanan', icon:'🚗', color:'#00C853', pkg:'com.indrive', desc:'Transportasi online dengan negosiasi tarif.'},
  {id:'bluebird', name:'Blue Bird', dev:'Blue Bird', cat:'Perjalanan', icon:'🚙', color:'#1565C0', pkg:'com.bluebirdgroup.taxiapp', desc:'Taksi resmi Blue Bird via aplikasi.'},
  {id:'transjakarta', name:'TransJakarta', dev:'Pemprov DKI', cat:'Perjalanan', icon:'🚌', color:'#FF5722', pkg:'', desc:'Info dan rute TransJakarta.'},

  /* ==================== FOTOGRAFI (15) ==================== */
  {id:'capcut', name:'CapCut', dev:'Bytedance', cat:'Fotografi', icon:'✂️', color:'#1f2937', pkg:'com.lemon.lvoverseas', desc:'Editor video dengan efek dan template.'},
  {id:'canva', name:'Canva', dev:'Canva', cat:'Fotografi', icon:'🎨', color:'#00C4CC', pkg:'com.canva.editor', desc:'Desain grafis mudah untuk semua orang.'},
  {id:'snapseed', name:'Snapseed', dev:'Google LLC', cat:'Fotografi', icon:'🖼️', color:'#34A853', pkg:'com.niksoftware.snapseed', desc:'Editor foto profesional dari Google.'},
  {id:'picsart', name:'Picsart', dev:'PicsArt', cat:'Fotografi', icon:'🪄', color:'#C209C1', pkg:'com.picsart.studio', desc:'Editor foto dan video dengan alat kreatif.'},
  {id:'lightroom', name:'Lightroom', dev:'Adobe', cat:'Fotografi', icon:'🌅', color:'#31A8FF', pkg:'com.adobe.lrmobile', desc:'Editor foto profesional dari Adobe.'},
  {id:'psx', name:'Photoshop Express', dev:'Adobe', cat:'Fotografi', icon:'🖌️', color:'#001E36', pkg:'com.adobe.psmobile', desc:'Editor foto ringan dari Adobe.'},
  {id:'vsco', name:'VSCO', dev:'VSCO', cat:'Fotografi', icon:'📷', color:'#000000', pkg:'com.vsco.cam', desc:'Filter foto estetik dan komunitas kreator.'},
  {id:'pixlr', name:'Pixlr', dev:'Pixlr', cat:'Fotografi', icon:'🎨', color:'#2B2B2B', pkg:'com.pixlr.express', desc:'Editor foto online dengan banyak filter.'},
  {id:'inshot', name:'InShot', dev:'InShot', cat:'Fotografi', icon:'✂️', color:'#FF3D00', pkg:'com.camerasideas.instashot', desc:'Editor video dengan musik dan efek.'},
  {id:'vivavideo', name:'VivaVideo', dev:'QuVideo', cat:'Fotografi', icon:'🎬', color:'#FFC107', pkg:'com.quvideo.xiaoying', desc:'Editor video lengkap untuk pemula.'},
  {id:'kinemaster', name:'KineMaster', dev:'KineMaster', cat:'Fotografi', icon:'🎥', color:'#1DE9B6', pkg:'com.nexstreaming.app.kinemasterfree', desc:'Editor video multi-layer.'},
  {id:'powerdirector', name:'PowerDirector', dev:'CyberLink', cat:'Fotografi', icon:'🎬', color:'#0D47A1', pkg:'com.cyberlink.powerdirector.DRA140225_01', desc:'Editor video profesional di ponsel.'},
  {id:'prequel', name:'Prequel', dev:'Prequel', cat:'Fotografi', icon:'✨', color:'#FF1744', pkg:'com.prequel.app', desc:'Filter dan efek foto estetik.'},
  {id:'facetune', name:'Facetune', dev:'Lightricks', cat:'Fotografi', icon:'💆', color:'#FF6F00', pkg:'com.lightricks.facetune', desc:'Retouch foto wajah dan portrait.'},
  {id:'prisma', name:'Prisma', dev:'Prisma Labs', cat:'Fotografi', icon:'🎨', color:'#6A1B9A', pkg:'com.neuralprisma', desc:'Ubah foto jadi karya seni dengan AI.'},

  /* ==================== KESEHATAN (15) ==================== */
  {id:'halodoc', name:'Halodoc', dev:'Halodoc', cat:'Kesehatan', icon:'🩺', color:'#00A5CF', pkg:'com.linkdokter.halodoc.android', desc:'Konsultasi dokter dan beli obat online.'},
  {id:'alodokter', name:'Alodokter', dev:'Alodokter', cat:'Kesehatan', icon:'❤️', color:'#E63946', pkg:'com.alodokter.android', desc:'Konsultasi dokter dan info kesehatan.'},
  {id:'klikdokter', name:'KlikDokter', dev:'KlikDokter', cat:'Kesehatan', icon:'💊', color:'#0288D1', pkg:'com.android.klikdokter', desc:'Konsultasi dokter dan apotek online.'},
  {id:'sehatq', name:'SehatQ', dev:'SehatQ', cat:'Kesehatan', icon:'🏥', color:'#00BFA5', pkg:'com.sehatq.app', desc:'Layanan kesehatan digital terintegrasi.'},
  {id:'strava', name:'Strava', dev:'Strava', cat:'Kesehatan', icon:'🏃', color:'#FC4C02', pkg:'com.strava', desc:'Lacak aktivitas lari dan sepeda.'},
  {id:'gfit', name:'Google Fit', dev:'Google LLC', cat:'Kesehatan', icon:'🏃', color:'#4285F4', pkg:'com.google.android.apps.fitness', desc:'Pelacak aktivitas fisik dari Google.'},
  {id:'shealth', name:'Samsung Health', dev:'Samsung', cat:'Kesehatan', icon:'💚', color:'#1428A0', pkg:'com.sec.android.app.shealth', desc:'Pantau kesehatan dan aktivitas harian.'},
  {id:'mfp', name:'MyFitnessPal', dev:'MyFitnessPal', cat:'Kesehatan', icon:'🥗', color:'#0072CE', pkg:'com.myfitnesspal.android', desc:'Hitung kalori dan lacak nutrisi.'},
  {id:'yazio', name:'Yazio', dev:'YAZIO', cat:'Kesehatan', icon:'🥗', color:'#00C853', pkg:'com.yazio.android', desc:'Diet dan puasa intermiten dengan panduan.'},
  {id:'headspace', name:'Headspace', dev:'Headspace', cat:'Kesehatan', icon:'🧘', color:'#FF6D00', pkg:'com.getsomeheadspace.android', desc:'Meditasi dan mindfulness harian.'},
  {id:'calm', name:'Calm', dev:'Calm.com', cat:'Kesehatan', icon:'🌙', color:'#1565C0', pkg:'com.calm.android', desc:'Meditasi, tidur, dan relaksasi.'},
  {id:'sleepcycle', name:'Sleep Cycle', dev:'Sleep Cycle', cat:'Kesehatan', icon:'😴', color:'#6C63FF', pkg:'com.northcube.sleepcycle', desc:'Pelacak kualitas tidur.'},
  {id:'ntc', name:'Nike Training Club', dev:'Nike', cat:'Kesehatan', icon:'💪', color:'#111111', pkg:'com.nike.ntc', desc:'Latihan kebugaran dari Nike.'},
  {id:'mysugr', name:'mySugr', dev:'Roche', cat:'Kesehatan', icon:'💉', color:'#E53935', pkg:'com.mysugr.android.mysugar', desc:'Bantu kelola diabetes harian.'},
  {id:'lifesum', name:'Lifesum', dev:'Lifesum', cat:'Kesehatan', icon:'🥑', color:'#3CC47C', pkg:'com.sillens.shapeupclub', desc:'Pelacak makanan dan gaya hidup sehat.'},

  /* ==================== BERITA (15) ==================== */
  {id:'kompas', name:'Kompas.com', dev:'Kompas', cat:'Berita', icon:'📰', color:'#1B4A9C', pkg:'com.kompas.android', desc:'Berita dari Kompas.com.'},
  {id:'detik', name:'detikcom', dev:'detikcom', cat:'Berita', icon:'📰', color:'#E53935', pkg:'com.detik.news', desc:'Berita terkini dari detikcom.'},
  {id:'cnnindonesia', name:'CNN Indonesia', dev:'Trans Media', cat:'Berita', icon:'📺', color:'#B71C1C', pkg:'com.cnn.indonesia', desc:'Berita nasional dan internasional.'},
  {id:'tempo', name:'Tempo', dev:'Tempo', cat:'Berita', icon:'📰', color:'#C62828', pkg:'com.tempo.news', desc:'Berita mendalam dari majalah Tempo.'},
  {id:'tribun', name:'Tribunnews', dev:'Tribun Network', cat:'Berita', icon:'📰', color:'#1E88E5', pkg:'com.tribunnews', desc:'Berita dari jaringan Tribunnews.'},
  {id:'liputan6', name:'Liputan6', dev:'SCTV', cat:'Berita', icon:'📰', color:'#FF6F00', pkg:'com.liputan6.android', desc:'Berita dari Liputan6.com.'},
  {id:'kumparan', name:'kumparan', dev:'kumparan', cat:'Berita', icon:'📰', color:'#00BFA5', pkg:'com.kumparan.android', desc:'Platform berita dari jurnalis dan warga.'},
  {id:'tirto', name:'Tirto.id', dev:'Tirto', cat:'Berita', icon:'📰', color:'#212121', pkg:'com.tirto.android', desc:'Jurnalisme mendalam dari Tirto.id.'},
  {id:'antara', name:'ANTARA', dev:'LKBN Antara', cat:'Berita', icon:'📰', color:'#D32F2F', pkg:'com.antara.news', desc:'Kantor berita resmi Indonesia.'},
  {id:'bbc', name:'BBC News', dev:'BBC', cat:'Berita', icon:'📰', color:'#BB1919', pkg:'bbc.mobile.news.ww', desc:'Berita internasional dari BBC.'},
  {id:'cnbc', name:'CNBC Indonesia', dev:'Trans Media', cat:'Berita', icon:'💹', color:'#0D47A1', pkg:'', desc:'Berita ekonomi dan bisnis Indonesia.'},
  {id:'bisnis', name:'Bisnis.com', dev:'Bisnis Indonesia', cat:'Berita', icon:'📰', color:'#1976D2', pkg:'', desc:'Berita bisnis dan keuangan.'},
  {id:'republika', name:'Republika', dev:'Republika', cat:'Berita', icon:'📰', color:'#F57C00', pkg:'', desc:'Berita dari Republika Online.'},
  {id:'medcom', name:'Medcom.id', dev:'Media Group', cat:'Berita', icon:'📰', color:'#C62828', pkg:'', desc:'Berita dari Media Group.'},
  {id:'suara', name:'Suara.com', dev:'Suara', cat:'Berita', icon:'📰', color:'#D32F2F', pkg:'', desc:'Portal berita Suara.com.'},

  /* ==================== MAKANAN (15) ==================== */
  {id:'foodpanda', name:'foodpanda', dev:'Delivery Hero', cat:'Makanan', icon:'🐼', color:'#D70F64', pkg:'com.global.foodpanda.android', desc:'Pesan antar makanan dari restoran.'},
  {id:'cookpad', name:'Cookpad', dev:'Cookpad', cat:'Makanan', icon:'🍳', color:'#FF6D00', pkg:'com.cookpad.android', desc:'Resep masakan dari komunitas dunia.'},
  {id:'tasty', name:'Tasty', dev:'BuzzFeed', cat:'Makanan', icon:'🍔', color:'#EA3B28', pkg:'com.buzzfeed.tasty', desc:'Resep video yang mudah diikuti.'},
  {id:'yummly', name:'Yummly', dev:'Yummly', cat:'Makanan', icon:'🍴', color:'#FF6A00', pkg:'com.yummly.android', desc:'Resep personal sesuai selera.'},
  {id:'kitchen', name:'Kitchen Stories', dev:'Kitchen Stories', cat:'Makanan', icon:'👨‍🍳', color:'#00B5AD', pkg:'com.kitchenstories.kitchenstories', desc:'Resep dengan panduan video.'},
  {id:'sidechef', name:'SideChef', dev:'SideChef', cat:'Makanan', icon:'🍽️', color:'#FF6B00', pkg:'com.sidechef.sidechef', desc:'Resep pintar dengan panduan langkah.'},
  {id:'bbcgoodfood', name:'BBC Good Food', dev:'Immediate Media', cat:'Makanan', icon:'🍲', color:'#BC0B0E', pkg:'com.immediate.bbcgf', desc:'Resep dari majalah BBC Good Food.'},
  {id:'allrecipes', name:'Allrecipes', dev:'Meredith', cat:'Makanan', icon:'🥘', color:'#E85D2C', pkg:'com.allrecipes.android', desc:'Kumpulan resep dari komunitas besar.'},
  {id:'paprika', name:'Paprika', dev:'Hindsight Labs', cat:'Makanan', icon:'📖', color:'#4CAF50', pkg:'com.hindsightlabs.paprika.android', desc:'Kelola resep dan daftar belanja.'},
  {id:'mealime', name:'Mealime', dev:'Mealime', cat:'Makanan', icon:'🥗', color:'#5CB85C', pkg:'com.mealime', desc:'Rencana makan mingguan otomatis.'},
  {id:'resepedia', name:'Resepedia', dev:'Resepedia', cat:'Makanan', icon:'🍲', color:'#E53935', pkg:'', desc:'Kumpulan resep masakan Indonesia.'},
  {id:'masakapa', name:'Masak Apa?', dev:'Masak Apa', cat:'Makanan', icon:'👩‍🍳', color:'#FF8F00', pkg:'', desc:'Resep Indonesia dengan panduan praktis.'},
  {id:'kulineria', name:'Kulineria', dev:'Kulineria', cat:'Makanan', icon:'🍜', color:'#FF5722', pkg:'', desc:'Resep rumahan Indonesia praktis.'},
  {id:'sajiansedap', name:'Sajian Sedap', dev:'Grid Network', cat:'Makanan', icon:'🍱', color:'#C62828', pkg:'', desc:'Resep dari majalah Sajian Sedap.'},
  {id:'gofood', name:'GoFood', dev:'Gojek', cat:'Makanan', icon:'🍔', color:'#00AA13', pkg:'', desc:'Pesan antar makanan dari Gojek.'}
];

/* ============================================================
   META KATEGORI
   ============================================================ */
const CAT_META = [
  {cat:'Semua',        emoji:'🌟'},
  {cat:'Game',         emoji:'🎮'},
  {cat:'Sosial',       emoji:'👥'},
  {cat:'Hiburan',      emoji:'🎬'},
  {cat:'Produktivitas',emoji:'⚡'},
  {cat:'Edukasi',      emoji:'📚'},
  {cat:'Keuangan',     emoji:'💰'},
  {cat:'Belanja',      emoji:'🛍️'},
  {cat:'Perjalanan',   emoji:'✈️'},
  {cat:'Fotografi',    emoji:'📸'},
  {cat:'Kesehatan',    emoji:'💊'},
  {cat:'Berita',       emoji:'📰'},
  {cat:'Makanan',      emoji:'🍔'},
  {cat:'Favorit',      emoji:'⭐'}
];

/* ============================================================
   MISI HARIAN
   - switch_theme DIHAPUS
   - download_10 DITAMBAHKAN
   ============================================================ */
const MISSIONS = [
  { id: 'open_detail', icon: '👀', name: 'Jelajah Aplikasi',      desc: 'Buka detail 3 aplikasi',                goal: 3,  reward: 15 },
  { id: 'save_fav',    icon: '⭐', name: 'Kolektor Favorit',       desc: 'Simpan 2 aplikasi ke favorit',          goal: 2,  reward: 20 },
  { id: 'download_10', icon: '⬇️', name: 'Download 10 Aplikasi',   desc: 'Unduh 10 aplikasi di Play Store',       goal: 10, reward: 50 },
  { id: 'watch_video', icon: '🎬', name: 'Nonton Video Sponsor',   desc: 'Buka video aplikasi unggulan',          goal: 1,  reward: 15 },
  { id: 'browse_cat',  icon: '🗂️', name: 'Penjelajah Kategori',    desc: 'Kunjungi 3 kategori berbeda',           goal: 3,  reward: 20 }
];

/* ============================================================
   STATE MISI
   ============================================================ */
const MISSION_STORE_KEY = 'appnesia:missions';
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

function freshMissionState(date, keepPoints = 0){
  return {
    date: date,
    progress: MISSIONS.reduce((acc,m)=>{ acc[m.id]=0; return acc; }, {}),
    claimed:  MISSIONS.reduce((acc,m)=>{ acc[m.id]=false; return acc; }, {}),
    seenCats: [],
    seenApps: [],
    downloadedApps: [],   // untuk misi download_10
    points: keepPoints
  };
}

function loadMissionState(){
  const raw = localStorage.getItem(MISSION_STORE_KEY);
  const today = todayKey();
  if(!raw) return freshMissionState(today);
  try{
    const parsed = JSON.parse(raw);
    // Reset harian (poin tetap)
    if(parsed.date !== today) return freshMissionState(today, parsed.points || 0);
    MISSIONS.forEach(m => {
      if(typeof parsed.progress[m.id] !== 'number') parsed.progress[m.id] = 0;
      if(typeof parsed.claimed[m.id] !== 'boolean') parsed.claimed[m.id] = false;
    });
    if(!Array.isArray(parsed.seenCats)) parsed.seenCats = [];
    if(!Array.isArray(parsed.seenApps)) parsed.seenApps = [];
    if(!Array.isArray(parsed.downloadedApps)) parsed.downloadedApps = [];
    return parsed;
  }catch(e){
    return freshMissionState(today);
  }
}

let MISSION_STATE = loadMissionState();
const saveMissionState = () => localStorage.setItem(MISSION_STORE_KEY, JSON.stringify(MISSION_STATE));

function missionProgress(id){
  const m = MISSIONS.find(x => x.id === id);
  return m ? Math.min(MISSION_STATE.progress[id] || 0, m.goal) : 0;
}
function isMissionDone(id){
  const m = MISSIONS.find(x => x.id === id);
  return m ? missionProgress(id) >= m.goal : false;
}
const totalPoints = () => MISSION_STATE.points || 0;
const doneCount  = () => MISSIONS.filter(m => isMissionDone(m.id)).length;

function addMissionProgress(id, amount = 1){
  const m = MISSIONS.find(x => x.id === id);
  if(!m || MISSION_STATE.claimed[id]) return;
  const before = MISSION_STATE.progress[id] || 0;
  if(before >= m.goal) return;

  MISSION_STATE.progress[id] = Math.min(before + amount, m.goal);

  if(MISSION_STATE.progress[id] >= m.goal && !MISSION_STATE.claimed[id]){
    MISSION_STATE.claimed[id] = true;
    MISSION_STATE.points = (MISSION_STATE.points || 0) + m.reward;
    saveMissionState();
    if(typeof window.renderMissions === 'function') window.renderMissions();
    if(typeof window.showToast === 'function') window.showToast(`🎉 Misi selesai: ${m.name} +${m.reward} poin!`);
    return;
  }
  saveMissionState();
  if(typeof window.renderMissions === 'function') window.renderMissions();
}

/* ============================================================
   TOKO POIN (SHOP) — Bayar pakai poin misi harian
   ============================================================ */
const SHOP_ITEMS = [
  { id: 'theme_gold',  name: 'Tema Emas Premium',  icon: '👑', price: 80,  desc: 'Buka akses tema emas eksklusif.' },
  { id: 'badge_star',  name: 'Badge Bintang',      icon: '🌟', price: 40,  desc: 'Badge bintang di kartu aplikasi favorit.' },
  { id: 'ad_free',     name: 'Bebas Iklan 1 Hari', icon: '🚫', price: 60,  desc: 'Sembunyikan sponsor selama 24 jam.' },
  { id: 'double_pts',  name: 'Poin Ganda',         icon: '✨', price: 100, desc: 'Poin misi jadi 2x selama 1 hari.' },
  { id: 'lucky_dice',  name: 'Dadu Keberuntungan', icon: '🎲', price: 30,  desc: 'Bonus acak 10–50 poin saat dipakai.' },
  { id: 'vip_crown',   name: 'Mahkota VIP',        icon: '💎', price: 200, desc: 'Mahkota eksklusif di profil pengguna.' }
];

const SHOP_STORE_KEY = 'appnesia:shop';
let SHOP_STATE = loadShopState();

function loadShopState(){
  try {
    const raw = JSON.parse(localStorage.getItem(SHOP_STORE_KEY) || '{}');
    return (raw && typeof raw === 'object') ? raw : {};
  } catch(e){ return {}; }
}

function saveShopState(){
  localStorage.setItem(SHOP_STORE_KEY, JSON.stringify(SHOP_STATE));
}

function buyShopItem(id){
  const item = SHOP_ITEMS.find(i => i.id === id);
  if(!item)                          return { ok:false, msg:'❌ Item tidak ditemukan' };
  if(SHOP_STATE[id])                 return { ok:false, msg:'ℹ️ Item sudah dimiliki' };
  if((MISSION_STATE.points||0) < item.price) return { ok:false, msg:'❌ Poin tidak cukup' };

  MISSION_STATE.points -= item.price;
  SHOP_STATE[id] = true;

  // Efek khusus item
  if(id === 'lucky_dice'){
    const bonus = 10 + Math.floor(Math.random() * 41); // 10–50
    MISSION_STATE.points += bonus;
    saveMissionState();
    saveShopState();
    return { ok:true, msg:`🎲 Dadu memberi bonus ${bonus} poin!` };
  }

  saveMissionState();
  saveShopState();
  return { ok:true, msg:`✅ Berhasil membeli ${item.name}!` };
}

/* ============================================================
   EKSPOR KE GLOBAL (agar bisa diakses dari index.html)
   ============================================================ */
 if(typeof window !== 'undefined'){
  window.APPS              = APPS;
  window.CAT_META          = CAT_META;
  window.MISSIONS          = MISSIONS;
  window.SHOP_ITEMS        = SHOP_ITEMS;
  window.SHOP_STATE        = SHOP_STATE;
  window.MISSION_STATE     = MISSION_STATE;
  window.addMissionProgress= addMissionProgress;
  window.buyShopItem       = buyShopItem;
  window.saveMissionState  = saveMissionState;
  window.saveShopState     = saveShopState;
  window.todayKey          = todayKey;
  window.loadMissionState  = loadMissionState;
  window.missionProgress   = missionProgress;
  window.isMissionDone     = isMissionDone;
  window.totalPoints       = totalPoints;
  window.doneCount         = doneCount;
   }
