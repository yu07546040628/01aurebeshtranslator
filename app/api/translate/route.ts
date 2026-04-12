import { NextRequest, NextResponse } from 'next/server'
import { translateToAurebesh, translateFromAurebesh } from '@/lib/aurebesh'
import { translateToSith, translateFromSith } from '@/lib/sith'
import { translateToHuttese } from '@/lib/huttese'
import { engToDroid } from '@/lib/droidspeak'
import { translateToMandoa } from '@/lib/mandalorian'

export async function POST(request: NextRequest) {
  try {
    const { text, language, direction } = await request.json()

    if (!text || !language) {
      return NextResponse.json({ error: 'Missing text or language' }, { status: 400 })
    }

    let result = ''

    if (direction === 'from') {
      // Translate from alien language to English
      switch (language) {
        case 'aurebesh':
          result = translateFromAurebesh(text)
          break
        case 'sith':
          result = translateFromSith(text)
          break
        default:
          result = text
      }
    } else {
      // Translate from English to alien language
      switch (language) {
        case 'aurebesh':
          result = translateToAurebesh(text)
          break
        case 'sith':
          result = translateToSith(text)
          break
        case 'huttese':
          result = translateToHuttese(text).map(t => t.translated).join('')
          break
        case 'droidspeak':
          result = engToDroid(text)
          break
        case 'mandalorian':
          result = translateToMandoa(text)
          break
        default:
          result = text
      }
    }

    return NextResponse.json({ result })
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
