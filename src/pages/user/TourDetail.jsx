import { useContext } from "react";
import { TourContext } from "../../context/TourContext";
import { useParams } from "react-router-dom";
import Tour from "../../components/Tour/Tour";
import TourDisplay from "../../components/TourDisplay/TourDisplay";
import DescriptionBox from "../../components/DescriptionBox/DescriptionBox";
import RelatedTour from "../../components/RelatedTour/RelatedTour";

const TourDetail = () => {
  const { allTour } = useContext(TourContext);
  const { tourId } = useParams();
  const tour = allTour.find((e) => e.id === Number(tourId));

  return (
    <div className="mx-20">
      <Tour tour={tour} />
      <TourDisplay tour={tour} />
      <DescriptionBox />
      <RelatedTour />
    </div>
  );
};

export default TourDetail;
