import "./Types.d.ts"
import "./style/index.scss"

import { newSlide, newSprite, initCanvasUpdate } from "./modules/canvas"

const canvas = Array.from(document.getElementsByTagName('textarea'))[0];
const update = initCanvasUpdate(canvas);