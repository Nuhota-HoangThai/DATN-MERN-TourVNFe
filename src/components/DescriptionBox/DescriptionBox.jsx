import {} from "react";

const DescriptionBox = (props) => {
  const { tour } = props;
  return (
    <div className=" mt-20">
      <h1 className="mb-4 text-xl font-semibold">Điểm nhấn</h1>
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
