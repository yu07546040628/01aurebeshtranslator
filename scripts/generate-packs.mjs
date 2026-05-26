import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const OUT = 'scripts/pack-output';
rmSync(OUT, { recursive: true, force: true });

// ── Aurebesh ──
const AUR = {
  'a':'𐤀','b':'𐤁','c':'𐤂','d':'𐤃','e':'𐤄',
  'f':'𐤅','g':'𐤆','h':'𐤇','i':'𐤈','j':'𐤉',
  'k':'𐤊','l':'𐤋','m':'𐤌','n':'𐤍','o':'𐤎',
  'p':'𐤏','q':'𐤐','r':'𐤑','s':'𐤒','t':'𐤓',
  'u':'𐤔','v':'𐤕','w':'𐤖','x':'𐤗','y':'𐤘',
  'z':'𐤙',
  'ch':'◈','ee':'◉','eo':'◊','kh':'◌',
  'ng':'◍','oo':'◎','sh':'◐','th':'◑',
  'ya':'◒','bl':'◓','kr':'◔','zh':'◕',
};

// ── Sith ──
const SITH = {
  'a':'𒀭','b':'𒀸','c':'𒁀','d':'𒁹','e':'𒂗',
  'f':'𒃰','g':'𒄑','h':'𒄿','i':'𒅅','j':'𒅗',
  'k':'𒆍','l':'𒆳','m':'𒇻','n':'𒉺','o':'𒊕',
  'p':'𒊩','q':'𒊺','r':'𒋙','s':'𒌀','t':'𒌝',
  'u':'𒍀','v':'𒍝','w':'𒎎','x':'𒏀','y':'𒐈',
  'z':'𒐷',
};

// ── Death Trooper (Atbash + Caesar shift 3, rendered as Aurebesh glyphs) ──
function atbash(ch) {
  return String.fromCharCode('z'.charCodeAt(0) - (ch.charCodeAt(0) - 'a'.charCodeAt(0)));
}
function caesar(ch, n) {
  return String.fromCharCode(((ch.charCodeAt(0) - 97 + n) % 26) + 97);
}
const DEATH = {};
for (let i = 0; i < 26; i++) {
  const eng = String.fromCharCode(97 + i);
  const cipher = caesar(atbash(eng), 3);
  DEATH[eng] = AUR[cipher] ?? AUR[eng];
}

function makeSVG(label, glyph, font, color = '#c9a84c', bg = '#07090f') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="${bg}" rx="12"/>
  <text x="100" y="118" text-anchor="middle" font-family="${font}" font-size="80" fill="${color}">${glyph}</text>
  <text x="100" y="170" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#888">${label.toUpperCase()}</text>
</svg>`;
}

function writeAll(dir, map, font, color) {
  mkdirSync(dir, { recursive: true });
  for (const [key, glyph] of Object.entries(map)) {
    const name = key.length > 1 ? key : key;
    writeFileSync(join(dir, `${name}.svg`), makeSVG(key, glyph, font, color));
  }
}

// Basic Pack: Aurebesh only
const basicDir = join(OUT, 'basic-pack', 'aurebesh');
writeAll(basicDir, AUR, "'Noto Sans Phoenician', serif", '#c9a84c');
writeFileSync(join(OUT, 'basic-pack', 'README.txt'),
`Aurebesh Basic SVG Pack
=======================
38 SVG files (26 letters + 12 dipthongs)
Each file: 200x200px, dark background, gold glyph
Use in: Canva, Illustrator, Figma, web projects

Personal & commercial use permitted for fan/creative projects.
Star Wars and Aurebesh are trademarks of Lucasfilm Ltd. / Disney.
These SVG assets were created independently by freeaurebesh.com.
`);

// Full Pack: Aurebesh + Sith + Death Trooper
const fullDir = join(OUT, 'full-pack');
writeAll(join(fullDir, 'aurebesh'), AUR, "'Noto Sans Phoenician', serif", '#c9a84c');
writeAll(join(fullDir, 'sith'), SITH, "'Noto Sans Cuneiform', serif", '#cc2222');
writeAll(join(fullDir, 'deathtrooper'), DEATH, "'Noto Sans Phoenician', serif", '#888888');
writeFileSync(join(fullDir, 'README.txt'),
`Star Wars Language SVG Full Pack
=================================
114 SVG files across 3 scripts:
  /aurebesh/   — 38 files (26 letters + 12 dipthongs)
  /sith/       — 26 files (Ur-Kittât alphabet)
  /deathtrooper/ — 26 files (Imperial Atbash+Caesar cipher, Aurebesh glyphs)

Each file: 200x200px, dark background
Use in: Canva, Illustrator, Figma, web projects

Personal & commercial use permitted for fan/creative projects.
Star Wars and Aurebesh are trademarks of Lucasfilm Ltd. / Disney.
These SVG assets were created independently by freeaurebesh.com.
`);

// Zip (PowerShell on Windows)
execSync(`powershell Compress-Archive -Force -Path scripts/pack-output/basic-pack -DestinationPath scripts/aurebesh-basic-pack.zip`, { stdio: 'inherit' });
execSync(`powershell Compress-Archive -Force -Path scripts/pack-output/full-pack -DestinationPath scripts/aurebesh-full-pack.zip`, { stdio: 'inherit' });

console.log('Done: scripts/aurebesh-basic-pack.zip & scripts/aurebesh-full-pack.zip');
