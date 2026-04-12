// Huttese vocabulary dictionary and translation engine

export const HUTTESE_DICT: Record<string, string> = {
  // Greetings
  'hello': 'achuta',
  'hi': 'chowbaso',
  'greetings': "h'chu apenkee",
  'goodbye': 'me wompanee',
  'farewell': 'nowan',
  // People
  'friend': 'pateesa',
  'friends': 'pateesay',
  'you': 'chuba',
  'i': 'jee',
  'me': 'mi',
  'we': 'bantha',
  'my': "mi",
  // Actions
  'go': 'boska',
  "let's go": 'boska',
  'move': 'boska',
  'kill': 'kilya',
  'want': 'koona',
  'have': 'bargon',
  'give': 'yanee',
  'take': 'tah',
  'stop': 'caba',
  'come': 'achuta',
  'speak': 'partha',
  'understand': 'wocky',
  'know': 'noa',
  'see': 'teta',
  'find': 'klees',
  'run': 'podracing',
  'help': 'yanree',
  'accept': 'mee jewunko',
  // Objects/Nouns
  'money': 'moulee-rah',
  'credits': 'peetch annit',
  'deal': 'bargon',
  'slave': 'myocum',
  'food': 'gornt',
  'water': 'wif',
  'ship': 'nashtah',
  'weapon': 'gaffi',
  'droid': 'tah',
  'city': 'coruscant',
  'palace': 'coona',
  // Adjectives
  'good': 'dobra',
  'bad': 'bantha poodoo',
  'great': 'murishani',
  'strong': 'topta',
  'weak': 'poodoo',
  'big': 'hutt',
  'small': 'chuba',
  'ugly': 'sleemo',
  'stupid': 'wermo',
  'dead': 'kilya',
  'alive': 'noleeya',
  // Negative/Questions
  'no': 'noleeya',
  'not': 'nee',
  'never': 'nee-ta',
  'yes': 'hm-hm',
  'what': 'koona',
  'where': 'wee',
  'who': 'chuba',
  'why': 'karabast',
  // Famous phrases
  'scoundrel': 'coona tee-tocky malia',
  'worthless': 'bantha poodoo',
  'slimeball': 'sleemo',
  'idiot': 'wermo',
  'gangster': 'kajidic',
  'bounty hunter': 'nashtah',
  'republic': 'pateesa',
  'empire': 'murishani',
  'force': 'tah',
  // Numbers
  'one': 'huttah',
  'two': 'bah',
  'three': 'duba',
};

export interface HuttToken {
  original: string;
  translated: string;
  matched: boolean;
}

export function translateToHuttese(text: string): HuttToken[] {
  const words = text.split(/(\s+|[.,!?;:'"()\[\]{}])/);
  const tokens: HuttToken[] = [];

  for (const word of words) {
    if (!word) continue;
    if (/^\s+$/.test(word) || /^[.,!?;:'"()\[\]{}]$/.test(word)) {
      tokens.push({ original: word, translated: word, matched: false });
      continue;
    }

    // Try multi-word phrases first (up to 3 words)
    const lower = word.toLowerCase();
    const huttese = HUTTESE_DICT[lower];
    if (huttese) {
      tokens.push({ original: word, translated: huttese, matched: true });
    } else {
      tokens.push({ original: word, translated: word, matched: false });
    }
  }
  return tokens;
}

// Alias that returns plain string (for compatibility with translator page)
export function engToHuttese(text: string): string {
  const tokens = translateToHuttese(text);
  return tokens.map(t => t.translated).join('');
}

export function FAMOUS_PHRASES() {
  return [
    { huttese: "Ee chuta!", english: "Oh nice!" },
    { huttese: "Chuba da naga?", english: "What are you doing?" },
    { huttese: "Bo shuda!", english: "Jabba's classic expression" },
    { huttese: "Koona t'chuta?", english: "What do you want?" },
    { huttese: "Mee jewunko", english: "I accept" },
    { huttese: "H'chu apenkee!", english: "Greetings!" },
    { huttese: "Bantha poodoo", english: "Worthless trash" },
    { huttese: "Sleemo!", english: "Slimeball!" },
  ];
}
