declare global {
  interface Sprite {
    texture: Array<String>;
    x: number;
    y: number;
    slide: Slide;
  }

  interface Slide {
    sprites: Array<Sprite>;
    listeners: Array<KeyEventListener>;
    storage: {
      [key: string]: string | null;
    };
    active: boolean;
    addListener: (key: String, func: (e: KeyEvent) => void) => KeyEventListener;
    removeListener: (listener: KeyEventListener) => boolean;
    addSprite: (sprite: Sprite, index?: number) => Sprite;
    removeSprite: (sprite: Sprite, index?: number) => boolean;
  }

  interface KeyEvent extends KeyboardEvent {
    slide: Slide;
  }

  interface KeyEventListener {
    key: String;
    func: (e: KeyEvent) => void;
  }

  interface Package {
    update: (slide: Slide) => void;
    newSprite: (prev?: Optional<Sprite>) => Sprite;
    newSlide: () => Slide;
    sleep: (milisecs: number) => Promise<void>;
  }

  type Optional<T> = { [K in keyof T]?: T[K] };
}
export type _ = null;
