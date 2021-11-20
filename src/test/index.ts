export async function main ({
	update, newSprite, newSlide, sleep
}: Package) {

	// 69 x 32 
	const main = newSlide();
	const sprite = newSprite({
		x: 1,
		y: 1,
		texture: [
			'@@@@',
			'@@@@',
			'@@@@'
		]
	})

	main.addSprite(sprite)
	update(main)

	main.addListener('w', () => {
		if (sprite.y > 0) sprite.y -= 1
		update(main)
	})
	main.addListener('a', () => {
		if (sprite.x > 0) sprite.x -= 1
		update(main)
	})
	main.addListener('s', () => {
		if (sprite.y < 32) sprite.y += 1
		update(main)
	})
	main.addListener('d', () => {
		if (sprite.x < 71) sprite.x += 1
		update(main)
	})
}