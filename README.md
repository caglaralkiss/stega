# stega
Hides data inside another data and extract the hidden data from stego data.
Stega changes least significant bits of target bytes and create a stego buffer as a result.

## Installation

Use the package manager [npm](npmjs.com/package/stega) to install stega.

```bash
npm install stega
```

## Usage

```javascript
import { inject, extract } from 'stega'

const sourceBuffer = Buffer.from([0xFE])
const targetBuffer = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])

const stegoBuffer = inject(sourceBuffer, targetBuffer)
// stegoBuffer is 0x01 0x01 0x01 0x01 0x01 0x01 0x01 0x00 0x01
// last byte used as flag to determine whether hidden messages are finished or continued(0 for finish, 1 for cont.)

const extractedBuffer = extract(stegoBuffer)
// extractedBuffer is 0xFE, which is the source buffer

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](./LICENSE)
