import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.firstName) formErrors.firstName = "First name is required";
    if (!formData.lastName) formErrors.lastName = "Last name is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      formErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      formErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.message) formErrors.message = "Message is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const response = await fetch("https://formspree.io/f/mjkvvjap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success("Message sent successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } else {
      toast.error("Failed to send message. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Contact Us</h1>

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        {errors.firstName && <p className="error-message">{errors.firstName}</p>}

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label>Phone Number:</label>
        <input
          type="text"  /* Changed to text to ensure consistent styling */
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        {errors.message && <p className="error-message">{errors.message}</p>}

        <button type="submit">Send</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
