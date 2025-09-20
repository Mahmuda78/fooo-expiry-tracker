import { useLoaderData } from "react-router";
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthContext/AuthContext";

const FoodDetails = () => {
  const { user } = use(AuthContext); 
  const food = useLoaderData();

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (food) {
      setNotes(food.notes || []);
      calculateTimeLeft(food.expiryDate);
    }
  }, [food]);

  const calculateTimeLeft = (expiryDate) => {
    const now = new Date();
    const exp = new Date(expiryDate);
    const diff = exp - now;

    if (diff <= 0) setTimeLeft("Expired");
    else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m left`);
    }
  };

  const handleAddNote = async () => {
    if (!note || !user?.email) return;

    try {
      const { data } = await axios.post(
        `http://localhost:5000/foods/${food._id}/notes`,
        {
          userEmail: user.email, 
          text: note,
        }
      );

      setNotes(data.notes); 
      setNote("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  if (!food) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="h-48 w-48"
        />
      </div>
    );
  }

  const canAddNote = food.userEmail === user?.email; 

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Fade cascade damping={0.2} triggerOnce>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          
         
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="avatar">
              <div className="mask mask-squircle h-32 w-32 shadow-lg">
                <img
                  src={food.imageUrl}
                  alt={food.foodTitle}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                {food.foodTitle}
              </h2>
              <span className="badge badge-neutral py-2 px-4 text-lg">
                {food.foodCategory}
              </span>
            </div>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-orange-50 p-4 rounded-xl shadow-inner">
              <span className="font-semibold">Description:</span>
              <p className="mt-2">{food.description}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl shadow-inner space-y-2">
              <p>
                <span className="font-semibold">Quantity: </span>
                {food.quantity}
              </p>
              <p>
                <span className="font-semibold">Expiry Date: </span>
                {new Date(food.expiryDate).toLocaleDateString()}
              </p>
              <p className="text-red-600 font-bold">Expiration: {timeLeft}</p>
            </div>
          </div>

          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Add Note</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="border p-3 w-full rounded-lg"
              placeholder="Write your note..."
              disabled={!canAddNote}
            />
            <button
              onClick={handleAddNote}
              disabled={!canAddNote}
              className="btn btn-success disabled:opacity-90 disabled:text-gray-600"
            >
              Add Note
            </button>
            {!canAddNote && (
              <p className="text-sm text-yellow-500 mt-2">
                Only the user who added this food can submit a note.
              </p>
            )}
          </div>

         
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4">Notes</h3>
            {notes.length === 0 ? (
              <p>No notes yet.</p>
            ) : (
              notes.map((n, i) => (
                <div
                  key={i}
                  className="border p-3 my-2 rounded-lg bg-orange-100 shadow-sm"
                >
                  <p>{n.text}</p>
                  <small className="text-gray-700">
                    Date: {new Date(n.postedAt).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>

        </div>
      </Fade>
    </div>
  );
};

export default FoodDetails;
