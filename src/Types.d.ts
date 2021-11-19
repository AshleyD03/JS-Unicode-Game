declare global {
  interface Sprite {
    texture: Array<String>;
    x: number;
    y: number;
  }

  interface Slide {
    spriteStack: Array<Sprite>;
    listeners: Array<GameEventListener>;
    storage: {
      [key: string]: string | null;
    };
    addListener: (key: String, func: (e: GameEvent) => void) => void,
    addSprite: (sprite: Sprite, index?: number) => void
  }

  interface GameEvent extends Event {
    gameKey: String;
    slide: Slide;
  }

  interface GameEventListener {
    key: String;
    func: (e: GameEvent) => void;
  }
}
export type _ = null;
