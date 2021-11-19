export const newSlide = (): Slide => {
  const slide: Slide = {
    spriteStack: [],
    listeners: [],
    storage: {},
    addListener: (key, func) => {
      slide.listeners.push({
        key: key,
        func: func,
      });
    },
    addSprite: (sprite, index) => {
      if (!index) index = slide.spriteStack.length - 1;
      slide.spriteStack[index] = sprite;
    },
  };
  return slide;
};

export const newSprite = (prev?: Sprite): Sprite => {
  return {
    texture: [],
    x: 0,
    y: 0,
    ...prev,
  };
};

export const initCanvasUpdate = (target: HTMLTextAreaElement) => {
  let currentSlide = newSlide()

  return (slide: Slide) => {
    // 69 x 32
    const map = Array.from({ length: 32 }, () =>
      Array.from({ length: 69 }, () => " ")
    );

    // Handle the slide changing
    if (currentSlide !== slide) {
      // Remove different slide listeners
      currentSlide.listeners.forEach((listener) =>
        document.removeEventListener("keydown", listener.func)
      );

      // Add listeners for next slide
      slide.listeners.forEach((listener) =>
        document.addEventListener("keydown", listener.func)
      );
      currentSlide = slide;
    }

    // Apply sprites to map
    slide.spriteStack.forEach((sprite) => {
      for (let y = 0; y < sprite.texture.length; y++) {
        const line = sprite.texture[y];
        for (let x = 0; x < line.length; x++) {
          map[sprite.y + y][sprite.x + x] = line[x];
        }
      }
    });

    // Push map to canvas
    target.value = map.join();
  };
};