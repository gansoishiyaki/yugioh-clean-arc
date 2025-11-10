import type { Card } from '../../domain/entities/Card'
import type { CardRepository } from '../../domain/repositories/CardRepository'

export class JsonCardRepository implements CardRepository {
  constructor(private readonly url: string = '/data/cards.json') {}

  async getAll(): Promise<Card[]> {
    const res = await fetch(this.url)
    if (!res.ok) throw new Error(`Failed to fetch JSON: ${res.status}`)
    const data = (await res.json()) as unknown
    return normalize(data)
  }
}

function normalize(data: unknown): Card[] {
  if (!Array.isArray(data)) return []
  return data
    .map((x) => ({
      name: String((x as any).name ?? ''),
      attack: Number((x as any).attack ?? 0),
      defense: Number((x as any).defense ?? 0),
      attribute: String((x as any).attribute ?? ''),
      level: Number((x as any).level ?? 0),
    }))
    .filter((c) => c.name.length > 0)
}
