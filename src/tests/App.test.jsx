import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders headline", () => {
    render(<App title="React" />);
    expect(screen.getByRole("heading").textContent).toMatch(
      "Photo Tagging App"
    );
    screen.debug();
  });
});
