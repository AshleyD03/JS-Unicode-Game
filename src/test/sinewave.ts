export async function main ({
	update, newSprite, newSlide, sleep
}: Package) {
	// 72 x 35 
	const main = newSlide();
	for (let i=0; i<72; i++) {
		main.addSprite(newSprite({
			x: i,
			texture: ['@']
		}))
	}
	
	let isOn = true;
	let isForward = true;
	let i = 0;

	async function sinewave () {
		while (isOn) {
			main.sprites.forEach(sprite => {
				const y = Math.round((Math.sin((sprite.x + i) / 20 ) + 1) * 17)
				sprite.y = y
			})
			isForward ? i++ : i -= 1;
			update(main)
			await sleep(5)
		}
	}

	main.addListener('p', () => {
		isOn = !isOn;
		if (isOn) sinewave()
	})

	main.addListener('r', () => isForward = !isForward)
	
	sinewave()
}