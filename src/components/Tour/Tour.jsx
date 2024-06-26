import { MdNavigateNext } from "react-icons/md";
import { formatRegion } from "../../utils/formatRegion";

const Tour = (props) => {
  const { tour } = props;

  return (
    <div className="flex items-center px-6 text-sm font-bold">
      <span>Trang chủ</span>
      <MdNavigateNext className="mx-1 text-sm" />
      <span>Tour du lịch</span>
      <MdNavigateNext className="mx-1 text-sm" />
      <span className="hidden sm:block">{formatRegion(tour?.regions)}</span>
      <MdNavigateNext className="mx-1 text-sm" />
      <span>{tour.nameTour}</span>
    </div>
  );
};

export default Tour;
