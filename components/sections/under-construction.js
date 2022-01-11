/* eslint-disable @next/next/no-img-element */
const UnderConstruction = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img className="w-60" src="https://i.imgur.com/qIufhof.png" alt="not found" />
      <h5>{data.heading.toUpperCase()}</h5>
    </div>
  );
};

export default UnderConstruction;
