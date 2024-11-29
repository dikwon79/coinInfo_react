import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2.5rem; /* 크기 조정 */
  font-weight: bold; /* 두껍게 */
  text-align: center; /* 가운데 정렬 */
  text-transform: uppercase; /* 모든 글자를 대문자로 */
  letter-spacing: 3px; /* 글자 간격 추가 */
  margin: 20px 0; /* 여백 추가 */
  position: relative; /* 가상의 요소를 추가하기 위해 설정 */
  &:after {
    content: ""; /* 하단 장식 */
    display: block;
    width: 100%; /* 장식 길이 */
    height: 4px; /* 장식 두께 */
    background-color: ${(props) => props.theme.accentColor};
    margin: 10px auto 0; /* 중앙 정렬 및 여백 */
  }
  &:hover {
    color: ${(props) => props.theme.hoverColor};
    transform: scale(1.1);
    transition: transform 0.2s ease, color 0.2s ease;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4caf50;
  color: white;
  border: none;
  position: absolute; /* Container를 기준으로 배치 */
  top: 10px; /* Container 상단에서 10px 아래 */
  right: 20px; /* Container 오른쪽에서 10px 왼쪽 */
  cursor: pointer; /* 클릭 가능한 포인터 표시 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 */
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  const { isLoading, data } = useQuery({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <Button onClick={toggleDarkAtom}>toggle mode</Button>
      </Header>

      {isLoading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin: ICoin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
