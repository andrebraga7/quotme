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
import QuoteEditForm from "./pages/quotes/QuoteEditForm";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={styles.Main}>
        <Routes>
          <Route path="*" element={<p>Not Found.</p>} />
          <Route
            path="/"
            element={
              currentUser ? (
                <QuotesPage
                  title="Home Feed"
                  subtitle="See quotes from people you follow."
                  message="No results found. Adjust the search keyword or follow a user."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/discover"
            element={
              <QuotesPage
                title="Discover"
                subtitle="Discover new quotes from the community."
              />
            }
          />
          <Route path="/quotes/:id" element={<QuotePage />} />
          <Route path="/quotes/create" element={<QuoteCreateForm />} />
          <Route path="/quotes/:id/edit" element={<QuoteEditForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
