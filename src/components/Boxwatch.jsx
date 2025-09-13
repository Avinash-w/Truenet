export default function CircleBoxes() {
  const data = [
    {
      name: "Smart Watch",
      img: "https://i.pinimg.com/1200x/17/48/3a/17483ab7b5ecfae12c387c92a51ab7ee.jpg",
    },
    {
      name: "Analog Watch",
      img: "https://i.pinimg.com/1200x/82/74/6c/82746cb8f929cd8a5f6695e3f6746e68.jpg",
    },
    {
      name: "Luxury Watch",
      img: "https://i.pinimg.com/736x/dd/37/78/dd3778be46de4dddb3a66e278e172958.jpg",
    },
    {
      name: "Sports Watch",
      img: "https://i.pinimg.com/736x/7d/15/eb/7d15eb96adc9f24f0a716b2c99fcbe3d.jpg",
    },
    {
      name: "Digital Watch",
      img: "https://i.pinimg.com/736x/7d/15/eb/7d15eb96adc9f24f0a716b2c99fcbe3d.jpg",
    },
  ];

  return (
    <div className="flex justify-center gap-10 my-20 flex-wrap ">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center group">
          {/* Circle Wrapper */}
          <div className="relative w-32 h-32  flex items-center justify-center">
            {/* Border Effect */}
            <div
              className="
               absolute inset-0 rounded-full 
    before:content-[''] before:absolute before:inset-0 before:rounded-full
    before:[background:conic-gradient(black_0deg_120deg,transparent_120deg_360deg)]
    before:[mask:radial-gradient(farthest-side,transparent calc(100%-2px),white calc(100%))]
    before:[-webkit-mask:radial-gradient(farthest-side,transparent calc(100%-2px),white calc(100%))]
    before:transition-transform before:duration-700 before:ease-in-out
    group-hover:before:rotate-[120deg]
              "
            ></div>

            {/* Image inside */}
            <img
              src={item.img}
              alt={item.name}
              className="absolute w-[90%] h-[90%] object-cover rounded-full"
            />
          </div>

          {/* Name below circle */}
         
        </div>
      ))}
    </div>
  );
}
