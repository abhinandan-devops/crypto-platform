type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="🔍 Search Coin..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-slate-800 p-4 mb-6 outline-none border border-slate-700 focus:border-cyan-400"
    />
  );
}

export default SearchBar;