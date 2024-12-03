export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
      <input
        type="text"
        placeholder="検索..."
        className="w-full p-2 border rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}