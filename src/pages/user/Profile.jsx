import {} from "react";
import "../styles/profile.css";

import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";

const Profile = ({ children }) => {
  return (
    <div className="layout grid grid-cols-5 gap-4 bg-sky-50">
      <div className="sidebar col-span-1 h-full w-full">
        <SidebarProfile />
      </div>
      <div className="content col-span-4">{children}</div>
    </div>
  );
};

export default Profile;
