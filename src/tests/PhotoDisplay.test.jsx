import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PhotoDisplay from "../components/PhotoDisplay.jsx";

describe("PhotoDisplay", () => {
  it("renders game picture", () => {
    render(<PhotoDisplay />);
    const image = screen.getByAltText("game image");
    expect(image).toBeInTheDocument();
  });

  it("displays targeting box on image click", () => {
    render(<PhotoDisplay />);

    const image = screen.getByAltText("game image");
    fireEvent.click(image, { clientX: 100, clientY: 100 });

    const targetingBox = screen.getByTestId("targeting-box");
    expect(targetingBox).toBeInTheDocument();
    expect(targetingBox.style.left).toBe("50px");
    expect(targetingBox.style.top).toBe("50px");
  });

  it("displays dropdown on image click", () => {
    render(<PhotoDisplay />);

    const image = screen.getByAltText("game image");
    fireEvent.click(image, { clientX: 100, clientY: 100 });

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
  });
});
