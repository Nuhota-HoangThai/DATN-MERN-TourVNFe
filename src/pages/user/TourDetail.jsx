import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../../utils/config";

import Tour from "../../components/Tour/Tour";
import GuideTour from "../../components/Tour/GuideTour";
import InfoTour from "../../components/Tour/InfoTour";
import TourDisplay from "../../components/Tour/TourDisplay/TourDisplay";
import DescriptionBox from "../../components/Tour/DescriptionBox/DescriptionBox";
import Schedule from "../../components/Tour/Schedule";
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
        //console.log("getTour in tour details");
      } catch (error) {
        console.log(error);
      }
    };
    getTour();
  }, [tourId]);

  return (
    <div className="bg-sky-100">
      <div className="p-8">
        {!tour ? (
          <p className="text-center">Đang tải...</p>
        ) : (
          <>
            <Tour tour={tour} />
            <TourDisplay tour={tour} />
            <div className="flex w-full gap-8">
              <InfoTour tour={tour} />
              <GuideTour tour={tour} />
            </div>

            <div className="flex w-full gap-8">
              <DescriptionBox tour={tour} />
              <PriceDetail tour={tour} />
            </div>
            <Schedule tour={tour} />
            <ReviewTour tour={tour} />
          </>
        )}
      </div>
    </div>
  );
};

export default TourDetail;
