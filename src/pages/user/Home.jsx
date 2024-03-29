import {} from "react";

import Banner from "../../components/Banner/Banner";
import PopularCentralRegion from "../../components/Popular/PopularCentralRegion/Popular";
import PopularNorth from "../../components/Popular/PopularNorth/PopularNorth";
import PopularSouthern from "../../components/Popular/PopularSouthern/PopularSouthern";

import NewCollections from "../../components/NewCollections/NewCollections";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import ListPromotion from "../../components/Promotion/ListPromotion";

const Home = () => {
  return (
    <div className="mt-24">
      <Banner />
      <PopularNorth />
      <PopularCentralRegion />
      <PopularSouthern />
      <ListPromotion />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Home;
