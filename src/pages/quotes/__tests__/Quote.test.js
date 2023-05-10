import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Quote from "../Quote";

test("render edit button to quote owner", async () => {
  const quote = {
    id: 9,
    owner: "andrecoma",
    created_at: "02 May 2023",
    updated_at: "05 May 2023",
    category: "originals",
    author: "Andre com A",
    content: "Numa sociedade HDR, a fuga é tirar polaroids.",
    is_owner: true,
    profile_id: 1,
    profile_image:
      "https://res.cloudinary.com/andrebraga7/image/upload/v1/media/images/profile_rbovub",
    like_id: null,
    save_id: null,
    author_id: 1,
    comments_count: 1,
    likes_count: 1,
  };

  render(
    <Router>
      <Quote {...quote} quotePage />
    </Router>
  );

  const usernameSpan = await screen.findByText("andrecoma");
  expect(usernameSpan).toBeInTheDocument();
});
