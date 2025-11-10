import type { Card } from '../../domain/entities/Card'

type Props = {
  count: number
  cards: Card[]
}

export function SearchResults({ count, cards }: Props) {
  const renderStars = (level: number) => {
    const n = Math.max(0, Math.min(12, Math.floor(level || 0)))
    if (n <= 0) return '-'
    return '★'.repeat(n)
  }

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ marginBottom: 8, color: '#333' }}>該当件数: {count}</div>
      <div>
        {cards.map((c) => (
          <div key={`${c.name}-${c.attack}-${c.defense}-${c.attribute}-${c.level}`} style={{ padding: '8px 10px', border: '1px solid #eee', borderRadius: 6, marginBottom: 8 }}>
            <div><strong>名前:</strong> {c.name}</div>
            <div><strong>攻撃力:</strong> {c.attack}</div>
            <div><strong>防御力:</strong> {c.defense}</div>
            <div><strong>属性:</strong> {c.attribute || '-'}</div>
            <div>
              <strong>レベル:</strong>{' '}
              <span style={{ color: 'goldenrod', letterSpacing: 1 }}>{renderStars(c.level)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
