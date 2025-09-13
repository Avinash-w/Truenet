

export default function TwoImageSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-20">
      {/* First Image */}
      <img
        src="https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw53d4c6ee/images/TrendingFinal_Women_D.jpg"
        alt="First"
        className="w-full h-auto rounded-2xl shadow-md"
      />

      {/* Second Image */}
      <img
        src="https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw203d37b3/images/TrendingFinal_Men_D.jpg"
        alt="First"
        className="w-full h-auto rounded-2xl shadow-md"
      />
    </div>
  );
}
