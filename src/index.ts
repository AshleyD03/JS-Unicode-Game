import "./Types.d.ts"
import "./style/index.scss"

import { newSlide, newSprite, initCanvasUpdate, sleep } from "./modules/canvas"
import { main } from "./test/move_sprite";

const canvas = Array.from(document.getElementsByTagName('textarea'))[0];
const update = initCanvasUpdate(canvas);

main({
	update,
	newSprite,
	newSlide,
	sleep
})