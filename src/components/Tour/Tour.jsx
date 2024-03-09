import React from "react";
import { MdNavigateNext } from "react-icons/md";

const Tour = (props) => {
  const { tour } = props;

  return (
    <div className="flex flex-col sm:flex-row items-center text-indigo-900 py-2 px-4 sm:py-4 sm:px-16 text-sm sm:text-base font-semibold">
      <span>Tour</span>
      <MdNavigateNext className="text-sm mx-1" />
      <span className="hidden sm:block">{tour?.regions}</span>
      <MdNavigateNext className="text-sm mx-1" />
      <span>{tour.nameTour}</span>
    </div>
  );
};

export default Tour;
