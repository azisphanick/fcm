# Firebase Cloud Messaging | Firebase
Firebase Cloud Messaging (FCM) adalah sebuah platform yang memungkinkan kita untuk mengirimkan pesan dan notifikasi secara gratis.

FCM adalah versi terbaru GCM di bawah merk Firebase. Versi baru mewarisi infrastruktur inti GCM, dengan SDK baru untuk membuat pengembangan Cloud Messanging lebih mudah.

## Fungsi utama
  - Mengirim notifikasi pesan atau data pesan.
  - Menargetkan pesan serbaguna.
  - Mengirim  pesan dari client apps.

## Bagaimana FCM bekerja
![Overview](Images/messaging-overview.png)

Implementasi yang menyertakan 2 komponen utama untuk mengirim dan menerima:
1. Sebuah environment seperti Cloud Functions untuk firebase atau sebuah app server yang digunakan untuk membangun, target dan mengirim pesan.
2. iOS, Android, atau Web (Javascript) Aplikasi client yang menerima pesan.

Kita bisa mengirim pesan melalui Admin SDK atau HTTP dan XMPP APIs. Untuk pengujian atau untuk mengirimkan pemasaran atau keterlibatan pesan dengan powerful built-in menargetkan dan analisis, Anda dapat juga menggunakan Notifications composer.

## Firebase Cloud Messaging HTTP Protocol

Dokumen ini menyediakan referensi untuk sintaks HTTP yang digunakan untuk menyampaikan pesan dari server aplikasi aplikasi ke aplikasi client melalui Firebase Cloud Messaging. Aplikasi server anda harus di arahkan semua ke permintaan HTTP ke endpoint berikut:
`https://fcm.googleapis.com/fcm/send
`

## Install JavaScript Firebase Cloud Messaging aplikasi klien

API JavaScript FCM mengijinkan kita menerima pesan notifikasi di aplikasi web yang berjalan di browser yang memberikan dukungan `service worker`,berikut beberapa web browser yang support:
- Chrome: 50+
- Firefox: 44+
- Operator Mobile: 37+

Mengirim pesan ke JavaScript client menggunakan HTTP dan XMOO app server protocols, seperti yang di jelskan di `send Messages`. Pengiriman pesan dari konsole firebase tidak support.

`FCM SDK tidak support di halaman selain HTTPS. hal ini di sebabkan oleh layanan service worker, yang hanya tersedia di di situs HTTPS. Butuh sebuah provider ? Firebase Hosting adalah cara yang mudah untuk mendapatkan hosting HTTPS gratis didomain Anda sendiri`

## Menambahkan firebase ke JavaScript projek

Untuk menambahkan Firebase ke aplikasi, sebalumnya kita harus mempunyai projek firebase dan cuplikan yang akan di tambahkan ke HTML aplikasi. berikut adalah langkah langkanya :
1. Buat proyek firebase di `firebase console`. berikut caranya :
    - Buka url [disini](https://console.firebase.google.com/)
    - Pilih `tambah proyek` seperti pada gambar di bawah ini

      ![Gambar2](Images/1.png)
    - Berikan nama projek dan wilayah seperti berikut:

      ![Gambar3](Images/2.png)
    lalu pilih `BUAT PROYEK`, proses selesai.
2. Jika sudah membuat pastikan tampilannya seperti berikut ![Gambar3](Images/3.png) pada bagian tengan atas terdapat `KancioApp` itu adalah nama projeknya. selanjutnya adalah kita akan memilih untuk, apakah FCM akan di tambahkan ke android, iOS, atau Web. kita bisa sesuai dengan keinginan kita.
3. Selanjutnya Klik `Tambahkan Firebase ke aplikasi wen Anda` sehingga muncul script seperti berikut ini:
  ~~~javascript
<script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAcnxGrGpf2HjlyzVBSNonznbuWR6cZ_B4",
    authDomain: "kancioapp.firebaseapp.com",
    databaseURL: "https://kancioapp.firebaseio.com",
    projectId: "kancioapp",
    storageBucket: "kancioapp.appspot.com",
    messagingSenderId: "376337810996"
  };
  firebase.initializeApp(config);
