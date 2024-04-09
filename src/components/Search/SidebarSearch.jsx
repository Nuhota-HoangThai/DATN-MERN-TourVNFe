import { useNavigate, useLocation } from "react-router-dom";

const SidebarSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleSearch = () => {
    const queryParams = new URLSearchParams(location.search);
    const isShowingForm = queryParams.get("showForm");

    if (isShowingForm) {
      queryParams.delete("showForm");
    } else {
      queryParams.set("showForm", "true");
    }

    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="h-28 w-28 rounded-full bg-blue-800 py-8 text-center font-bold text-white">
      <button onClick={handleToggleSearch}>Tra cứu Booking</button>
    </div>
  );
};

export default SidebarSearch;
