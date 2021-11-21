import "./Types.d.ts"
import "./style/index.scss"

import { newSlide, newSprite, initCanvasUpdate, sleep, colors } from "./modules/canvas"
import { main } from "./test/rainbow";

const canvas = Array.from(document.getElementsByTagName('pre'))[0];
const update = initCanvasUpdate(canvas);

main({
	update,
	newSprite,
	newSlide,
	sleep,
	colors
})