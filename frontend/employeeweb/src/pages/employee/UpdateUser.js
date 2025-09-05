import './UpdateUser.css';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Fetch existing employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/employee/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchEmployee();
  }, [id]);

  // Update employee
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
          method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("User updated successfully");
        navigate("/"); 
      } else {
        console.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className="center-form">
      <h1>Edit Employee</h1>
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
          Edit Employee
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
