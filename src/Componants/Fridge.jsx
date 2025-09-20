import { Link, useLoaderData } from "react-router";

const Fridge = () => {
  const foods = useLoaderData();

  const today = new Date().toISOString().split("T")[0];

  
  const expiredFood = foods.filter((food) => food.expiryDate < today);

//   console.log("Today:", today);
//   console.log("Expired Foods:", expiredFood);
  

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
      {foods.map(({ _id, foodTitle, quantity, imageUrl, foodCategory, expiryDate }) => (
        <div
          key={_id}
          className={`card card-side shadow-lg border-2 border-gray-200 ${
            expiryDate < today ? "bg-red-50 border border-red-400" : "bg-base-100"
          }`}
        >
          <figure>
            <img
              src={imageUrl}
              alt={foodTitle}
              className="w-32 h-32 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {foodTitle}{" "}
              {expiryDate < today && (
                <span className="text-white px-4 rounded  bg-red-500 text-2xl">Expired</span>
              )}
            </h2>
            <p>Quantity: {quantity}</p>
            <p>Category: {foodCategory}</p>
            
            <div className="card-actions justify-end">
              <Link to={`/food/${_id}`}><button className="btn btn-neutral btn-outline">Details</button></Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fridge;
