#include <stdio.h>
#include "./include/raylib.h"
#include <stdlib.h>
#include <stdbool.h>

// function
void unloadEverything ();
void render ();
void logic ();
void loadEverything ();

// Variable
#define VELOCITY_Y 2.0;
#define FRICTION 0.7
#define SPEED 2.0f
#define JUMP_POWER 50.0f

Color myColor = {0x1D, 0x21, 0x2D, 255};
int screenWidth = 800;
int screenHeight = 800;
int gravity = 2.0f;

typedef struct Player {
  Rectangle player_rect;
  Texture2D player_t;
  Vector2 player_p;
} Player;

Texture map;
Player *shadow;

bool up, down, left, right;

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
  shadow->player_p = (Vector2){1.5f, 400.0f};
  shadow->player_rect = (Rectangle) {0.0f, 0.0f, (float) shadow->player_t.width / 8, (float) shadow->player_t.height / 4};
}

void unloadEverything () {
  UnloadTexture(map);
  UnloadTexture(shadow->player_t);
  free(shadow);
}

void logic() {

  if (shadow->player_p.y <= screenHeight - shadow->player_t.height) {
    gravity += VELOCITY_Y;
    shadow->player_p.y += gravity;
  }

  if (IsKeyDown(KEY_D)) {
    shadow->player_p.x += SPEED;
  }
  if (IsKeyDown(KEY_A)) {
    shadow->player_p.x -= SPEED;
  }
  if (IsKeyDown(KEY_W)) {
    shadow->player_p.y -= SPEED;
  }
}

void render () {
  ClearBackground(myColor); 
  DrawTexture(map, 0, screenHeight - map.height, WHITE);  
  DrawTextureRec(shadow->player_t, shadow->player_rect, shadow->player_p, WHITE);
}





