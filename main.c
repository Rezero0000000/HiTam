
#include "./include/raylib.h"

typedef struct Player {
  Texture2D player_t;
  Vector2 player_p;
} Player;

void unloadEverything ();

void loadEverything () {

}

int main() {
    int screenWidth = 800;
    int screenHeight = 800;

    Color myColor = {0x1D, 0x21, 0x2D, 255};
    InitWindow(screenWidth, screenHeight, "HiTam");

    Texture2D map = LoadTexture("prototype.png");
    SetTargetFPS(60);

    while (!WindowShouldClose()) {
        BeginDrawing();
        ClearBackground(myColor); 
        DrawTexture(map, 0, screenHeight - map.height, WHITE);
        EndDrawing();
    }

    UnloadTexture(map);
    CloseWindow();

    return 0;
}



