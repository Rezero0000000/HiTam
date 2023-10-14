#include <stdio.h>
#include "./include/raylib.h"
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>

// function
void unloadEverything ();
void render ();
void logic ();
void loadEverything ();

// Variable
#define FRICTION 0.7
#define SPEED 15.0f
#define JUMP_POWER 300.0f

Color myColor = {0x1D, 0x21, 0x2D, 255};
Vector2 win_screen = (Vector2){900.0f, 800.0f};
int gravity = 5.0f;
int vel_y = 0;
bool isJump;

typedef struct Player {
  Rectangle player_rect;
  Texture2D player_t;
  Vector2 player_p;
} Player;

typedef struct animationFrame {
  char name[100];
  int animation[4][8][2];
} animationFrame;

typedef struct animations {
  char name[100];
  Vector2 frame[10];

} animations;

Texture map;
Player *shadow;
animationFrame *shadow_animation;
RenderTexture rt_buffer;
int framesCounter = 0;
int framesSpeed = 8; 

int animation[4][8][2] = {
  {{0, 0}, {1, 0}, {2, 0}, {3, 0}}, 
  {{0, 1}, {1, 1}, {2, 1}, {3, 1}},
  {{0, 2}, {1, 2}, {2, 2}, {3, 2}},
  {{0, 3}, {1, 3}, {2, 3}, {3, 3}}
};

bool up, down, left, right;
int y;
int x = 0;

animations shadow_anim[4] = {
  {"idle-left",  {{0, 0}, {1, 0}, {2, 0}, {3, 0}}},
  {"walk_left",  {{0, 1}, {1, 1}, {2, 1}, {3, 1}}},
  {"idle_rigth", {{0, 2}, {1, 2}, {2, 2}, {3, 2}}},
  {"walk_right", {{0, 3}, {1, 3}, {2, 3}, {3, 3}}},
};

Vector2 idle_left[4] = {{0, 0}, {1, 0}, {2, 0}, {3, 0}};
Vector2 idle_rigth[4] = {{0, 1}, {1, 1}, {2, 1}, {3, 1}};
Vector2 walk_left[4] = {{0, 2}, {1, 2}, {2, 2}, {3, 2}};
Vector2 walk_right[4] = {{0, 3}, {1, 3}, {2, 3}, {3, 3}};

int main() {
  x = 0;
    SetConfigFlags(FLAG_WINDOW_RESIZABLE | FLAG_VSYNC_HINT | FLAG_MSAA_4X_HINT);
    InitWindow(win_screen.x, win_screen.y, "HiTam");
    SetTargetFPS(30);

    loadEverything();
    while (!WindowShouldClose()) {
        logic ();
        BeginTextureMode(rt_buffer);
        {
         render();
        };
         EndTextureMode();
        BeginDrawing();
      {

        ClearBackground(myColor); 
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
  
  map = LoadTexture("prototype.png");

  shadow =(Player *) malloc(sizeof(Player));
  shadow->player_t = LoadTexture("./images/Shadow.png");
  shadow->player_p = (Vector2){1.5f, 400.0f};
  shadow->player_rect = (Rectangle) {0.0f, 0.0f, (float) shadow->player_t.width / 8, (float) shadow->player_t.height / 4};

  y = 0;
}

void unloadEverything () {  
  UnloadRenderTexture(rt_buffer);
  UnloadTexture(map);
  UnloadTexture(shadow->player_t);
  free(shadow);
}

void logic() {
  framesCounter++;
  if (framesCounter >= (60/framesSpeed)){
    framesCounter = 0;
 /* if (x >= 4) x = 0;
    printf("%d", x);
    shadow->player_rect.x = 66 * x;
    shadow->player_rect.y = 66 * y;
    x++;
  */
  }

  if (shadow->player_p.y <= win_screen.y - (float) (shadow->player_t.height / 4) - 110) {
    vel_y += gravity;
  } else {
    vel_y = 0;
  }

  if (IsKeyDown(KEY_D)) {
    shadow->player_p.x += SPEED;
  }
  if (IsKeyDown(KEY_A)) {
    shadow->player_p.x -= SPEED;
  }
  if (IsKeyPressed(KEY_W)) {
    vel_y = -50;
  } 

  shadow->player_p.y += vel_y;
}

void render () {
  ClearBackground(myColor); 
  DrawTexture(map, 0, win_screen.y - map.height, WHITE); 
  /*
  if (IsKeyPressed(KEY_SPACE)) {
    printf("%d, %f\n",animation[0][i][0], shadow->player_rect.height);
  }
  */
  DrawTextureRec(shadow->player_t, shadow->player_rect, shadow->player_p, WHITE);
}
