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

k.loadSprite("naruto", "assets/naruto-pixel.png");
k.loadSprite("vil", "assets/konoha.jpg");
k.loadSprite("konoha", "assets/konoha-start.jpg");
k.loadSprite("shuriken", "assets/shuriken.png");

addEventListener("keydown", async (e) => {
  if (e.key == "F11") {
    (await appWindow.isFullscreen())
      ? await appWindow.setFullscreen(false)
      : await appWindow.setFullscreen(true);
  }
});
// load fonts
k.loadFont("bonge", "assets/fonts/BungeeTint-Regular.ttf");

// menu scene
k.scene("start", async () => {
  makeBg(k);

  //parent
  const map = k.add([k.sprite("konoha"), k.pos(0, 0)]);

  map.add([
    k.text("FLYING BLADES", {
      size: 100,
      font: "bonge",
    }),
    k.pos(250, 280),
  ]);

  const subtitle = map.add([
    k.text("Press Enter to Start!", {
      size: 48,
      font: "monospace",
    }),
    k.pos(250, 380),
  ]);

  k.onKeyDown("enter", () => {
    k.go("main");
  });
});

// main scene
k.scene("main", async () => {
  const map = k.add([k.sprite("vil"), k.pos(-70, -170), k.scale(SCALE_FACTOR)]);

  //child of map
  let x = 100;
  let y = 100;
  const shuriken = map.add([
    k.sprite("shuriken"),
    k.pos(x, y),
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
    shuriken.rotateBy(7);
    y += 2;
    // while (true) {
    //   if (shuriken.pos.y < 460) {
    //     shuriken.pos.y = y;
    //   } else {
    //     shuriken.pos.y = 100;
    //   }
    // }
  });

  // movement
  const SPEED = 250;

  const player = map.add([
    k.sprite("naruto"),
    k.pos(70, 340),
    k.scale(0.1),
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

k.go("main");
