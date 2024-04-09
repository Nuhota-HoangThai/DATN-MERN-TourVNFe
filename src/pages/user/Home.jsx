import {} from "react";

import Banner from "../../components/Banner/Banner";
import PopularCentralRegion from "../../components/Home.component/Popular";
import PopularNorth from "../../components/Home.component/PopularNorth";
import PopularSouthern from "../../components/Home.component/PopularSouthern";

import NewCollections from "../../components/NewCollections/NewCollections";
import NewsLetter from "../../components/Home.component/NewsLetter";
import ListPromotion from "../../components/Promotion/ListPromotion";

import Introduce from "../../components/Home.component/Introduce";
import Directory from "../../components/Directory/ListTourDirectory";
import ChooseMe from "../../components/Home.component/ChooseMe";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <Introduce />

      <NewCollections />
      <ListPromotion />

      <PopularNorth />
      <Directory />

      <PopularCentralRegion />
      <ChooseMe />

      <PopularSouthern />
      <NewsLetter />
    </div>
  );
};

export default Home;
