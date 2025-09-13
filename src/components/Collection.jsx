export default function Collection() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-12 bg-gray-50">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#847a2e]">
          Discover Timeless Elegance
        </h2>
        <p className="text-lg md:text-xl mb-8 text-[#474322]">
          Upgrade your style with precision-crafted watches designed for
          durability and sophistication.
        </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Left Large Image */}
        <div>
          <img
            src="https://watches-store-newdemo.myshopify.com/cdn/shop/files/image_1344.webp?v=1754294706&width=750"
            alt="Premium Watch"
            className="w-full h-full object-cover rounded-2xl shadow-xl hover:scale-105 transition duration-500"
          />
         
        </div>

        {/* Right Grid of 4 Images */}
        {/* Right Grid of 4 Images */}
<div className="grid grid-cols-2 gap-4">
  {/* Image 1 */}
  <div className="text-center">
    <img
      src="/watch2.webp"
      alt="Luxury Watch"
      className="w-full h-80 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-500"
    />
    <h4 className="mt-2 text-lg font-semibold">Exclusive Offer</h4>
    <p className="text-sm text-gray-500">Elegant design with premium build</p>
  </div>

  {/* Image 2 */}
  <div className="text-center">
    <img
      src="/watch1.jpg"
      alt="Luxury Watch"
      className="w-full h-80 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-500"
    />
    <h4 className="mt-2 text-lg font-semibold">New Arrival</h4>
    <p className="text-sm text-gray-500">Latest style for modern trends</p>
  </div>

  {/* Image 3 */}
  <div className="text-center">
    <img
      src="/watch1.jpg"
      alt="Luxury Watch"
      className="w-full h-80 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-500"
    />
    <h4 className="mt-2 text-lg font-semibold">Luxury Edition</h4>
    <p className="text-sm text-gray-500">Crafted with timeless elegance</p>
  </div>

  {/* Image 4 */}
  <div className="text-center">
    <img
      src="https://watches-store-newdemo.myshopify.com/cdn/shop/files/image_1348.jpg?v=1754099596&width=600"
      alt="Luxury Watch"
      className="w-full h-80 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-500"
    />
    <h4 className="mt-2 text-lg font-semibold">Best Seller</h4>
    <p className="text-sm text-gray-500">Our most loved collection</p>
  </div>
</div>

      </div>
    </section>
  );
}
