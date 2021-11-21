export async function main({ update, newSprite, newSlide, sleep, colors }: Package) {
  // 72 x 35
  const main = newSlide();
  const line: Sprite[] = [];
  for (let i = 0; i < 35; i++) {
    const sprite = newSprite({
      y: i,
      texture: ["@@@@"],
      color: "rgb(0 29 8)",
    });
    line.push(sprite);
    main.addSprite(sprite);
  }

  main.addSprite(
    newSprite({
      x: 1,
      y: 1,
      texture: ["Rainbow", "By: Ashley"],
      color: "white",
      noClip: true,
    })
  );

  
  let i = 0;
  let isOn = true;
  let isForward = true;
  let amp = 25;
  let wavelength = 10;
  let textWidth = 3;

  main.addSprite(
    newSprite({
      x: 1,
      y: 23,
      texture: [
        "-= Settings =-",
        "",
        () => `Amplitude : ${amp} (+1/-2)`,
        "",
        () => `Wavelength : ${wavelength} (+3/-4)`,
        "",
        () => `Text Width : ${textWidth} (+5/-6)`,
        "",
        "Pause (p)",
        "",
        "Reverse (r)"
      ],
      color: "grey",
      noClip: true,
    })
  );

  main.addListener("1", () => {
    amp++
    update(main)
  });
  main.addListener("2", () => {
    if (amp > 0) amp -= 1;
    update(main);
  });
  main.addListener("3", () => {
    wavelength++
    update(main)
  });
  main.addListener("4", () => {
    if (wavelength > 0) wavelength -= 1;
    update(main);
  });
  main.addListener("5", () => {
    textWidth++
    update(main)
  });
  main.addListener("6", () => {
    if (textWidth > 0) textWidth -= 1;
    update(main);
  });

  async function sinewave() {
    while (isOn) {
      const color = colors[Math.abs(i) % colors.length];
      line.forEach((sprite) => {
        const x = Math.round(Math.sin((sprite.y + i) / wavelength) * amp);
        sprite.x = x + 60 - amp;
        sprite.color = color;
        sprite.texture = ["@".repeat(textWidth)];
      });
      isForward ? i++ : (i -= 1);
      update(main);

      //amp = Math.round((Math.sin(i / 50) - 1) * -15);
      await sleep(10);
    }
  }

  main.addListener("p", () => {
    isOn = !isOn;
    if (isOn) sinewave();
  });

  main.addListener("r", () => (isForward = !isForward));

  sinewave();
}
