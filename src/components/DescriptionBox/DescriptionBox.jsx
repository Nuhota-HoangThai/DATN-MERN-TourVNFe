import React from "react";

const DescriptionBox = (props) => {
  const { tour } = props;
  return (
    <div className="mb-5 mt-20 rounded-xl bg-gray-100 shadow-2xl">
      <div
        className="p-4"
        dangerouslySetInnerHTML={{ __html: tour.description }}
      ></div>
    </div>
  );
};

export default DescriptionBox;
