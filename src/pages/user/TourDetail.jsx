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

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import Weather from "./Weather";

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
    <div className="bg-sky-100 px-28">
      <div className="p-8">
        {!tour ? (
          <p className="text-center">Đang tải...</p>
        ) : (
          <>
            <Tour tour={tour} />
            <div className="mt-4 flex justify-between gap-4">
              <div className="h-[2000px] w-1/2">
                <PerfectScrollbar>
                  <TourDisplay tour={tour} />
                  <Schedule tour={tour} />
                  <DescriptionBox tour={tour} />
                </PerfectScrollbar>
              </div>

              <div className="h-[2000px] w-1/2">
                <PerfectScrollbar>
                  <InfoTour tour={tour} />
                  <PriceDetail tour={tour} />
                  <GuideTour tour={tour} />
                  <Weather />{" "}
                  <ReviewTour tour={tour} />
                </PerfectScrollbar>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TourDetail;
