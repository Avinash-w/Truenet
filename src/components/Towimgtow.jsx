

export default function TwoImageSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  my-20">
      {/* First Image */}
      <img
        src="/poster1.jpg"
        alt="First"
        className="w-full h-auto rounded-2xl shadow-md"
      />

      {/* Second Image */}
      <img
        src="/girls1.webp"
        alt="First"
        className="w-full h-auto rounded-2xl shadow-md"
      />
    </div>
  );
}
