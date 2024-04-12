import { useLocation } from "react-router-dom";
import Item from "../../components/Item/Item";
import SearchForm from "../../components/Search/Search";
import "../styles/searchResult.css";

import bannerRuongBacThang from "../../assets/img/bannerRuongBacThang.jpg";

const SearchResultList = () => {
  const location = useLocation();
  const data = location.state?.searchResults;

  return (
    <div className="">
      <div className="relative flex items-end justify-center text-white ">
        <img
          src={bannerRuongBacThang}
          alt=""
          className="  h-[600px] w-full  bg-cover bg-center"
        />

        <div className="absolute  rounded-3xl bg-black bg-opacity-0 ">
          <SearchForm />
        </div>
      </div>
      <div className="mt-12">
        {Array.isArray(data) && data.length > 0 ? (
          <div>
            <div className="my-4 flex justify-center">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {data.map((item) => (
                  <Item key={item._id} {...item} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Không tìm thấy kết quả nào phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultList;
