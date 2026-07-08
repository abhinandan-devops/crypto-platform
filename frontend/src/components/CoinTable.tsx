type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  image: string;
};

type Props = {
  coins: Coin[];
};

function CoinTable({ coins }: Props) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th align="left">Coin</th>
          <th align="left">Price</th>
          <th align="left">Market Cap</th>
        </tr>
      </thead>

      <tbody>
        {coins.map((coin) => (
          <tr
            key={coin.id}
            style={{
              borderBottom: "1px solid #333",
            }}
          >
            <td
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
              }}
            >
              <img
                src={coin.image}
                width="30"
                alt={coin.name}
              />

              {coin.name}
            </td>

            <td>${coin.current_price.toLocaleString()}</td>

            <td>${coin.market_cap.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CoinTable;