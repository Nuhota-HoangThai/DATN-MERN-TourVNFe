import HTMLRenderer from "../HTML.component/HTML";

const Schedule = (props) => {
  const { tour } = props;
  return (
    <div className="my-6 w-1/2">
      <div className="rounded-xl bg-sky-50 p-4">
        <h1 className="mb-4 text-center text-2xl font-bold">Lịch trình</h1>
        <HTMLRenderer htmlString={tour.schedule} className="" />
      </div>
    </div>
  );
};

export default Schedule;
