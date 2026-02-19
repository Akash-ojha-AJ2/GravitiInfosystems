import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const backend = import.meta.env.VITE_BACKEND

  const [form, setForm] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(
        `${backend}/api/events/${id}`
      );

      const e = res.data.event;

      setForm({
        title: e.title,
        description: e.description,
        category: e.category,
        address: e.address,
        date: e.date.split("T")[0],
        totalSeats: e.totalSeats,
        availableSeats: e.availableSeats,
        price: e.price,
        image: null, 
      });

      setPreview(e.image); 
    };

    fetchEvent();
  }, [id]);

  if (!form) return <p className="text-center mt-5">Loading...</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("address", form.address);
    formData.append("date", form.date);
    formData.append("totalSeats", form.totalSeats);
    formData.append("availableSeats", form.availableSeats);
    formData.append("price", form.price);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await axios.put(
        `${backend}/api/AdminEvent/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Event updated successfully");
      navigate("/all-events");
    
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }finally {
    setLoading(false);   
  }

  };

  return (
   <div className="container py-5 ">
      <h2 className="fw-bold mb-4">Edit Event</h2>

<form
  onSubmit={handleSubmit}
  className="row g-3"
 
>

        <input
          className="form-control"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          className="form-control"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          className="form-control"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          className="form-control"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          className="form-control"
          name="totalSeats"
          value={form.totalSeats}
          onChange={handleChange}
          required
        />

        <input
          className="form-control"
          name="availableSeats"
          value={form.availableSeats}
          onChange={handleChange}
          required
        />

        <input
          className="form-control"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {preview && (
          <div className="col-12">
            <img
              src={preview}
              alt="Preview"
              style={{ width: "200px", borderRadius: "10px" }}
              className="mb-3"
            />
          </div>
        )}

        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />

<button
  className="btn btn-warning mt-3"
  disabled={loading}
  style={{
   
    transition: "0.3s",
  }}
>
  {loading ? "Editing..." : "Update Event"}
</button>
      </form>
    </div>
  );
};

export default EditEvent;
