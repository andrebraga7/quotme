import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test("render NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const loginLink = screen.getByRole("link", { name: "Login" });
  expect(loginLink).toBeInTheDocument();
});

test("render link to the profile for a logged in users", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("andrecoma");
  expect(profileAvatar).toBeInTheDocument();
});

test("renders Login in and Sign up again on logout", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const logoutLink = await screen.findByRole("link", { name: "Logout" });
  fireEvent.click(logoutLink);

  const loginLink = await screen.findByRole("link", {name: "Login"});
  const signUpLink = await screen.findByRole("link", {name: "Sign Up"});

  expect(loginLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();

});
