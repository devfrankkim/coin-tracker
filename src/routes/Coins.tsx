import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import { iCoin } from "../interfaces/Coin";

const Coins = () => {
  // useQuery must be called inside the component
  const useData = useQuery<iCoin[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Header>
        <Helmet>
          <title>Coins!!!</title>
        </Helmet>
        <Title>Coins!!!</Title>
      </Header>
      {useData.isLoading ? (
        <div>Loading...</div>
      ) : (
        <CoinsList>
          {useData.data?.slice(0, 50).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.1s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
