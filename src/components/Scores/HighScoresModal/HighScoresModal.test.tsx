import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import HighScoresModal from "@/components/Scores/HighScoresModal/HighScoresModal";

describe("HighScoresModal", () => {
  it("renders modal when open", () => {
    render(<HighScoresModal open={true} onClose={jest.fn()} />);
    expect(screen.getByText(/Fastest memorizers/i)).toBeInTheDocument();
  });

  it("does not render modal when closed", () => {
    render(<HighScoresModal open={false} onClose={jest.fn()} />);
    expect(screen.queryByText(/Fastest memorizers/i)).not.toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked", () => {
    const onClose = jest.fn();
    render(<HighScoresModal open={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalled();
  });
});
