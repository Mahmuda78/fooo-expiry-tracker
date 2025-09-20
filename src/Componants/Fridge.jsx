import { useState } from "react";
import { Link, useLoaderData } from "react-router";

const Fridge = () => {
  const foods = useLoaderData();
  const today = new Date().toISOString().split("T")[0];

  // 🔍 Search & Filter States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // 📄 Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  
  const filteredFoods = foods.filter((food) => {
    const matchSearch =
      food.foodTitle.toLowerCase().includes(search.toLowerCase()) ||
      food.foodCategory.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" || food.foodCategory === category;

    return matchSearch && matchCategory;
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">My Fridge</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search foods..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Meat">Meat</option>
          <option value="Dairy">Dairy</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Snacks">Snacks</option>
        </select>
      </div>

      {/* Food Cards */}
      {currentFoods.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No food items found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentFoods.map(
            ({ _id, foodTitle, quantity, imageUrl, foodCategory, expiryDate }) => (
              <div
                key={_id}
                className={`card card-side shadow-lg border-2 border-gray-200 ${
                  expiryDate < today
                    ? "bg-red-50 border border-red-400"
                    : "bg-base-100"
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
                      <span className="text-white px-2 rounded bg-red-500 text-sm">
                        Expired
                      </span>
                    )}
                  </h2>
                  <p>Quantity: {quantity}</p>
                  <p>Category: {foodCategory}</p>
                  <p>Expiry Date: {expiryDate}</p>

                  <div className="card-actions justify-end">
                    <Link to={`/food/${_id}`}>
                      <button className="btn btn-neutral btn-outline">
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fridge;
