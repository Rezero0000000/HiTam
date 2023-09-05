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

