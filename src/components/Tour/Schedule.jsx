import {} from "react";

const Schedule = (props) => {
  const { tour } = props;
  return (
    <div className=" mb-6 mt-16 w-1/2">
      <h1 className="mb-4 text-center text-2xl font-bold">Lịch trình</h1>
      <div className="rounded-xl bg-gray-100">
        <div
          className="h-80 overflow-y-auto p-4"
          dangerouslySetInnerHTML={{ __html: tour.schedule }}
        ></div>
      </div>
    </div>
  );
};

export default Schedule;
