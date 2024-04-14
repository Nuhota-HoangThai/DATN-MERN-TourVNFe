import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const DescriptionBox = (props) => {
  const { tour } = props;
  return (
    <>
      <h1 className="mb-4 text-center text-2xl font-bold">Điểm nhấn</h1>
      <PerfectScrollbar>
        <div className="h-[700px]">
          <div className=" bg-sky-50 px-8 py-6 shadow-xl">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: tour.description }}
            ></div>
          </div>
        </div>{" "}
      </PerfectScrollbar>
    </>
  );
};

export default DescriptionBox;
