/**
 * Aurebesh Translation Engine
 * English ↔ Aurebesh with full dipthong support
 */

export const DIPTHONGS = ['ch','ee','eo','kh','ng','oo','sh','th','ya','bl','kr','zh'];

// English → Aurebesh (Phoenician Unicode block as visual stand-in)
export const ENG_TO_AUR: Record<string, string> = {
  'a':'𐤀','b':'𐤁','c':'𐤂','d':'𐤃','e':'𐤄',
  'f':'𐤅','g':'𐤆','h':'𐤇','i':'𐤈','j':'𐤉',
  'k':'𐤊','l':'𐤋','m':'𐤌','n':'𐤍','o':'𐤎',
  'p':'𐤏','q':'𐤐','r':'𐤑','s':'𐤒','t':'𐤓',
  'u':'𐤔','v':'𐤕','w':'𐤖','x':'𐤗','y':'𐤘',
  'z':'𐤙',
  // dipthongs
  'ch':'◈','ee':'◉','eo':'◊','kh':'◌',
  'ng':'◍','oo':'◎','sh':'◐','th':'◑',
  'ya':'◒','bl':'◓','kr':'◔','zh':'◕',
};

// Reverse map: Aurebesh → English
export const AUR_TO_ENG: Record<string, string> = {};
for (const [eng, aur] of Object.entries(ENG_TO_AUR)) {
  AUR_TO_ENG[aur] = eng;
}

export interface Token {
  key: string | null;
  upper: boolean;
  raw: string;
  isDip: boolean;
}

export function tokeniseEnglish(text: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    const chLow = ch.toLowerCase();
    // Try dipthong (2-char)
    if (i + 1 < text.length) {
      const pair = chLow + text[i+1].toLowerCase();
      if (DIPTHONGS.includes(pair)) {
        const upper = /[a-z]/i.test(ch) && ch === ch.toUpperCase() && text[i+1] === text[i+1].toUpperCase();
        tokens.push({ key: pair, upper: !!upper, raw: text.slice(i, i+2), isDip: true });
        i += 2;
        continue;
      }
    }
    // Single letter
    if (/[a-z]/i.test(ch)) {
      tokens.push({ key: chLow, upper: ch !== chLow, raw: ch, isDip: false });
      i++;
      continue;
    }
    // Space / punctuation / digit — pass through
    tokens.push({ key: null, upper: false, raw: ch, isDip: false });
    i++;
  }
  return tokens;
}

export function engToAurText(text: string): string {
  const tokens = tokeniseEnglish(text);
  let result = '';
  for (const t of tokens) {
    if (t.key === null) {
      result += t.raw;
    } else {
      result += ENG_TO_AUR[t.key] || t.raw;
    }
  }
  return result;
}

export function aurToEng(text: string): string {
  let result = '';
  for (const ch of text) {
    if (ch === ' ' || ch === '\n') { result += ch; continue; }
    result += AUR_TO_ENG[ch] ?? ch;
  }
  return result;
}

// Aliases for compatibility with translator page
export const engToAurTokens = tokeniseEnglish;
export const translateToAurebesh = engToAurText;
export const translateFromAurebesh = aurToEng;
