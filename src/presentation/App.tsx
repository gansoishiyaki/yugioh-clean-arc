import { useMemo, useState } from 'react'
import { SearchCardsByName } from '../application/usecases/SearchCardsByName'
import { JsonCardRepository } from '../infrastructure/repositories/JsonCardRepository'
import { YamlCardRepository } from '../infrastructure/repositories/YamlCardRepository'
import { SearchForm } from './components/SearchForm'
import { SearchResults } from './components/SearchResults'
import type { Card } from '../domain/entities/Card'

type Source = 'json' | 'yaml'

export function App() {
  const [query, setQuery] = useState('')
  const [source, setSource] = useState<Source>('json')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState<Card[]>([])

  const usecase = useMemo(() => {
    const repo = source === 'json' ? new JsonCardRepository() : new YamlCardRepository()
    return new SearchCardsByName(repo)
  }, [source])

  const onSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await usecase.execute(query)
      setCount(result.count)
      setCards(result.cards)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '0.25rem' }}>遊戯王カード検索</h1>
      <p style={{ marginTop: 0, color: '#666' }}>Clean Architecture サンプル</p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <label>
          データソース:
          <select value={source} onChange={(e) => setSource(e.target.value as Source)} style={{ marginLeft: 8 }}>
            <option value="json">JSON</option>
            <option value="yaml">YAML</option>
          </select>
        </label>
      </div>

      <SearchForm
        query={query}
        onQueryChange={setQuery}
        onSubmit={onSearch}
        loading={loading}
      />

      {error && (
        <div style={{ color: 'white', background: '#c0392b', padding: '8px 12px', borderRadius: 6, marginTop: 12 }}>
          エラー: {error}
        </div>
      )}

      <SearchResults count={count} cards={cards} />
    </div>
  )
}
