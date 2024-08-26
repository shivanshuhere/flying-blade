import kaplay from "kaplay";
import { appWindow } from "@tauri-apps/api/window";
import { makeBg } from "./utils";
import { SCALE_FACTOR } from "./const";

const k = kaplay({
  width: 1280,
  height: 720,
  letterbox: true,
  global: false,
  scale: 2,
});

k.loadSprite("naruto", "assets/naruto.png");
k.loadSprite("vil", "assets/konoha.jpg");
k.loadSprite("shuriken", "assets/shuriken.png");

addEventListener("keydown", async (e) => {
  if (e.key == "F11") {
    (await appWindow.isFullscreen())
      ? await appWindow.setFullscreen(false)
      : await appWindow.setFullscreen(true);
  }
});

// menu scene
k.scene("start", async () => {
  makeBg(k);

  //parent
  const map = k.add([k.sprite("vil"), k.pos(-70, -150), k.scale(SCALE_FACTOR)]);
});

k.scene("main", async () => {
  //child of map
  const shuriken = map.add([
    k.sprite("shuriken"),
    k.pos(400, 180),
    // k.pos(k.center()),
    k.scale(0.05),
    {
      speed: 7,
    },
    k.rotate(0),
    k.anchor("center"),
  ]);

  // spining animation
  shuriken.onUpdate(() => {
    shuriken.rotateBy(5);
  });

  // movement
  const SPEED = 250;

  const player = map.add([
    k.sprite("naruto"),
    k.pos(10, 333),
    k.scale(0.19),
    // k.body(),
  ]);
  k.onKeyDown("left", () => {
    player.move(-SPEED, 0);
  });

  k.onKeyDown("right", () => {
    player.move(SPEED, 0);
  });

  k.setGravity(1500);
  // k.onKeyDown("space", () => {
  //   player.jump();
  // });
});

k.go("start");
