import { MdNavigateNext } from "react-icons/md";

const Tour = (props) => {
  const { tour } = props;

  const formatRegion = (region) => {
    switch (region) {
      case "mn":
        return "miền Nam";
      case "mb":
        return "miền Bắc";
      case "mt":
        return "miền Trung";
      default:
        return "Không xác định";
    }
  };

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
