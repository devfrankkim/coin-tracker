- https://apexcharts.com/docs/react-charts/

### useLocation vs useMatch vs useParams

- _useParams_
- 그리고, 해당하는 경로로 이동했을 때 /:id에 해당하는 데이터를 받아올 수 있도록 쿼리 스트링을 작성한다.

- _useLocation_
- useLocation은 경로 정보를 담고 있는 객체를 반환한다.
  `{ pathname: '/product/1', search: '', hash: '', state: null, key: 'default' }`
- 동적라우팅을 위해서는 useParams를 사용하지만, 페이지네이션을 위해서는 search값을 가져와 해당하는 쿼리스트링 값을 이용해 데이터를 요청할 수 있다.

### Problem (useLocation)

바로 링크에 들어간다면? -> 에러가 뜸.
Home 을 거쳐서, state로 타고 다음 페이지로 넘어가는 것이기 때문. if using URL.

- 해결책: 2가지를 해주면 됨. 1) loading 컨디션 주고 -> params 로 불러오기 2)

```js
const { state } = useLocation<RouteState>();
{
  state?.name ? state.name : isLoading ? "Loading..." : infoData?.name;
}
```

```js
  // as는 location.state가 LocationState라고 간주하는거고
  // <> 제네릭은 location.state 안에서 취급하는 데이터의 유형이 LocationState

  // get from URL
  // const { coinId } = useParams<{ coinId: string }>();
  const { coinId } = useParams<RouteParams>();
```

- https://reach.tech/router/api/useMatch

```js
const priceMatch = useMatch("/:coinId/price");
console.log(priceMatch);
/*
  params: {coinId: 'btc-bitcoin'}
  pathname: "/btc-bitcoin/price"
  pathnameBase: "/btc-bitcoin/price"
  pattern: {path: '/:coinId/price'
*/
// {params: {…}, pathname: '/btc-bitcoin/price', pathnameBase: '/btc-bitcoin/price', pattern: {…}}
```

```js
// const [coinData, setCoinData] = useState<CoinsType[]>([]);
// const [loading, setLoading] = useState(true);
// const getCoinData = () => {
//   const data = useQuery<CoinsType[]>(["allCoins"], fetchCoins);
//   console.log(data);
// };

useEffect(() => {
  // getCoinData();
}, []);
```
