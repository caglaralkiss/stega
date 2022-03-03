/**
 *
 * Inject source content to given target buffer by replacing each LSB of target byte.
 *
 * @param source Injection buffer
 * @param target LSB byte replacing buffer
 * @returns stegoBuffer Target buffer that is replaced each bytes LSB
 */
export function inject(source: Buffer, target: Buffer): Buffer {
	const srcByteLength = Buffer.byteLength(source)
	const targetByteLength = Buffer.byteLength(target)

	if (srcByteLength * 9 > targetByteLength) {
		throw new Error(
			`Target size length must be greater or equal then ${
				srcByteLength * 9
			}`
		)
	}

	let index = 0

	for (let i = 0; i < source.length; i++) {
		for (let j = 7; j >= 0; j--) {
			const lsb = (source[i] >> j) & 0x01

			target[index] = (target[index] & 0xfe) | lsb
			++index
		}

		if (i < source.length - 1) {
			target[index] = (target[index] & 0xfe) | 0
			++index
		} else {
			target[index] = (target[index] & 0xfe) | 1
		}
	}

	return target
}

/**
 *
 * Extract original buffer from given stego buffer
 *
 * @param stego Stego buffer that includes a hidden content in LSB of some byte
 * @returns originalBuffer Buffer that reveals hidden content
 */
export function extract(stego: Buffer): Buffer {
	const lsbArr: Array<Array<number>> = []

	let indexCounter = 0
	let shiftSize = 7
	let byteIndex = 0

	for (const b of stego) {
		if ((indexCounter + 1) % 9 !== 0) {
			if (!lsbArr[byteIndex]) {
				lsbArr.push([])
			}

			lsbArr[byteIndex].push((b & 0x01) << shiftSize)
			--shiftSize
		} else {
			if (b & 0x01) {
				break
			} else {
				shiftSize = 7
				++byteIndex
			}
		}

		++indexCounter
	}

	const bytes = lsbArr
		.map((lsb) => lsb.reduce((acc, curr) => acc + curr, 0))
		.flat()

	return Buffer.from(bytes)
}
