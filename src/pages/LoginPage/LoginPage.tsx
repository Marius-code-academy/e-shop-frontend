import { FormEvent, useState } from "react";
import { Button, Input, InputLabel, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { handleLogin } from "../../api/auth";
import { AxiosError } from "axios";
import { useAuth } from "../../providers/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState("");

  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { token } = await handleLogin({ email, password });
      setCookie("token", token);
      setIsAuthenticated(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="input-email">Email</InputLabel>
        <Input type="email" id="input-email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
        <InputLabel htmlFor="input-password">Password</InputLabel>
        <Input type="password" id="input-password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {error && <Typography variant="body1">{error}</Typography>}
    </div>
  );
}
