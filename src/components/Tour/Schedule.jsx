import HTMLRenderer from "../HTML.component/HTML";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const Schedule = (props) => {
  const { tour } = props;
  return (
    <>
      <h1 className="mb-4 text-center text-2xl font-bold">Lịch trình</h1>
      <PerfectScrollbar>
        <div className="h-[700px]">
          <div className=" bg-sky-50 px-8 py-6">
            <HTMLRenderer htmlString={tour.schedule} className="" />
          </div>
        </div>{" "}
      </PerfectScrollbar>
    </>
  );
};

export default Schedule;
