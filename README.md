# Setup awal
- Buat function yang berjalan sendiri (function() {})
- kirim parameter canvas ke class utama
- ambil context dari si canvas (di project ini kebanyakan make fitur object)

# Cara gambar di canvas
   const shadow = new Image();
   shadow.onload = () => {
    this.ctx.drawImage(
      shadow, 
      0, //left cut 
      0, //top cut,
      32, //width of cut
      32, //height of cut
      x * 16 - 8, // x
      y * 16 - 18, // y
      32, // width
      32 // height
   )
   }

   shadow.src = "";  //src

# Buat class GameObject

    kurleb templatenya kaya gini
    class GameObject {
        constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.sprite = new Sprite({
          gameObject: this,
          src: config.src || "",
        });
        }
    }

    intinya koordinat x,y,dan fitur draw

# cara gambar yang efisien
    this.image.onload = () => {
      this.isLoaded = true;
    }

    this.isLoaded && ctx.drawImage(this.image,
      0,0,
      32,32,
      x,y,
      32,32
    )

# cara gambar frame per second
  setTimeout(() => {
    draw here
  }, 200)

# Cara simpel membuat map dan object property (Mirip scene)
- Buat OverworldMap class terus refrence gameObjects
- buat object image untuk upper dan lower image sama fungsi untuk drawnya
- buat variabel global untuk menyimpan info path map, dan gameObjects 
  menggunakan fitur window
- membuat coreLoop di overworld.js
-  const step = () => {
        //Clear off the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //Draw Lower layer
    
    requestAnimationFrame(() => {
      step();   
     })
   }
   step();

# Cara ribet membuat coreLoop

coreLoop () {
    let previousMs;
    const stepTime = 1 / 40;
    const tick = (timestampMs) => {
      if (previousMs === undefined) {
          previousMs = timestampMs;
      }
      
      let delta = (timestampMs - previousMs) / 1000;
      const cameraPerson = this.map.gameObjects.hero
      
      while (delta >= stepTime) {
       
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.map.drawLowerMap(this.ctx, cameraPerson)
     
      Object.values(this.map.gameObjects).forEach((obj) => {
        obj.sprite.draw(this.ctx, cameraPerson);
        if (obj.isPlayer){
          obj.update()
        }
      })
        delta -= stepTime;
      }
    
      previousMs = timestampMs - delta * 1000; 
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick); 
  }

- coreLoop () {: Ini adalah deklarasi awal dari fungsi coreLoop.

- let previousMs;: Variabel previousMs digunakan untuk menyimpan timestamp (waktu dalam milidetik) dari frame sebelumnya.

- const stepTime = 1 / 40;: Variabel konstan stepTime digunakan untuk menentukan interval waktu (dalam detik) antara setiap langkah permainan. Nilai ini setara dengan 1/40 detik atau sekitar 25 milidetik.

- const tick = (timestampMs) => {: Ini adalah deklarasi fungsi bernama tick yang akan dijalankan setiap kali browser meminta frame animasi.

- if (previousMs === undefined) { previousMs = timestampMs; }: Pengecekan apakah previousMs sudah didefinisikan. Jika belum, maka previousMs diinisialisasi dengan nilai timestamp saat ini.

- let delta = (timestampMs - previousMs) / 1000;: Variabel delta digunakan untuk menghitung selisih waktu (dalam detik) antara frame saat ini dan frame sebelumnya.

- const cameraPerson = this.map.gameObjects.hero: Variabel cameraPerson digunakan untuk menyimpan objek pemeran utama (hero) yang digunakan sebagai kamera untuk menggambar objek-objek lainnya.

- while (delta >= stepTime) {: Ini adalah loop yang akan terus berjalan selama delta lebih besar atau sama dengan stepTime.

- this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);: Ini digunakan untuk membersihkan (menghapus) isi canvas sebelum menggambar frame permainan berikutnya.

- this.map.drawLowerMap(this.ctx, cameraPerson): Ini memanggil metode drawLowerMap dari objek this.map untuk menggambar bagian peta bawah (lower map) dengan menggunakan this.ctx (konteks canvas) dan mengikuti posisi kamera yang ditentukan oleh cameraPerson.

- Object.values(this.map.gameObjects).forEach((obj) => { ... }: Ini adalah loop yang digunakan untuk menggambar dan memperbarui seluruh objek permainan yang ada dalam this.map.gameObjects. Setiap objek diambil, dan metode draw dari sprite-nya dipanggil untuk menggambar objek tersebut di canvas. Jika objek adalah pemain (player), maka metode update dari objek tersebut juga dipanggil.

- delta -= stepTime;: Nilai delta dikurangkan sebesar stepTime untuk menunjukkan bahwa satu langkah permainan telah dilakukan.

- previousMs = timestampMs - delta * 1000;: Nilai previousMs diperbarui dengan timestamp saat ini dikurangi dengan sisa waktu yang tidak digunakan dalam langkah permainan.

- requestAnimationFrame(tick);: Ini adalah cara untuk mengatur agar fungsi tick dipanggil lagi untuk frame animasi berikutnya. Dengan demikian, perulangan utama berlanjut.

- Kode ini secara keseluruhan digunakan untuk mengatur loop permainan yang menjalankan frame demi frame dengan interval waktu tetap, membersihkan canvas, menggambar objek-objek permainan, dan memperbarui posisi kamera.

# movement character
- ambil input kontroller
- key down set Status direction true kalau up false
- ketika status direction true set velocity
- kalau false misal !UP && !DOWN set velocity 0
- tambahkan koordinat dengan velocity

# Camera
- ketika draw map posisinya menggunakan posisi si player
- ketika draw sprite posisi nya di tambah angka 10;
contoh :
  const x = this.gameObject.x + 20 - cameraPerson.x;
  const y = this.gameObject.y + 6- cameraPerson.y;


  drawLowerMap (ctx, cameraPerson) {
    ctx.drawImage (
      this.lowerMap,
      cameraPerson.x, 
      cameraPerson.y
    );
  }
