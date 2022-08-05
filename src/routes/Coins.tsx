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
            <CoinLi key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </CoinLi>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const CoinLi = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
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
