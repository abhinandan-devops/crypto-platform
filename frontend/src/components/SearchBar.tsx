type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search Coin..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "20px",
        marginBottom: "20px",
        fontSize: "16px",
        borderRadius: "8px",
      }}
    />
  );
}

export default SearchBar;