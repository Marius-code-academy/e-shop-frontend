import { Button, Container, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import registerUserSchema from "../../validationSchemas/registerUserSchema";
import { handleRegister } from "../../api/auth";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const styles = { display: "flex", alignItems: "center", justifyContent: "center" };

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    postCode: "",
  });

  const navigate = useNavigate();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await registerUserSchema.validate(formData);
      await handleRegister(formData);
      navigate(routes.login());
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error);
      } else {
        alert("Validation error: " + error);
      }
    }
  }

  return (
    <Container sx={styles}>
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <Input type="text" id="name-input" name="name" value={formData.name} onChange={handleInputChange} /> <br />
        <InputLabel htmlFor="last-name-input">Last name</InputLabel>
        <Input type="text" id="last-name-input" name="lastName" value={formData.lastName} onChange={handleInputChange} /> <br />
        <InputLabel htmlFor="email-input">Email</InputLabel>
        <Input type="email" id="email-input" name="email" value={formData.email} onChange={handleInputChange} /> <br />
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <Input type="password" id="password-input" name="password" value={formData.password} onChange={handleInputChange} /> <br />
        <InputLabel htmlFor="phone-input">Phone number</InputLabel>
        <Input type="text" id="phone-input" name="phone" value={formData.phone} onChange={handleInputChange} /> <br />
        <InputLabel htmlFor="address-input">Address</InputLabel>
        <Input type="text" id="address-input" name="address" value={formData.address} onChange={handleInputChange} /> <br />
        <InputLabel htmlFor="post-code-input">Post code</InputLabel>
        <Input type="text" id="post-code-input" name="postCode" value={formData.postCode} onChange={handleInputChange} /> <br />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Container>
  );
}
