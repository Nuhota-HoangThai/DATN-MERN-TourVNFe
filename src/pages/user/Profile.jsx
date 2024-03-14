import {} from "react";

import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";

const Profile = ({ children }) => {
  return (
    <div className="mt-10 grid grid-cols-5 gap-4">
      <div className=" col-span-1 h-full w-full">
        <SidebarProfile />
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
};

export default Profile;
