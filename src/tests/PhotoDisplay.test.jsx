import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PhotoDisplay from "../components/PhotoDisplay.jsx";

describe("PhotoDisplay", () => {
  it("renders game picture", () => {
    render(<PhotoDisplay />);
    const image = screen.getByAltText("game image");
    expect(image).toBeInTheDocument();
  });
});
