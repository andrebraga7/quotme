import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={styles.Main}>
        <Routes>
          <Route path="*" element={<p>Not Found.</p>} />
          <Route path="/" element={<p>Home</p>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/discover" element={<p>Discover</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
