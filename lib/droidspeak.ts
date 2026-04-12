// Droidspeak / Binary — R2-D2 Morse-style encoding

export const MORSE: Record<string, string> = {
  a:'·−', b:'−···', c:'−·−·', d:'−··', e:'·',
  f:'··−·', g:'−−·', h:'····', i:'··', j:'·−−−',
  k:'−·−', l:'·−··', m:'−−', n:'−·', o:'−−−',
  p:'·−−·', q:'−−·−', r:'·−·', s:'···', t:'−',
  u:'··−', v:'···−', w:'·−−', x:'−··−', y:'−·−−',
  z:'−−··',
  '0':'−−−−−','1':'·−−−−','2':'··−−−','3':'···−−',
  '4':'····−','5':'·····','6':'−····','7':'−−···',
  '8':'−−−··','9':'−−−−·',
};

export type BeepToken = { morse: string; char: string };

export function encodeText(text: string): BeepToken[] {
  const tokens: BeepToken[] = [];
  for (const ch of text.toLowerCase()) {
    if (ch === ' ') {
      tokens.push({ morse: '/', char: ' ' });
    } else if (MORSE[ch]) {
      tokens.push({ morse: MORSE[ch], char: ch });
    } else {
      tokens.push({ morse: '?', char: ch });
    }
  }
  return tokens;
}

export function tokensToText(tokens: BeepToken[]): string {
  return tokens.map(t => t.morse).join('  ');
}

// Web Audio — play a beep sequence
// Alias for compatibility with translator page
export function engToDroid(text: string): string {
  const tokens = encodeText(text);
  return tokensToText(tokens);
}

export async function playBeeps(tokens: BeepToken[]) {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const DOT  = 0.08;
  const DASH = 0.22;
  const GAP  = 0.05;
  const CHAR_GAP = 0.18;
  const WORD_GAP = 0.4;
  let t = ctx.currentTime + 0.05;

  for (const token of tokens) {
    if (token.morse === '/') { t += WORD_GAP; continue; }
    for (const sym of token.morse) {
      const dur = sym === '·' ? DOT : DASH;
      const freq = sym === '·' ? 1200 : 880;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.01);
      gain.gain.linearRampToValueAtTime(0, t + dur - 0.01);
      osc.start(t);
      osc.stop(t + dur);
      t += dur + GAP;
    }
    t += CHAR_GAP;
  }
}
