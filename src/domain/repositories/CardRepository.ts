import type { Card } from '../entities/Card'

export interface CardRepository {
  getAll(): Promise<Card[]>
}

