import {} from "react";

const DescriptionBox = (props) => {
  const { tour } = props;
  return (
    <div className=" mb-6 mt-16 w-1/2">
      <h1 className="mb-4 text-center text-2xl font-bold">Điểm nhấn</h1>
      <div className=" rounded-xl bg-gray-100 shadow-2xl">
        <div
          className="p-4"
          dangerouslySetInnerHTML={{ __html: tour.description }}
        ></div>
      </div>
    </div>
  );
};

export default DescriptionBox;
