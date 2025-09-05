import "./PostUser.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data before POST:", formData);

    try {
      const response = await fetch("/api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("Employee created", data);
      navigate("/");
    } catch (error) {
      console.log("Error creating employee", error.message);
    }
  };

  return (
    <div className="center-form">
      <h1>Post New Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="name"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleInputChange}
            autoComplete="tel"
          />
        </Form.Group>

        <Form.Group controlId="formDepartment">
          <Form.Control
            type="text"
            name="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={handleInputChange}
            autoComplete="organization"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Post Employee
        </Button>
      </Form>
    </div>
  );
};

export default PostUser;
