// Mandalorian (Mando'a) language data
// Basic Mando'a vocabulary and phrases

export const mandoaWords: Record<string, string> = {
  // Basic words
  'yes': 'elek',
  'no': 'nayc',
  'hello': 'su cuy\'gar',
  'goodbye': 'ret\'lini',
  'thank you': 'vor\'e',
  'please': 'olar',
  'sorry': 'ret\'lini',
  'help': 'gaa\'tayl',
  'water': 'nynir',
  'food': 'ne\'tra',
  'home': 'manda',
  'family': 'aliit',
  'brother': 'vod',
  'sister': 'vod',
  'father': 'buir',
  'mother': 'buir',
  'child': 'ad',
  'warrior': 'mando\'ad',
  'battle': 'batle',
  'war': 'oya\'karir',
  'peace': 'haat',
  'honor': 'haat',
  'death': 'manda',
  'life': 'cuyan',
  'love': 'mesh\'la',
  'friend': 'vod',
  'enemy': 'jetii',
  'weapon': 'be\'senaar',
  'armor': 'beskar\'gam',
  'helmet': 'buy\'ce',
  'sword': 'kad',
  'gun': 'beskad',
  'ship': 'naast',
  'planet': 'manda',
  'star': 'gal',
  'sky': 'gal',
  'fire': 'oya',
  'earth': 'manda',
  'strength': 'keyha',
  'courage': 'oya',
  'wisdom': 'hukaat\'kama',
  'truth': 'haat',
  'justice': 'haat',
  'freedom': 'oya',
  'power': 'keyha',
  'glory': 'oya',
  'victory': 'oya',
  'defeat': 'nayc',
  'run': 'dral',
  'fight': 'oya',
  'kill': 'oya\'karir',
  'live': 'cuyan',
  'die': 'manda',
  'speak': 'gaa\'tayl',
  'hear': 'gaa\'tayl',
  'see': 'gaa\'tayl',
  'know': 'gaa\'tayl',
  'understand': 'gaa\'tayl',
  'come': 'dral',
  'go': 'dral',
  'stay': 'cuyan',
  'leave': 'ret\'lini',
  'return': 'ret\'lini',
  'attack': 'oya',
  'defend': 'hukaat\'kama',
  'protect': 'hukaat\'kama',
  'guard': 'hukaat\'kama',
  'follow': 'dral',
  'lead': 'alor',
  'command': 'alor',
  'obey': 'elek',
  'refuse': 'nayc',
  'agree': 'elek',
  'disagree': 'nayc',
  'good': 'mesh\'la',
  'bad': 'nayc',
  'big': 'keyha',
  'small': 'tid',
  'fast': 'dral',
  'slow': 'nayc dral',
  'strong': 'keyha',
  'weak': 'nayc keyha',
  'old': 'or\'dinii',
  'new': 'tid',
  'hot': 'oya',
  'cold': 'nayc oya',
  'near': 'tid',
  'far': 'naast',
  'here': 'kandosii',
  'there': 'naast',
  'now': 'meg',
  'later': 'ret\'lini',
  'before': 'or\'dinii',
  'after': 'ret\'lini',
  'never': 'nayc',
  'always': 'oya',
  'sometimes': 'meg',
  'many': 'keyha',
  'few': 'tid',
  'all': 'manda',
  'none': 'nayc',
  'one': 'me\'ven',
  'two': 'tad',
  'three': 'ehn',
  'four': 'cuir',
  'five': 'rayshe\'a',
  'six': 'resol',
  'seven': 'e\'tad',
  'eight': 'sh\'ehn',
  'nine': 'she\'cu',
  'ten': 'ta\'raysh',
  'this way': 'dral',
  'mandalorian': 'mando\'ad',
  'the mandalorian': 'mando\'ad',
  'this is the way': 'kote lo\'shebs\'ul narit',
  'i': 'ni',
  'you': 'ner',
  'we': 'mhi',
  'they': 'hukaat',
  'my': 'ner',
  'your': 'ner',
  'our': 'mhi',
  'is': 'cuyan',
  'are': 'cuyan',
  'was': 'cuyan',
  'will': 'meg',
  'can': 'keyha',
  'have': 'gaa\'tayl',
  'want': 'olar',
  'need': 'olar',
  'and': 'bal',
  'or': 'meg',
  'but': 'nayc',
  'if': 'meg',
  'because': 'gaa\'tayl',
  'the': '',
  'a': '',
  'an': '',
};

// Common Mando'a phrases
export const mandoaPhrases: Record<string, string> = {
  'this is the way': 'kote lo\'shebs\'ul narit',
  'i have spoken': 'ni cuyan',
  'the mandalorian': 'mando\'ad',
  'may the force be with you': 'mhi solus tome',
  'honor and glory': 'haat bal oya',
  'family above all': 'aliit ori\'shya tal\'din',
  'i am mandalorian': 'ni mando\'ad',
  'we are mandalorian': 'mhi mando\'ade',
  'death before dishonor': 'manda nayc haat',
  'strength and courage': 'keyha bal oya',
  'for the clan': 'ori\'shya aliit',
  'for mandalore': 'ori\'shya manda',
};

export function translateToMandoa(text: string): string {
  if (!text.trim()) return '';

  const lowerText = text.toLowerCase().trim();

  // Check for exact phrase matches first
  for (const [english, mandoa] of Object.entries(mandoaPhrases)) {
    if (lowerText === english) {
      return mandoa;
    }
  }

  // Check if the full text matches a phrase
  for (const [english, mandoa] of Object.entries(mandoaPhrases)) {
    if (lowerText.includes(english)) {
      return lowerText.replace(new RegExp(english, 'gi'), mandoa);
    }
  }

  // Word by word translation
  const words = text.split(/\s+/);
  const translated = words.map(word => {
    const lower = word.toLowerCase().replace(/[^a-z']/g, '');
    const punct = word.replace(/[a-zA-Z']/g, '');
    const mandoa = mandoaWords[lower];
    if (mandoa !== undefined) {
      return mandoa ? mandoa + punct : punct;
    }
    return word; // Keep original if no translation found
  });

  return translated.filter(w => w).join(' ');
}

export function translateFromMandoa(text: string): string {
  if (!text.trim()) return '';

  const lowerText = text.toLowerCase().trim();

  // Reverse lookup in phrases
  for (const [english, mandoa] of Object.entries(mandoaPhrases)) {
    if (lowerText === mandoa.toLowerCase()) {
      return english;
    }
  }

  // Reverse lookup in words
  const reverseMap: Record<string, string> = {};
  for (const [english, mandoa] of Object.entries(mandoaWords)) {
    if (mandoa && !reverseMap[mandoa]) {
      reverseMap[mandoa] = english;
    }
  }

  const words = text.split(/\s+/);
  const translated = words.map(word => {
    const lower = word.toLowerCase().replace(/[^a-z']/g, '');
    const punct = word.replace(/[a-zA-Z']/g, '');
    const english = reverseMap[lower];
    if (english !== undefined) {
      return english + punct;
    }
    return word;
  });

  return translated.join(' ');
}
