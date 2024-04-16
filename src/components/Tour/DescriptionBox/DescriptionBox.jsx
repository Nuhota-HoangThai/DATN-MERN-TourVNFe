import HTMLRenderer from "../../HTML.component/HTML";

const DescriptionBox = (props) => {
  const { tour } = props;
  return (
    <>
      <div className="my-4 bg-sky-50 px-8 py-6">
        <h1 className="mb-4 text-center text-2xl font-bold">Quy định</h1>
        <div className="">
          <HTMLRenderer htmlString={tour.description} />
        </div>
      </div>
    </>
  );
};

export default DescriptionBox;
