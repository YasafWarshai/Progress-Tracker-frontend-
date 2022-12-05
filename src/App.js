import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./styles/theme";
import AuthProvider from "./context/AuthContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { UserRoute } from "./utils/ProtectedRoutes";
import NavBar from "./components/NavBar";

function App() {

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App;