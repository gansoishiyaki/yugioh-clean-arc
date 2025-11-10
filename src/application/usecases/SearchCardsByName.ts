import type { Card } from '../../domain/entities/Card'
import type { CardRepository } from '../../domain/repositories/CardRepository'

export type SearchResult = {
  count: number
  cards: Card[]
}

export class SearchCardsByName {
  constructor(private readonly repo: CardRepository) {}

  async execute(query: string): Promise<SearchResult> {
    const q = (query ?? '').trim().toLowerCase()
    const all = await this.repo.getAll()
    const filtered = q
      ? all.filter((c) => c.name.toLowerCase().includes(q))
      : all
    return { count: filtered.length, cards: filtered }
  }
}

