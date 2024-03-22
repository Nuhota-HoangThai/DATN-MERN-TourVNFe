import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../../utils/config";

import Tour from "../../components/Tour/Tour";
import TourDisplay from "../../components/TourDisplay/TourDisplay";
import DescriptionBox from "../../components/DescriptionBox/DescriptionBox";
import ReviewTour from "../../components/ReviewTour/ReviewTour";
import PriceDetail from "../../components/PriceDetail/PriceDetail";

const TourDetail = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState();

  useEffect(() => {
    const getTour = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tour/getTourById/${tourId}`);

        setTour(res.data.tour);
        console.log("getTour in tour details");
      } catch (error) {
        console.log(error);
      }
    };
    getTour();
  }, [tourId]);

  return (
    <div className="mx-24 mt-32">
      {!tour ? (
        "loading"
      ) : (
        <>
          <Tour tour={tour} />
          <TourDisplay tour={tour} />
          <div className="flex w-full gap-8">
            <DescriptionBox tour={tour} />
            <PriceDetail tour={tour} />
          </div>
          <ReviewTour tour={tour} />
        </>
      )}
    </div>
  );
};

export default TourDetail;
