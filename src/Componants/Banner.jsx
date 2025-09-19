import { Link } from "react-router";


const Banner = () => {
  

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-base-200 shadow">
    
        
      </div>

      {/* Carousel Section */}
      <div className="carousel w-full h-[400px]">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/rKcrN4Ww/reduce-food-waste.jpg"
            className="object-cover w-full"
          />
          <div className="absolute flex items-center h-full bg-black/40 text-white px-10">
            <div className="ml-8">
              <h2 className="text-3xl font-bold">Reduce Food Waste</h2>
              <p className="mt-2">
                Track expiry dates and save money — small habits, big impact.
              </p>
              <Link
                to="/fridge"
                className="btn mt-4 bg-green-500 border-none text-white"
              >
                Explore Fridge
              </Link>
            </div>
          </div>
          <a href="#slide3" className="btn btn-circle absolute left-5 top-1/2">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle absolute right-5 top-1/2">
            ❯
          </a>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/ym72Kt6T/meal-plan.jpg"
            className="w-full object-cover"
          />
          <div className="absolute flex items-center h-full bg-black/50 text-white px-10">
            <div className="ml-8">
              <h2 className="text-3xl font-bold">Plan Smarter Meals</h2>
              <p className="mt-2">
                See what’s in your fridge and reduce last-minute shopping trips.
              </p>
              <Link
                to="/addFood"
                className="btn mt-4 bg-green-500 border-none text-white"
              >
                Add Food
              </Link>
            </div>
          </div>
          <a href="#slide1" className="btn btn-circle absolute left-5 top-1/2">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle absolute right-5 top-1/2">
            ❯
          </a>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/tpRB2HzB/stay-noticed.webp"
            className="w-full object-cover"
          />
          <div className="absolute flex items-center h-full bg-black/40 text-white px-10">
            <div className="ml-8">
              <h2 className="text-3xl font-bold">Stay Notified</h2>
              <p className="mt-2">
                Set expiry reminders and keep your family in sync.
              </p>
              <Link
                to="/reminders"
                className="btn mt-4 bg-green-500 border-none text-white"
              >
                View Reminders
              </Link>
            </div>
          </div>
          <a href="#slide2" className="btn btn-circle absolute left-5 top-1/2">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle absolute right-5 top-1/2">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
