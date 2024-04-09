import { MdNavigateNext } from "react-icons/md";
import { formatRegion } from "../../utils/formatRegion";

const Tour = (props) => {
  const { tour } = props;

  return (
    <div className="mb-5 flex items-center text-sm font-bold">
      <span>Tour</span>
      <MdNavigateNext className="mx-1 text-sm" />
      <span className="hidden sm:block">{formatRegion(tour?.regions)}</span>
      <MdNavigateNext className="mx-1 text-sm" />
      <span>{tour.nameTour}</span>
    </div>
  );
};

export default Tour;
