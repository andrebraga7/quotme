import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

test("renders developed by Andre Braga", () => {
  render(<Footer />)
  const spanElement = screen.getByText("Developed by Andre Braga");
  expect(spanElement).toBeInTheDocument();
});