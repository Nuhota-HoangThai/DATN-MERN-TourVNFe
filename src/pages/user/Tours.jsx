import {} from "react";

import Banner from "../../components/Banner/Banner";
import PopularCentralRegion from "../../components/PopularCentralRegion/Popular";
import Offers from "../../components/Offers/Offers";
import NewCollections from "../../components/NewCollections/NewCollections";
import NewsLetter from "../../components/NewsLetter/NewsLetter";

const Tours = () => {
  return (
    <div className="mt-24">
      <Banner />
      <PopularCentralRegion />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Tours;
