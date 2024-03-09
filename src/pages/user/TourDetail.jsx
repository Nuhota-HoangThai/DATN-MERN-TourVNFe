import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Tour from "../../components/Tour/Tour";
import TourDisplay from "../../components/TourDisplay/TourDisplay";
import DescriptionBox from "../../components/DescriptionBox/DescriptionBox";
import RelatedTour from "../../components/RelatedTour/RelatedTour";
import { BASE_URL } from "../../utils/config";

const TourDetail = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState();

  const getTour = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/tour/getTourById/${tourId}`);
      console.log(res.data);
      setTour(res.data.tour);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTour();
  }, []);
  console.log(tour);

  return (
    <div className="mx-20 mt-20">
      {!tour ? (
        "loading"
      ) : (
        <>
          <Tour tour={tour} />
          <TourDisplay tour={tour} />
          <DescriptionBox />
          <RelatedTour />
        </>
      )}
    </div>
  );
};

export default TourDetail;