</script>
  ~~~
  Script di atas adalah potongan informasi inisialisasi untuk mengkonfigurasi firebase JavaScript SDK agar kita bisa menggunakan Authentication, Storage, dan Realtime Database. Kita kurangi jumlah kode yang di gunakan aplikasi, hanya menyertakan fitur yang kita butuhkan saja berikut komponen yang bisa kita install secara terpisah adalah sbb:
    * `firebase-app`- Klien inti firebase (wajib).
    * `firebase-auth` - Otentikasi Firebase(optional)
    * `firebase-database` - database realtime firebase(optional)
    * `firebase-storage`- Cloud Storage(optional)
    * `firebase-messaging` Firebase Cloud Messaging(optional)

## Implementasi Firebase Cloud Messaging
Untuk implementasi FCM, saya menggunakan bahasa pemrograman Go,Html, dan Javascript. Di sini bahasa pemrograman go berfungsi sebagai web server saja, berikut adalah implementasinya.
  1. Siapkan struktur file dan direktori seperti gambar berikut ini:

    ![demo1](/Images/demo2.png)

    pada file `app.js` tambahkan script sebagai berikut untuk melakukan inisialisasi.
  ~~~JavaScript
//app.js
var config = {
  apiKey: "AIzaSyAcnxGrGpf2HjlyzVBSNonznbuWR6cZ_B4",
  authDomain: "kancioapp.firebaseapp.com",
  databaseURL: "https://kancioapp.firebaseio.com",
  projectId: "kancioapp",
  storageBucket: "kancioapp.appspot.com",
  messagingSenderId: "376337810996"
};
firebase.initializeApp(config);
  ~~~
  2. Selanjutnya pada file `index.html` buatkan sintaks sebagai berikut:
    ~~~html
<html>
<head>
    <meta charset=utf-8 />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firebase Cloud Messaging Demo</title>
    <!-- fungsinya untuk mengaktifkan fungsi firebase -->
    <script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script>

    <!-- kedua baris di bawah ini untuk memanggil file style.css dan manifest.json -->
    <link rel="stylesheet" href="style.css">
    <link rel="manifest" href="/manifest.json">
  </head>

  <body>
    <h1>Hello,, Ini contoh Implementasi Firebase Cloud Messaging</h1>
    <!-- fungsinya untuk memanggil fil app.js -->
    <script src="app.js"></script>
  </body>
</html>
  ~~~
  3. selanjutnya pada file `manifest.json` tambahkan baris kode seperti berikut ini :
    ~~~json
{
  "//": "Some browsers will use this to enable push notifications.",
  "//": "It is the same for all projects, this is not your project's sender ID",
  "gcm_sender_id": "376337810996"
}
  ~~~
  kode `gcm_sender_id` di dapat pada saat mendaftar projek sebelumnya.
  4. Pada file `app.js` kita akan menambahkan baris kode seperti pada gambar berikut ini.
    ~~~JavaScript
// gunanya untuk mengakses semua pesan
const messaging = firebase.messaging();
// Scrip di bawah ini di gunakan untuk menampilkan notifikasi pesan.
messaging.requestPermission()
.then(function(){
  console.log('Memiliki izin');
})
.then(function(err){
  console.log('Terjadi kesalahan');
})
  ~~~
  jika sudah menambahkan kode script di atas, jalankan web server di go, menggunakan perintah `go run main.go`, dan pastikan hasilnya seperti gambar berikut ini ![demo3](Images/demo3.png) setelah itu cek browser [ip:8090], dan hasil akhirnya seperti berikut ini: ![demo4](Images/demo4.png)
  tanda-tanda berhasil ketikan muncul notifikasi seperti pada gambar pojok kiri atas.
