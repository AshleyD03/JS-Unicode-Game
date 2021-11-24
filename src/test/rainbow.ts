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
  let amp = 10;
  let wavelength = 10;
  let textWidth = 3;
  let freq = 10;

  main.addSprite(
    newSprite({
      x: 1,
      y: 22,
      texture: [
        "-= Settings =-",
        "",
        () => `Amplitude : ${amp} (+1/-2)`,
        "",
        () => `Wavelength : ${wavelength} (+3/-4)`,
        "",
        () => `Text Width : ${textWidth} (+5/-6)`,
        "",
        () => `Render Freq : ${freq} (+7/-8)`,
        "",
        "Pause (p) Reverse (r)"
      ],
      color: "grey",
      noClip: true,
    })
  );

  main.addListener("1", () => {
    amp++
    waveGen()
  });
  main.addListener("2", () => {
    if (amp > 0) amp -= 1;
    waveGen()
  });
  main.addListener("3", () => {
    wavelength++
    waveGen()
  });
  main.addListener("4", () => {
    if (wavelength > 0) wavelength -= 1;
    waveGen()
  });
  main.addListener("5", () => {
    textWidth++
    waveGen()
  });
  main.addListener("6", () => {
    if (textWidth > 0) textWidth -= 1;
    waveGen()
  });
  main.addListener("7", () => {
    freq++;
  });
  main.addListener("8", () => {
    if (freq > 1) freq -= 1;
    waveGen()
  });


  function sinveWave (sprite: Sprite, i: number) {
    return Math.round(Math.sin((sprite.y + i) / wavelength) * amp);
  }
  function tanWave (sprite: Sprite, i: number) {
    return Math.round(Math.tan((sprite.y + i) / wavelength) * amp);
  }
  function triangleWave (sprite: Sprite, i: number) {
    i = ((i + sprite.y) * 200 / wavelength) % (2 * amp);
    return Math.round((amp - i) * ((-1) ** (Math.floor(i / amp)))) | 0
  }

  function waveGen () {
    const color = colors[Math.abs(Math.round(i * freq)) % colors.length];
      let x: number;
      line.forEach((sprite) => {
        x =  tanWave(sprite, i)
        console.log(x)
        sprite.x = x + 60 - amp;
        sprite.color = color;
        sprite.texture = ["#".repeat(Math.ceil(textWidth / 3))];
      });
      
      beep(50,  x * 100 + 1000, textWidth * 5)
      update(main);
  }

  let a=new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em

  function beep(vol: number, freq: number, duration: number){
    let v=a.createOscillator()
    let u=a.createGain()
    v.connect(u)
    v.frequency.value=freq
    v.type="square"
    u.connect(a.destination)
    u.gain.value=vol*0.01
    v.start(a.currentTime)
    v.stop(a.currentTime+duration*0.001)
  }

  async function runWave() {
    while (isOn) {
      waveGen()
      isForward ? i += 1 / freq : (i -= 1 / freq);
      amp = Math.abs(Math.round((Math.tan(i / 50)) * 20)) + 20
      //wavelength = Math.round((Math.tan(i / 100) - 1) * -1);
      await sleep(0);
    }
  }

  main.addListener("p", () => {
    isOn = !isOn;
    if (isOn) runWave();
  });

  main.addListener("r", () => (isForward = !isForward));

  runWave();
}
