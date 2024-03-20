import {} from "react";

import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";

const Profile = ({ children }) => {
  return (
    <div className="layout mx-24 mb-4 mt-10 grid grid-cols-5 gap-4">
      <div className="sidebar col-span-1 h-full w-full">
        <SidebarProfile />
      </div>
      <div className="content col-span-4">{children}</div>
    </div>
  );
};

export default Profile;
