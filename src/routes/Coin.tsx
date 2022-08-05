import { useQuery, QueryCache, useQueries } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  useMatch,
  Link,
  Outlet,
} from "react-router-dom";

import { Helmet } from "react-helmet";

import styled from "styled-components";
import { fetchInfoData, fetchPriceData } from "../api";

import { iPriceData } from "../interfaces/Price";
import { iInfoData } from "../interfaces/Coin";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

type RouteParams = {
  coinId: string;
};

type LocationState = {
  name: string;
};

const Coin = () => {
  // ===== Recoil Dark Mode Setter =====
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  console.log(setDarkAtom);

  // get from URL
  const { coinId } = useParams<RouteParams>();

  // get from Link state
  const location = useLocation();
  const state = location.state as LocationState;

  const { data: infoData, isLoading: isLoadingInfoData } = useQuery<iInfoData>(
    ["infoData", coinId],
    () => fetchInfoData(`${coinId}`)
  );

  const { data: priceData, isLoading: isLoadingPriceData } =
    useQuery<iPriceData>(["priceData", coinId], () =>
      fetchPriceData(`${coinId}`)
    );

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const isLoading = isLoadingInfoData || isLoadingPriceData;

  return (
    <Container>
      <Header>
        <Helmet>
          <title>
            {state?.name
              ? state?.name
              : isLoading
              ? "Loading..."
              : infoData?.name}
          </title>
        </Helmet>
        <Link to="/">
          <Title>
            {state?.name
              ? state.name
              : isLoading
              ? "Loading..."
              : infoData?.name}
          </Title>
        </Link>
        <button onClick={() => setDarkAtom((prev) => !prev)}>
          Toggle Dark Mode
        </button>
      </Header>
      {isLoadingInfoData ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId, priceData }} />
        </>
      )}
    </Container>
  );
};

export default Coin;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
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
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;
