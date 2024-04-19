import Item from "../Item/Item";

const Items = ({ articles }) => {
  return (
    <div>
      {articles.map((article, i) => (
        <Item
          key={article._id} // Đừng quên prop key khi render list
          {...article}
        />
      ))}
    </div>
  );
};

export default Items;
