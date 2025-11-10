type Props = {
  query: string
  loading?: boolean
  onQueryChange: (value: string) => void
  onSubmit: () => void
}

export function SearchForm({ query, onQueryChange, onSubmit, loading }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}
    >
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="カード名で検索"
        style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{ padding: '8px 14px', borderRadius: 6, border: '1px solid #888', background: '#2d8cf0', color: 'white' }}
      >
        {loading ? '検索中...' : '検索'}
      </button>
    </form>
  )
}

