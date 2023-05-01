import Container from "react-bootstrap/Container";
import "./App.module.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Routes>
          <Route path="*" element={<p>Not Found.</p>} />
          <Route path="/" element={<p>Home</p>} />
          <Route path="/discover" element={<p>Discover</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
