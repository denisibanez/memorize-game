import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "@/components/Game/Card/Card";

describe("Card", () => {
  it("renders card image", () => {
    render(
      <Card
        image="https://picsum.photos/seed/test/120/120"
        flipped={true}
        matched={false}
        onClick={jest.fn()}
      />,
    );
    expect(screen.getByAltText("Memory Card")).toBeInTheDocument();
  });

  it("calls onClick when not flipped or matched", () => {
    const onClick = jest.fn();
    render(
      <Card
        image="/test.png"
        flipped={false}
        matched={false}
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call onClick when flipped or matched", () => {
    const onClick = jest.fn();
    render(
      <Card
        image="/test.png"
        flipped={true}
        matched={false}
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(onClick).not.toHaveBeenCalled();
    render(
      <Card
        image="/test.png"
        flipped={false}
        matched={true}
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(onClick).not.toHaveBeenCalled();
  });
});
