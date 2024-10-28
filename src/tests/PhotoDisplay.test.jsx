import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PhotoDisplay from "../components/PhotoDisplay.jsx";

const mockSendCoordinates = vi.fn();

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

  it("remove targeting-box on second click", () => {
    render(<PhotoDisplay />);

    const image = screen.getByAltText("game image");
    fireEvent.click(image, { clientX: 100, clientY: 100 });

    const targetingBox = screen.getByTestId("targeting-box");
    expect(targetingBox).toBeInTheDocument();
    expect(targetingBox.style.left).toBe("50px");
    expect(targetingBox.style.top).toBe("50px");

    fireEvent.click(image, { clientX: 300, clientY: 300 });
    expect(targetingBox).not.toBeInTheDocument();
  });

  it("sends coordinates to backend", async () => {
    render(<PhotoDisplay sendCoordinates={mockSendCoordinates} />);

    const image = screen.getByAltText("game image");

    fireEvent.click(image, { clientX: 1315, clientY: 1837 });

    const tomOption = screen.getByRole("listitem", { name: /Tom/i });

    fireEvent.click(tomOption);

    expect(mockSendCoordinates).toHaveBeenCalledWith(
      { x: 1315, y: 1837 },
      { character: "Tom" }
    );
    expect(mockSendCoordinates).toHaveBeenCalledTimes(1);
  });
});
