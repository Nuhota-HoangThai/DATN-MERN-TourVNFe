import { useLocation } from "react-router-dom";
import Item from "../../components/Item/Item";
import SearchForm from "../../components/Search/Search";
import "../styles/searchResult.css";

import bannerRuongBacThang from "../../assets/img/bannerRuongBacThang.jpg";

const SearchResultList = () => {
  const location = useLocation();
  const data = location.state?.searchResults;

  return (
    <div className="mx-24 mt-28">
      <div className="relative flex items-end justify-center text-white ">
        <img
          src={bannerRuongBacThang}
          alt=""
          className="  h-[600px] w-full rounded-3xl  bg-cover bg-center"
        />

        <div className="absolute mb-[-100px] rounded-3xl bg-black bg-opacity-0 ">
          <SearchForm />
        </div>
      </div>
      <div className="mt-24">
        {Array.isArray(data) && data.length > 0 ? (
          <div>
            <h2 className="my-1 text-center text-3xl font-bold ">
              Kết quả tìm kiếm
            </h2>{" "}
            <div className="mx-auto mb-8 h-1 w-1/6 rounded bg-blue-500"></div>
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
