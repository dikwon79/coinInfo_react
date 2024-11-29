import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.textColor};

  &:last-child {
    border-bottom: none;
  }

  span {
    font-weight: 600;
  }
`;
interface PriceProps {
  coinId: string;
  tickersData:
    | {
        quotes: {
          USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
          };
        };
      }
    | null
    | undefined;
}

function Price({ coinId, tickersData }: PriceProps) {
  if (!tickersData) {
    return <div>Loading data...</div>;
  }

  const { USD } = tickersData.quotes;

  return (
    <Container>
      <Title>Price Details</Title>
      <List>
        <ListItem>
          <span>All Time High Price:</span> ${USD.ath_price}
        </ListItem>
        <ListItem>
          <span>All Time High Date:</span>{" "}
          {new Date(USD.ath_date).toLocaleDateString()}
        </ListItem>
        <ListItem>
          <span>Market Cap:</span> ${USD.market_cap.toLocaleString()}
        </ListItem>
        <ListItem>
          <span>Market Cap Change (24h):</span> {USD.market_cap_change_24h}%
        </ListItem>
        <ListItem>
          <span>Price Change (1h):</span> {USD.percent_change_1h}%
        </ListItem>
        <ListItem>
          <span>Price Change (1y):</span> {USD.percent_change_1y}%
        </ListItem>
        <ListItem>
          <span>Price Change (6h):</span> {USD.percent_change_6h}%
        </ListItem>
        <ListItem>
          <span>Price Change (7d):</span> {USD.percent_change_7d}%
        </ListItem>
        <ListItem>
          <span>Price Change (12h):</span> {USD.percent_change_12h}%
        </ListItem>
        <ListItem>
          <span>Price Change (15m):</span> {USD.percent_change_15m}%
        </ListItem>
        <ListItem>
          <span>Price Change (24h):</span> {USD.percent_change_24h}%
        </ListItem>
        <ListItem>
          <span>Price Change (30d):</span> {USD.percent_change_30d}%
        </ListItem>
        <ListItem>
          <span>Price Change (30m):</span> {USD.percent_change_30m}%
        </ListItem>
        <ListItem>
          <span>From ATH:</span> {USD.percent_from_price_ath}%
        </ListItem>
        <ListItem>
          <span>Price:</span> ${USD.price.toFixed(2)}
        </ListItem>
        <ListItem>
          <span>Volume (24h):</span> ${USD.volume_24h.toLocaleString()}
        </ListItem>
        <ListItem>
          <span>Volume Change (24h):</span> {USD.volume_24h_change_24h}%
        </ListItem>
      </List>
    </Container>
  );
}

export default Price;
