const brightness = 1;

const DOT = 0.1;
const DASH = DOT * 3;
const PAUSE_ELEMENT = DOT * 1;
const PAUSE_CHARACTER = DOT * 3;
const PAUSE_WORD = DOT * 7;

const CODE_TABLE = {
    'A': '·-',
    'B': '-···',
    'C': '-·-·',
    'D': '-··',
    'E': '·',
    'F': '··-·',
    'G': '--·',
    'H': '····',
    'I': '··',
    'J': '·---',
    'K': '-·-',
    'L': '·-··',
    'M': '--',
    'N': '-·',
    'O': '---',
    'P': '·--·',
    'Q': '--·-',
    'R': '·-·',
    'S': '···',
    'T': '-',
    'U': '··-',
    'V': '···-',
    'W': '·--',
    'X': '-··-',
    'Y': '-·--',
    'Z': '--··',
    '1': '·----',
    '2': '··---',
    '3': '···--',
    '4': '····-',
    '5': '·····',
    '6': '-····',
    '7': '--···',
    '8': '---··',
    '9': '----·',
    '0': '-----',
    '.': '·-·-·-',
    ':': '---···',
    ',': '--··--',
    ';': '-·-·-·',
    '?': '··--··',
    '=': '-···-',
    "'": '·----·',
    '/': '-··-·',
    '!': '-·-·--',
    '-': '-····-',
    '_': '··--·-',
    '"': '·-··-·',
    '(': '-·--·',
    ')': '-·--·-',
    '$': '···-··-',
    '&': '·-···',
    '@': '·--·-·',
    '+': '·-·-·'
}

const device = $objc('AVCaptureDevice').$defaultDeviceWithMediaType('vide');
device.$lockForConfiguration(null);

let text = await $input.text({ placeholder: "" });

if (text) {
    for (let w of text.split(' ')) {
        for (let c of w.toUpperCase()) {
            // CODE_TABLE[c] && 
            for (let e of CODE_TABLE[c]) {
                switch (e) {
                    case '·':
                        await flash(DOT);
                        break;
                    case '-':
                        await flash(DASH);
                        break;
                    default:
                        break;
                }

                await pause(PAUSE_ELEMENT);
            }

            await pause(PAUSE_CHARACTER - PAUSE_ELEMENT);
        }

        await pause(PAUSE_WORD - PAUSE_CHARACTER);
    }
}

async function pause(duration) {
    await new Promise(r => setTimeout(_ => r(), duration * 1000));
}

async function flash(duration) {
    device.$setTorchModeOnWithLevel_error(brightness, null);
    await pause(duration);
    device.$setTorchMode(0);
}
