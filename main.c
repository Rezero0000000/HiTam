#include <stdio.h>
#include "./include/raylib.h"
#include <stdlib.h>
// function
void unloadEverything ();
void render ();
void logic ();
void loadEverything ();

// Variable
#define GRAVITY 0.5
#define FRICTION 0.7

Color myColor = {0x1D, 0x21, 0x2D, 255};
int screenWidth = 800;
int screenHeight = 800;

typedef struct Player {
  Texture2D player_t;
  Vector2 player_p;
} Player;

Texture map;
Player *shadow;

int main() {
    SetConfigFlags(FLAG_WINDOW_RESIZABLE | FLAG_VSYNC_HINT | FLAG_MSAA_4X_HINT);

    InitWindow(screenWidth, screenHeight, "HiTam");
    SetTargetFPS(30);

    loadEverything();
    while (!WindowShouldClose()) {
        logic ();
        BeginDrawing();
        render();
        EndDrawing();
    }
    
    unloadEverything();
    CloseWindow();

    return 0;
}

void loadEverything () {
  map = LoadTexture("prototype.png");

  shadow =(Player *) malloc(sizeof(Player));
  shadow->player_t = LoadTexture("./images/Shadow.png");
  shadow->player_p = (Vector2){1.5, screenHeight - shadow->player_t.height};
}

void unloadEverything () {
  UnloadTexture(map);
  UnloadTexture(shadow->player_t);
  free(shadow);
}

void logic() {

}

void render () {
  ClearBackground(myColor); 
  DrawTexture(map, 0, screenHeight - map.height, WHITE);  

  DrawTexture(shadow->player_t, shadow->player_p.x, shadow->player_p.y, WHITE);
}





