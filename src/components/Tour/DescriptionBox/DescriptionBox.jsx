import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const DescriptionBox = (props) => {
  const { tour } = props;
  return (
    <div className="my-6 w-1/2 ">
      <div className=" rounded-xl bg-sky-50 px-8 py-6 shadow-xl">
        <h1 className="mb-4 text-center text-2xl font-bold">Điểm nhấn</h1>
        <PerfectScrollbar>
          <div
            className="h-80"
            dangerouslySetInnerHTML={{ __html: tour.description }}
          ></div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default DescriptionBox;
