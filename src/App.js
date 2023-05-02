import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import "./api/axiosDefaults";
import { Routes, Route } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import QuoteCreateForm from "./pages/quotes/QuoteCreateForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={styles.Main}>
        <Routes>
          <Route path="*" element={<p>Not Found.</p>} />
          <Route path="/" element={<p>Home</p>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/quotes/create" element={<QuoteCreateForm />} />
          <Route path="/discover" element={<p>Discover</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
