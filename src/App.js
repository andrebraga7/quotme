import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import "./api/axiosDefaults";
import { Routes, Route } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import QuoteCreateForm from "./pages/quotes/QuoteCreateForm";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import QuotePage from "./pages/quotes/QuotePage";
import QuotesPage from "./pages/quotes/QuotesPage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={styles.Main}>
        <Routes>
          <Route path="*" element={<p>Not Found.</p>} />
          <Route path="/" element={currentUser ? (<h1>Home Feed</h1>) : <Home />} />
          <Route path="/discover" element={<QuotesPage />} />
          <Route path="/quotes/:id" element={<QuotePage />} />
          <Route path="/quotes/create" element={<QuoteCreateForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
