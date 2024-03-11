import {} from "react";

import Banner from "../../components/Banner/Banner";
import PopularCentralRegion from "../../components/PopularCentralRegion/Popular";
import PopularNorth from "../../components/PopularNorth/PopularNorth";
import Offers from "../../components/Offers/Offers";
import NewCollections from "../../components/NewCollections/NewCollections";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import PopularSouthern from "../../components/PopularSouthern/PopularSouthern";

const Tours = () => {
  return (
    <div className="mt-24">
      <Banner />
      <PopularNorth />
      <PopularCentralRegion />
      <PopularSouthern />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Tours;
