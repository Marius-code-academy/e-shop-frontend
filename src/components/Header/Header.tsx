import { AppBar, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useAuth } from "../../providers/AuthProvider";
import { useCookies } from "react-cookie";

export default function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  function handleLogount() {
    removeCookie("token");
    navigate(routes.login());
  }

  return (
    <AppBar position="static">
      <Box display={"flex"} justifyContent={"end"} padding={1}>
        {!isAuthenticated ? (
          <>
            <Button color="inherit" variant="text" onClick={() => navigate(routes.login())}>
              Login
            </Button>
            <Button color="inherit" variant="text" onClick={() => navigate(routes.register())}>
              Register
            </Button>
          </>
        ) : (
          <Button onClick={handleLogount} color="inherit" variant="text">
            Logout
          </Button>
        )}
      </Box>
    </AppBar>
  );
}
