import React, { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext/AuthContext';



const AddFood = () => {
    const { user } = use(AuthContext);
    // console.log(user);

    const handleAddFood = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newFood = Object.fromEntries(formData.entries());
        // console.log(newFood);

        
        fetch('http://localhost:5000/foods', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFood)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Food created successfully!",
                        icon: "success",
                        draggable: true
                    });
                    form.reset();
                }
            })
    }

    const foodCategories = [
        "Dairy",
        "Meat",
        "Vegetables",
        "Snacks",
        
    ];

    return (
        <div className='p-12 max-w-5xl mx-auto'>

            <div className='p-6 text-center space-y-4'>
                <h1 className="text-4xl md:text-6xl font-bold">Add Food</h1>
                
            </div>


            <form onSubmit={handleAddFood} className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                <fieldset className="fieldset bg-base-200 border rounded-box border-base-300 p-4 col-span-2">
                    <label className="label text-black font-semibold">Food title</label>
                    <input type="text" name='foodTitile' className="input w-full" placeholder="Enter food name" required />
                </fieldset>

                <fieldset className="fieldset bg-base-200 border rounded-box border-base-300 p-4 col-span-2">
                    <label className="label text-black font-semibold">Food Category</label>
                    <select name="foodCategory" className="select w-full" required>
                        <option value="">Select a category</option>
                        {foodCategories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                </fieldset>

                <fieldset className="fieldset bg-base-200 border rounded-box border-base-300 p-4">
                    <label className="label text-black font-semibold">Quantity</label>
                    <input type="number" name='quantity' className="input w-full" placeholder="Quantity" required />
                </fieldset>
                <fieldset className="fieldset bg-base-200 border rounded-box border-base-300 p-4">
                    <label className="label text-black font-semibold">Expiry Date</label>
                    <input type="date" name='expiryDate' className="input w-full" required />
                </fieldset>

                <fieldset className="fieldset bg-base-200 border rounded-box border-base-300 p-4 col-span-2">
                    <label className="label text-black font-semibold">Food Image Url</label>
                    <input type="text" name='imageUrl' className="input w-full" placeholder="food photo URL" required />
                </fieldset>

                <fieldset className="fieldset bg-base-200 border rounded-box border-base-300 p-4 col-span-2">
                    <label className="label text-black font-semibold">Description</label>
                    <textarea name='description' className="textarea w-full" placeholder="Write about the food..." required></textarea>
                </fieldset>

                <fieldset className="fieldset bg-base-200  border rounded-box border-base-300 p-4">
                    <label className="label text-black font-semibold">User Name</label>
                    <input type="text" name='userName' defaultValue={user?.displayName || ''} readOnly className="input w-ful" />
                </fieldset>

                <fieldset className="fieldset bg-base-200 border rounded-box border-base-300 p-4">
                    <label className="label text-black font-semibold">User Email</label>
                    <input type="email" name='userEmail' defaultValue={user?.email || ''} readOnly className="input w-full" />
                </fieldset>

                <div className='col-span-2'>
                    <input type="submit" className='btn  btn-outline btn-neutral w-full' value="Add food" />
                </div>
            </form>
        </div>
    );
};

export default AddFood;