import React from "react";
import { MdNavigateNext } from "react-icons/md";

const Tour = (props) => {
  const { tour } = props;

  return (
    <div className="flex flex-col items-center px-4 py-2 text-sm font-semibold text-indigo-900 sm:flex-row sm:px-16 sm:py-4 sm:text-base">
      <span>Tour</span>
      <MdNavigateNext className="mx-1 text-sm" />
      <span className="hidden sm:block">{tour?.regions}</span>
      <MdNavigateNext className="mx-1 text-sm" />
      <span>{tour.nameTour}</span>
    </div>
  );
};

export default Tour;
