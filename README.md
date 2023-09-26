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

# Cara simpel membuat map dan object property (Mirip scene)
- Buat OverworldMap class terus refrence gameObjects
- buat object image untuk upper dan lower image sama fungsi untuk drawnya
- buat variabel global untuk menyimpan info path map, dan gameObjects 
  menggunakan fitur window
- membuat coreLoop di overworld.js
  const step = () => {
        //Clear off the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //Draw Lower layer
    
    requestAnimationFrame(() => {
      step();   
     })
   }
   step();

# Implementasi delta time

coreLoop () {
    let previousMs;
    const stepTime = 1 / 40;
    const tick = (timestampMs) => {
      if (previousMs === undefined) {
          previousMs = timestampMs;
      }
      
      let delta = (timestampMs - previousMs) / 1000;
      
      while (delta >= stepTime) {
        // Game Logic
        delta -= stepTime;
      }
    
      previousMs = timestampMs - delta * 1000; 
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick); 
}

- Inisialisasi Variabel Waktu Sebelumnya: Mulailah dengan menginisialisasi variabel yang akan digunakan
untuk menyimpan waktu frame sebelumnya. Ini biasanya diatur ke undefined pada awalnya.

- Buat sebuah loop utama dengan kondisie ketika delta >= stepTime:

- a. Hitung Delta Time: Hitung selisih waktu antara waktu frame saat ini dan waktu frame sebelumnya.
Ini dapat dihitung dengan rumus (timestampSaatIni - timestampSebelumnya) / 1000, di mana 1000 mengonversi 
waktu dari milidetik ke detik.

- b. Game Logic: Gunakan delta time ini dalam perhitungan logika permainan Anda. Ini termasuk pergerakan
objek, animasi, dan hal-hal lain yang memengaruhi permainan seiring berjalannya waktu.

- c. Perbarui Waktu Sebelumnya: Setelah logika permainan diterapkan,
perbarui variabel waktu sebelumnya dengan waktu saat ini minus sisa delta time yang belum digunakan.

- Request Animation Frame: Terakhir, gunakan fungsi requestAnimationFrame
(atau ekivalennya dalam bahasa lain) untuk mengatur iterasi berikutnya dari loop utama. Hal 
ini akan menjaga permainan berjalan dengan framerate yang sesuai.# movement character


# Movement
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
