### Scaling
RenderTexture rt_buffer;
Vector2 win_screen = (Vector2){900.0f, 800.0f};

int main() {
    SetConfigFlags(FLAG_WINDOW_RESIZABLE | FLAG_VSYNC_HINT | FLAG_MSAA_4X_HINT);

    InitWindow(win_screen.x, win_screen.y, "HiTam");
    SetTargetFPS(30);

    loadEverything();
    while (!WindowShouldClose()) {
        BeginTextureMode(rt_buffer);
        {
         render();
        };
         EndTextureMode();
        BeginDrawing();
      {

         float scale = fmin(
            (float)GetScreenWidth()/rt_buffer.texture.width,
            (float)GetScreenHeight()/rt_buffer.texture.height
          );

        DrawTexturePro(
          rt_buffer.texture,
          (Rectangle){0.0f, 0.0f, rt_buffer.texture.width, -rt_buffer.texture.height},
          (Rectangle){
                      (GetScreenWidth() - (rt_buffer.texture.width*scale))*0.5f,
                      (GetScreenHeight() - (rt_buffer.texture.height*scale))*0.5f,
                      rt_buffer.texture.width*scale, rt_buffer.texture.height*scale
        }, (Vector2){0.0f, 0.0f}, 0.0f, WHITE);
      }

      EndDrawing();
    }
    unloadEverything();
    CloseWindow();
    return 0;
}

void loadEverything () {
  rt_buffer = LoadRenderTexture(win_screen.x, win_screen.y);
  SetTextureFilter(rt_buffer.texture, TEXTURE_FILTER_POINT);
}

void unloadEverything () {  
  UnloadRenderTexture(rt_buffer);
}
1. `RenderTexture rt_buffer;` adalah objek RenderTexture yang akan 
digunakan untuk merender konten sebelum menampilkannya di jendela utama. 
Ini digunakan untuk mengubah ukuran dan skala konten sebelum rendering ke layar.

2. `SetConfigFlags(FLAG_WINDOW_RESIZABLE | FLAG_VSYNC_HINT | FLAG_MSAA_4X_HINT);`
mengatur konfigurasi jendela dengan mengaktifkan tiga opsi: 
jendela dapat diubah ukurannya oleh pengguna, mengaktifkan V-Sync, dan
mengaktifkan anti-aliasing (MSAA 4x).

3. `BeginTextureMode(rt_buffer);` memulai proses merender konten
ke RenderTexture `rt_buffer`.

4. Di dalam blok `BeginTextureMode`, fungsi `render();` dipanggil.
Ini adalah tempat di mana konten sebenarnya dirender ke RenderTexture.

5. `EndTextureMode();` mengakhiri proses merender ke RenderTexture 
dan memungkinkan Anda untuk menggunakan RenderTexture sebagai tekstur.


6. Di dalam blok `BeginDrawing`, program menghitung faktor skala
(variabel `scale`) yang digunakan untuk menentukan seberapa besar 
RenderTexture harus diperbesar atau diperkecil agar cocok di jendela.

7. `DrawTexturePro()` digunakan untuk menggambar RenderTexture ke jendela utama.
Ini adalah tempat di mana scaling sesungguhnya terjadi. 
Perhatikan penggunaan `rt_buffer.texture` sebagai sumber tekstur, dan 
pemilihan Rectangle yang sesuai untuk mengatur area gambar.



