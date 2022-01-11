const Die = ({ roll }) => {
  return (
    <>
      {roll === 1 ? (
        <span>&#9856;</span>
      ) : roll === 2 ? (
        <span>&#9857;</span>
      ) : roll === 3 ? (
        <span>&#9858;</span>
      ) : roll === 4 ? (
        <span>&#9859;</span>
      ) : roll === 5 ? (
        <span>&#9860;</span>
      ) : roll === 6 ? (
        <span>&#9861;</span>
      ) : (
        'ERROR'
      )}
    </>
  );
};

export default Die;
