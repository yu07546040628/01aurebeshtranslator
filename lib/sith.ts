/**
 * Sith Alphabet (Ur-Kittât) Translation Engine
 * Pure 1:1 letter substitution — no dipthongs
 */

// English → Sith (Cuneiform Unicode block as visual stand-in)
export const SITH_MAP: Record<string, string> = {
  'a':'𒀭','b':'𒀸','c':'𒁀','d':'𒁹','e':'𒂗',
  'f':'𒃰','g':'𒄑','h':'𒄿','i':'𒅅','j':'𒅗',
  'k':'𒆍','l':'𒆳','m':'𒇻','n':'𒉺','o':'𒊕',
  'p':'𒊩','q':'𒊺','r':'𒋙','s':'𒌀','t':'𒌝',
  'u':'𒍀','v':'𒍝','w':'𒎎','x':'𒏀','y':'𒐈',
  'z':'𒐷'
};

// Reverse map: Sith → English
export const SITH_REVERSE: Record<string, string> = {};
for (const [eng, sith] of Object.entries(SITH_MAP)) {
  SITH_REVERSE[sith] = eng;
}

export function engToSithText(text: string): string {
  let result = '';
  for (const ch of text) {
    const low = ch.toLowerCase();
    if (SITH_MAP[low]) {
      result += SITH_MAP[low];
    } else {
      result += ch;
    }
  }
  return result;
}

export function sithToEng(text: string): string {
  let result = '';
  for (const ch of text) {
    if (ch === ' ' || ch === '\n') { result += ch; continue; }
    result += SITH_REVERSE[ch] ?? ch;
  }
  return result;
}

// Alias for compatibility
export const engToSith = engToSithText;
export const translateToSith = engToSithText;
export const translateFromSith = sithToEng;
