export const newSlide = (): Slide => {
  const slide: Slide = {
    sprites: [],
    listeners: [],
    storage: {},
    active: false,
    addListener: (key, func) => {
      // Add listener
      const listener: KeyEventListener = {
        key: key,
        func: func,
      };
      if (slide.listeners.includes(listener)) return listener;
      // Add listener to this slide
      slide.listeners.push(listener);
      if (slide.active) {
        document.addEventListener("keydown", (e) => {
          if (e.key === key)
            func({
              slide: slide,
              ...e,
            });
        });
      }
      return listener;
    },
    removeListener: (listener) => {
      // Check if listener on slide
      const index = slide.listeners.indexOf(listener);
      if (!index) return false;
      return true;
    },
    addSprite: (sprite, index = null) => {
      // If no index, use last
      if (!index) index = slide.sprites.length;
      // Remove sprite from other slides
      if (sprite.slide) {
        sprite.slide.removeSprite(sprite);
      }
      // Add sprite to this slide
      slide.sprites[index] = sprite;
      sprite.slide = slide;
      return sprite;
    },
    removeSprite: (sprite, index = null) => {
      // If no index find index
      if (!index) {
        for (let i1 = 0; i1 < slide.sprites.length; i1++) {
          const i2 = slide.sprites.length - i1 - 1;
          if (slide.sprites[i2] === sprite) index = i2;
        }
      }
      if (!index) return false;
      // Remove sprite at that index
      slide.sprites.splice(index);
      return true;
    },
  };
  return slide;
};

export const newSprite = (prev?: Sprite): Sprite => {
  return {
    texture: [],
    x: 0,
    y: 0,
    slide: null,
    ...prev,
  };
};

export const initCanvasUpdate = (target: HTMLPreElement) => {
  let currentSlide = newSlide();
  currentSlide.active = true;

  return (slide: Slide) => {
    // 72 x 35
    const map = Array.from({ length: 36 }, () => [
      ...Array.from({ length: 72 }, () => " "),
      "\n",
    ]);

    // Handle the slide changing
    if (currentSlide !== slide) {
      // Remove different slide listeners
      currentSlide.listeners.forEach((listener) =>
        document.removeEventListener("keydown", listener.func)
      );
      currentSlide.active = false;

      // Add listeners for next slide
      slide.listeners.forEach((listener) =>
        document.addEventListener("keydown", (e) => {
          if (e.key === listener.key)
            listener.func({
              slide: slide,
              ...e,
            });
        })
      );

      slide.active = true;
      currentSlide = slide;
    }

    // Apply sprites to map
    slide.sprites.forEach((sprite) => {
      for (let y = 0; y < sprite.texture.length; y++) {
        
        let line = sprite.texture[y];
        if (typeof line == "function") line = line();

        for (let x = 0; x < line.length; x++) {
          const yCord = sprite.y + y;
          if (yCord > map.length) return
          const xCord = sprite.x + x;
          let text = line[x];

          if (sprite.noClip && text === " ") text = map[yCord][xCord];

          map[yCord][xCord] = `<font color="${sprite.color}">${text}</font>`;
          
        }
      }
    });

    // Push map to canvas
    target.innerHTML = "";
    map.forEach((row) => {
      target.innerHTML += row.slice(0, 72).join("") + "\n";
    });
  };
};

export const sleep = async (milisecs: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(function () {
      res();
    }, milisecs);
  });
};

export const colors = [
  "#ff0000",
  "#ff8000",
  "#ffff00",
  "#80ff00",
  "#00ff00",
  "#00ff80",
  "#00ffff",
  "#0080ff",
  "#0000ff",
  "#8000ff",
  "#ff00ff",
  "#ff0080",
];
