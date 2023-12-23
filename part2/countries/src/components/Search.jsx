const Search = ({ search, onSearchUpdate }) => {
  return (
    <div>
      find countries <input value={search} onChange={onSearchUpdate} />
    </div>
  )
}

export default Search