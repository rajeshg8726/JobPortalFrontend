import React, { useEffect, useState } from "react";
import "./adminSide.css";
import axios from "axios";

const Categories = () => {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    catid: "",
  });

  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/getCategories`);
        if (response.data.CategoryData) {
          setCategory(response.data.CategoryData);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setMessage("Failed to fetch categories. Please try again later.");
      }
    };
    fetchCategories();
  }, [backendURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      let response;
      switch (formData.catid) {
        case "1":
          response = await axios.post(
            `${backendURL}/api/insertCompanyCat`,
            formData
          );
          break;
        case "2":
          response = await axios.post(
            `${backendURL}/api/insertBatchCat`,
            formData
          );
          break;
        case "3":
          response = await axios.post(
            `${backendURL}/api/insertDomainCat`,
            formData
          );
          break;
        case "4":
          response = await axios.post(
            `${backendURL}/api/insertExpLevelCat`,
            formData
          );
          break;
        case "5":
          response = await axios.post(
            `${backendURL}/api/insertLocationCat`,
            formData
          );
          break;
        case "6":
          response = await axios.post(
            `${backendURL}/api/insertPayCat`,
            formData
          );
          break;
        case "7":
          response = await axios.post(
            `${backendURL}/api/insertRoleCat`,
            formData
          );
          break;
        default:
          setMessage("Please select a valid category.");
          return;
      }
      setMessage(response.data.message || "Category added successfully!");
      setFormData({ name: "" });
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="modern-category-container">
      <form
        className="modern-category-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h1 className="modern-category-title">Add New Category</h1>
        {message && (
          <div
            className={`modern-category-message ${
              message.toLowerCase().includes("success") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}
        <div className="modern-category-field">
          <label htmlFor="catid">Select Category Type</label>
          <select
            id="catid"
            name="catid"
            value={formData.catid}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {category && category.length > 0 ? (
              category.map((cat) => (
                <option key={cat._id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>Loading Categories...</option>
            )}
            <option value="other">Other</option>
          </select>
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter category name"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="modern-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Categories;
