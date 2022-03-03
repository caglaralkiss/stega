import { extract, inject } from '../index'

describe('Stega', () => {
	test('should inject source content to target by replacing LSB of each target byte', () => {
		const sourceBuff = Buffer.from([0b01100101, 0b00000101])
		const targetBuff = Buffer.from([
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000
		])

		const resultBuff = Buffer.from([
			0b00000000,
			0b00000001,
			0b00000001,
			0b00000000,
			0b00000000,
			0b00000001,
			0b00000000,
			0b00000001,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000001,
			0b00000000,
			0b00000001,
			0b00000001
		])

		expect(inject(sourceBuff, targetBuff)).toEqual(resultBuff)
	})

	test('should throw error when target buffer length is not enough for source steganography', () => {
		const sourceBuff = Buffer.from([0xFE])
		const targetBuff = Buffer.from([0xFF, 0xF1, 0xA9, 0xFF, 0xF1, 0xA9, 0xF3, 0x21])

		expect(() => inject(sourceBuff, targetBuff)).toThrowError()
	})

	test('should extract original buffer from stego buffer', () => {
		const stegoBuff = Buffer.from([
			0b00000000,
			0b00000001,
			0b00000001,
			0b00000000,
			0b00000000,
			0b00000001,
			0b00000000,
			0b00000001,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000000,
			0b00000001,
			0b00000000,
			0b00000001,
			0b00000001
		])

		console.log('stegoBuff', extract(stegoBuff))

		const originalBuff = Buffer.from([0b01100101, 0b00000101])
		console.log('origiBuff', originalBuff)
		expect(extract(stegoBuff)).toEqual(originalBuff)
	})
})
