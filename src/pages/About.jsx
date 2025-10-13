import Banner from "../components/Banner3D";
import TwoImageSection from "../components/TwoImageSection";

export default function About() {
  return (
    <>
      <Banner />
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
        <img src="/light-box.webp" alt="About" 
                    className="w-1/2 h-auto rounded-xl shadow-lg object-cover"/>
  </div>   

        <div className="md:w-1/2">
      <h2 className="text-2xl text-purple-600 mb-4">About Page</h2>
<p className="text-gray-700 mb-4">
            Welcome to our platform! We are dedicated to providing the best solutions for our clients with innovation, commitment, and excellence.
          </p>
          <p className="text-gray-700 mb-4">
            Our team specializes in delivering top-notch services, ensuring your projects succeed while maintaining a customer-first approach.
          </p>
          <p className="text-gray-700 mb-6">
            We value creativity, transparency, and efficiency. Join us on this journey to make a meaningful impact together.
          </p>
{/* Button */}
          <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300">
            Know More
          </button>    
          </div>   
            
      </div>
            <TwoImageSection />
      
    </>
  );
}
