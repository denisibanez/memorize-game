import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import VictoryOverlay from "@/components/Game/VictoryOverlay/VictoryOverlay";

describe("VictoryOverlay", () => {
  const formatTime = (s: number) => `${s}s`;

  it("renders overlay when open", () => {
    render(
      <VictoryOverlay
        open={true}
        time={42}
        onRestart={jest.fn()}
        onShowScores={jest.fn()}
        formatTime={formatTime}
      />,
    );
    expect(screen.getByText(/You won/)).toBeInTheDocument();
    expect(screen.getByText(/42s/)).toBeInTheDocument();
  });

  it("does not render overlay when closed", () => {
    render(
      <VictoryOverlay
        open={false}
        time={42}
        onRestart={jest.fn()}
        onShowScores={jest.fn()}
        formatTime={formatTime}
      />,
    );
    expect(screen.queryByText(/You won/)).not.toBeInTheDocument();
  });

  it("calls handlers when buttons are clicked", () => {
    const onRestart = jest.fn();
    const onShowScores = jest.fn();
    render(
      <VictoryOverlay
        open={true}
        time={42}
        onRestart={onRestart}
        onShowScores={onShowScores}
        formatTime={formatTime}
      />,
    );
    fireEvent.click(screen.getByText(/Play again/i));
    fireEvent.click(screen.getByText(/Score board/i));
    expect(onRestart).toHaveBeenCalled();
    expect(onShowScores).toHaveBeenCalled();
  });
});
