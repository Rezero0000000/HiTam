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
#define GRAVITY 0.5
#define FRICTION 0.7

Color myColor = {0x1D, 0x21, 0x2D, 255};
int screenWidth = 800;
int screenHeight = 800;

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
  shadow->player_p = (Vector2){1.5, screenHeight - shadow->player_t.height};
  shadow->player_rect = (Rectangle) {0.0f, 0.0f, (float) shadow->player_t.width / 8, (float) shadow->player_t.height / 4};
}

void unloadEverything () {
  UnloadTexture(map);
  UnloadTexture(shadow->player_t);
  free(shadow);
}

void logic() {
  
  if (IsKeyDown(KEY_W)) {
    up = true;
  }

  if (IsKeyDown(KEY_S)) {
    down = true;
  }

  if (IsKeyDown(KEY_A)) {
    left = true;
  }
  if (IsKeyDown(KEY_D)) {
    right = true;
  }
  
  if (IsKeyUp(KEY_W)) {
    up = false;
  }
  
  if (IsKeyUp(KEY_S)) {
    down = false;
  }

  if (IsKeyUp(KEY_A)) {
    left = false;
  }

  if (IsKeyUp(KEY_D)) {
    right = false;
  }

  if (up || down || left || right) {
    if (up) {
      shadow->player_p.y += 1.5;
    }
    if (down) {
      shadow->player_p.y -= 1.5;
    }
    if (left) {
      shadow->player_p.x -= 1.5;
    }
    if (right) {
      shadow->player_p.x += 1.5;
    }
  }

}

void render () {
  ClearBackground(myColor); 
  DrawTexture(map, 0, screenHeight - map.height, WHITE);  
  DrawTextureRec(shadow->player_t, shadow->player_rect, shadow->player_p, WHITE);
}





