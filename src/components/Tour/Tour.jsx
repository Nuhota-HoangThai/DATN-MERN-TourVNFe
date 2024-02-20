import React from "react";
import { MdNavigateNext } from "react-icons/md";

const Tour = (props) => {
  const { tour } = props;

  return (
    <div className="flex flex-col sm:flex-row items-center py-2 px-4 sm:py-4 sm:px-16 text-sm sm:text-base font-semibold">
      <span>Home</span>
      <MdNavigateNext className="text-xl mx-1" /> <span>Tour</span>
      <MdNavigateNext className="text-xl mx-1" />
      <span className="hidden sm:block">{tour.regions}</span>
      <MdNavigateNext className="text-xl mx-1" />
      <span>{tour.name}</span>
    </div>
  );
};

export default Tour;
