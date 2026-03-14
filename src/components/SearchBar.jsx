export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by author..."
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded mb-4"
    />
  )
}
