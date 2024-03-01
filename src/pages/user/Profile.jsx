import React from "react";
import { Link } from "react-router-dom";

import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";

const Profile = () => {
  return (
    <div className="grid grid-cols-5 gap-4 mt-10">
      <div className=" col-span-1 h-full w-full">
        <SidebarProfile />
      </div>
      <div className="col-span-4"></div>
    </div>
  );
};

export default Profile;
