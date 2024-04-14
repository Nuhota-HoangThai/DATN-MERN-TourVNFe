import HTMLRenderer from "../HTML.component/HTML";

const Schedule = (props) => {
  const { tour } = props;
  return (
    <>
      <div className="w-1/2 px-8 py-6">
        <h1 className="mb-4 text-center text-2xl font-bold">Lịch trình</h1>
        <HTMLRenderer htmlString={tour.schedule} className="" />
      </div>
    </>
  );
};

export default Schedule;
