import { useOutletContext } from "react-router-dom";

import { iUserOutlet } from "../interfaces/useOutlet.interface";

const Price = () => {
  const { priceData } = useOutletContext<iUserOutlet>();

  return (
    <div>
      <div>{priceData?.beta_value}</div>
      <div>{priceData?.circulating_supply}</div>
      <div>{priceData?.last_updated}</div>
      <div>{priceData?.name}</div>
      <div>{priceData?.rank}</div>
    </div>
  );
};

export default Price;
