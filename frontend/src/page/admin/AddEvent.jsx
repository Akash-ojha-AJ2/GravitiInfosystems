import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const backend = import.meta.env.VITE_BACKEND

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    address: "",
    date: "",
    totalSeats: "",
    availableSeats: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("category", form.category);
  formData.append("address", form.address);
  formData.append("date", form.date);
  formData.append("totalSeats", form.totalSeats);
  formData.append("availableSeats", form.availableSeats);
  formData.append("price", form.price);
  formData.append("image", form.image); // 🔥 file

  try {
    await axios.post(
      `${backend}/api/AdminEvent/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Event added successfully");
    navigate("/all-events");
  } catch (error) {
    alert(error.response?.data?.message || "Failed to add event");
  }
};


  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Add New Event</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        <input className="form-control" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea className="form-control" name="description" placeholder="Description" onChange={handleChange} required />
        <input className="form-control" name="category" placeholder="Category" onChange={handleChange} required />
        <input className="form-control" name="address" placeholder="Address" onChange={handleChange} required />

        <input type="date" className="form-control" name="date" onChange={handleChange} required />

        <input className="form-control" name="totalSeats" placeholder="Total Seats" onChange={handleChange} required />
        <input className="form-control" name="availableSeats" placeholder="Available Seats" onChange={handleChange} required />
        <input className="form-control" name="price" placeholder="Price" onChange={handleChange} required />

        <input
          type="file"
          className="form-control"
          name="image"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          required
        />
        <button className="btn btn-primary">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
