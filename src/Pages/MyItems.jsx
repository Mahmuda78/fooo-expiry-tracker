import { use, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthContext/AuthContext";


const MyItems = () => {
  const { user } = use(AuthContext)
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);

  // fetch my items
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-items/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
           
            console.log(data)
          setFoods(data);
          setLoading(false);
        });
    }
  }, [user?.email]);

  // delete item
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/foods/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your food item has been deleted.", "success");
              setFoods(foods.filter((f) => f._id !== id));
            }
          });
      }
    });
  };

  // update modal submit
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedFood = {
      foodTitle: form.foodTitle.value,
      category: form.category.value,
      quantity: form.quantity.value,
      expiryDate: form.expiryDate.value,
      description: form.description.value,
    };

    fetch(`http://localhost:5000/foods/${selectedFood._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Food information updated successfully.", "success");
          setFoods(
            foods.map((f) =>
              f._id === selectedFood._id ? { ...f, ...updatedFood } : f
            )
          );
          setSelectedFood(null); // modal close
        }
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">My Items</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Food Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => 
             (
              <tr key={food._id}>
                <td>
                  <img
                    src={food.imageUrl}
                    alt={food.foodTitle}
                    className="w-16 h-16 rounded"
                  />
                </td>
                <td>{food.foodTitle}</td>
              
                
                <td>{food.foodCategory}</td>
                <td>{food.quantity}</td>
                <td>{new Date(food.expiryDate).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => setSelectedFood(food)}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Update Food</h3>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="foodTitle"
                defaultValue={selectedFood.foodTitle}
                placeholder="Food Title"
                className="input input-bordered w-full mb-2"
              />
              <input
                type="text"
                name="category"
                defaultValue={selectedFood.category}
                placeholder="Category"
                className="input input-bordered w-full mb-2"
              />
              <input
                type="number"
                name="quantity"
                defaultValue={selectedFood.quantity}
                placeholder="Quantity"
                className="input input-bordered w-full mb-2"
              />
              <input
                type="date"
                name="expiryDate"
                defaultValue={selectedFood.expiryDate?.split("T")[0]}
                className="input input-bordered w-full mb-2"
              />
              <textarea
                name="description"
                defaultValue={selectedFood.description}
                placeholder="Description"
                className="textarea textarea-bordered w-full mb-2"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedFood(null)}
                  className="btn btn-sm mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItems;
