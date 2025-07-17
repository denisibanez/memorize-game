import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import GameMenu from "@/components/Common/GameMenu/GameMenu";

describe("GameMenu", () => {
  it("calls handlers when buttons are clicked", () => {
    const onNewGame = jest.fn();
    const onShowScores = jest.fn();
    const onLogout = jest.fn();
    render(
      <GameMenu
        onNewGame={onNewGame}
        onShowScores={onShowScores}
        onLogout={onLogout}
        variant="desktop"
      />,
    );
    fireEvent.click(screen.getByLabelText(/New Game/i));
    fireEvent.click(screen.getByLabelText(/Score Board/i));
    fireEvent.click(screen.getByLabelText(/Logout/i));
    expect(onNewGame).toHaveBeenCalled();
    expect(onShowScores).toHaveBeenCalled();
    expect(onLogout).toHaveBeenCalled();
  });
});
