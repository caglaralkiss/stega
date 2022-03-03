import { extract, inject } from '../index'

describe('Stega', () => {
	test('should inject source content to target by replacing LSB of each target byte', () => {
		const sourceBuff = Buffer.from([0b01100101, 0b00000101])
		const targetBuff = Buffer.from([
			0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000,
			0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000,
			0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000,
			0b00000000, 0b00000000, 0b00000000,
		])

		const resultBuff = Buffer.from([
			0b00000000, 0b00000001, 0b00000001, 0b00000000, 0b00000000,
			0b00000001, 0b00000000, 0b00000001, 0b00000000, 0b00000000,
			0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000001,
			0b00000000, 0b00000001, 0b00000001,
		])

		expect(inject(sourceBuff, targetBuff)).toEqual(resultBuff)
	})

	test('should throw error when target buffer length is not enough for source steganography', () => {
		const sourceBuff = Buffer.from([0xfe])
		const targetBuff = Buffer.from([
			0xff, 0xf1, 0xa9, 0xff, 0xf1, 0xa9, 0xf3, 0x21,
		])

		expect(() => inject(sourceBuff, targetBuff)).toThrowError()
	})

	test('should extract original buffer from stego buffer', () => {
		const stegoBuff = Buffer.from([
			0b00000000, 0b00000001, 0b00000001, 0b00000000, 0b00000000,
			0b00000001, 0b00000000, 0b00000001, 0b00000000, 0b00000000,
			0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000001,
			0b00000000, 0b00000001, 0b00000001,
		])


		const originalBuff = Buffer.from([0b01100101, 0b00000101])

		expect(extract(stegoBuff)).toEqual(originalBuff)
	})
})
