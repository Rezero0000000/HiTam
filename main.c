#include "./include/raylib.h"

typedef struct Player {
  Texture2D player_t;
  Vector2 player_p;
} Player;

Texture map;

void unloadEverything ();
void loadEverything () {
  map = LoadTexture("prototype.png");
}

#define GRAVITY 0.5;
#define FRICTION 0.7;

int main() {
    int screenWidth = 800;
    int screenHeight = 800;

    Color myColor = {0x1D, 0x21, 0x2D, 255};
    InitWindow(screenWidth, screenHeight, "HiTam");

    SetTargetFPS(60);

    while (!WindowShouldClose()) {
        BeginDrawing();
        ClearBackground(myColor); 
        DrawTexture(map, 0, screenHeight - map.height, WHITE);
        EndDrawing();
    }
    
    unloadEverything();
    CloseWindow();

    return 0;
}

void unloadEverything () {
  UnloadTexture(map);
}

