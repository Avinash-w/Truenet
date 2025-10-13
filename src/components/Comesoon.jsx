import { Link } from "react-router-dom";
// import { Sparkles } from "lucide-react";
 // optional icon

export default function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white text-center px-6 py-16">
      {/* Decorative Section */}
      <div className="max-w-2xl">
        <div className="flex items-center justify-center mb-4">
          {/* <Sparkles className="text-purple-600 w-8 h-8 mr-2" /> */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Women’s Collection Coming Soon
          </h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          We’re working on something elegant and timeless — just for you.
          Our <span className="font-semibold text-purple-600">Women’s Collection</span> 
          will be live soon, featuring exquisite designs crafted for style and confidence.
        </p>

        {/* Countdown Style Placeholder */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">00</p>
            <p className="text-sm text-gray-500">Days</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">00</p>
            <p className="text-sm text-gray-500">Hours</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">00</p>
            <p className="text-sm text-gray-500">Minutes</p>
          </div>
        </div>

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-lg"
        >
          Back to Home
        </Link>

        {/* Subtext */}
        <p className="mt-6 text-sm text-gray-500">
          Stay tuned — follow us on social media for the latest updates and exclusive previews.
        </p>
      </div>

      
    </div>
  );
}
