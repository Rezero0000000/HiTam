#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>
#include <string.h>
#include "./include/raylib.h"

// Function
void unloadEverything ();
void render ();
void logic ();
void loadEverything ();

// Constant
#define FRICTION 0.7
#define SPEED 15.0f
#define JUMP_POWER 300.0f

// Struct
typedef struct Player {
  Rectangle player_rect;
  Texture2D player_t;
  Vector2 player_p;
} Player;

typedef struct animations {
  char name[100];
  Vector2 frame[10];
} animations;

animations shadow_anim[4] = {
  {"idle-left",  {{0, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0}}},
  {"walk-left",  {{0, 1}, {1, 1}, {2, 1}, {3, 1}, {4, 1}, {5, 1}, {6, 1}, {7, 1}}},
  {"idle-right", {{0, 2}, {1, 2}, {2, 2}, {3, 2}, {4, 2}, {5, 2}, {6, 2}, {7, 2}}},
  {"walk-right", {{0, 3}, {1, 3}, {2, 3}, {3, 3}, {4, 3}, {5, 3}, {6, 3}, {7, 3}}},
};

// Variable
Color myColor = {0x1D, 0x21, 0x2D, 255};
Vector2 win_screen = (Vector2){900.0f, 800.0f};
int gravity = 5.0f;
int vel_y = 0;
bool isJump;

Texture map;
Player *shadow;
RenderTexture rt_buffer;
int framesCounter = 0;
int framesSpeed = 8; 
int currentFrameCounter = 0;

bool up, down, left, right;
int y;
int x = 0;

char currentAnimation[100]  = "idle-left";
Vector2 currentFrame[10];


// ----------------================  [ Main FUnction ] ================------------------------

int main() {
    x = 0;

    // Window
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


// ----------------================  [ Memory ] ================------------------------


void loadEverything () {
  rt_buffer = LoadRenderTexture(win_screen.x, win_screen.y);
  SetTextureFilter(rt_buffer.texture, TEXTURE_FILTER_POINT);
  
  map = LoadTexture("prototype.png");

  shadow =(Player *) malloc(sizeof(Player));
  shadow->player_t = LoadTexture("./images/Shadow.png");
  shadow->player_p = (Vector2){1.5f, 400.0f};
  shadow->player_rect = (Rectangle) {0.0f, 0.0f, (float) shadow->player_t.width / 8 , (float) shadow->player_t.height / 4};

  y = 0;
}

void unloadEverything () {  
  UnloadRenderTexture(rt_buffer);
  UnloadTexture(map);
  UnloadTexture(shadow->player_t);
  free(shadow);
}


// ----------------================  [ Game Logic ] ================------------------------

void logic() {

  // Animation
  
  for (int i = 0; i < 4; i++) {
    if (strcmp(shadow_anim[i].name, currentAnimation) == 0) {
        for (int j = 0; j < 8; j++) {
            currentFrame[j] = shadow_anim[i].frame[j];
        }
        break;
    }
  }

  framesCounter++;

  if (framesCounter >= (35/framesSpeed)){


    framesCounter = 0;
    if (currentFrameCounter > 7) currentFrameCounter = 0; 

//    printf("status: %s, x: %f,  y: %f\n",currentAnimation, currentFrame[currentFrameCounter].x , currentFrame[currentFrameCounter].y);
    shadow->player_rect = (Rectangle) {
      (float) shadow->player_t.width / 8 * (float) currentFrame[currentFrameCounter].x,(float) shadow->player_t.height / 4 * ( float) currentFrame[currentFrameCounter].y,
      (float) shadow->player_t.width / 8 , (float) shadow->player_t.height / 4
    };

    currentFrameCounter++;
  }


  // Controll
  
  if (shadow->player_p.y <= win_screen.y - (float) (shadow->player_t.height / 4) - 110) {
    vel_y += gravity;
  } else {
    vel_y = 0;
  }

  if (IsKeyDown(KEY_D)) {
    shadow->player_p.x += SPEED;
    strcpy(currentAnimation, "idle-left");
  }
  if (IsKeyDown(KEY_A)) {
    shadow->player_p.x -= SPEED;
    strcpy(currentAnimation, "idle-right");
  }
  if (IsKeyPressed(KEY_W)) {
    vel_y = -50;
    printf("%s: %f, %f\n",currentAnimation, currentFrame[1].x, currentFrame[1].y);
  } 

  shadow->player_p.y += vel_y;
}


// ----------------================  [ Game Render ] ================------------------------

void render () {
  ClearBackground(myColor); 
  DrawTexture(map, 0, win_screen.y - map.height, WHITE); 
  DrawTextureRec(shadow->player_t, shadow->player_rect, shadow->player_p, WHITE);
}
