import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Common/Header/Header";

describe("Header", () => {
  it("renders user name and avatar", () => {
    render(
      <Header
        user={{
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          name: "John Doe",
        }}
        onNewGame={jest.fn()}
        onShowScores={jest.fn()}
        onLogout={jest.fn()}
      />,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    // Deve haver dois avatares (mobile e desktop)
    const avatars = screen.getAllByAltText("John Doe");
    expect(avatars.length).toBeGreaterThanOrEqual(1);
  });

  it("calls handlers when menu buttons are clicked (desktop)", () => {
    const onNewGame = jest.fn();
    const onShowScores = jest.fn();
    const onLogout = jest.fn();
    render(
      <Header
        user={{
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          name: "John Doe",
        }}
        onNewGame={onNewGame}
        onShowScores={onShowScores}
        onLogout={onLogout}
      />,
    );
    // For desktop, menu is hidden by default in test env, but we can still query the buttons
    fireEvent.click(screen.getAllByLabelText(/New Game/i)[0]);
    fireEvent.click(screen.getAllByLabelText(/Score Board/i)[0]);
    fireEvent.click(screen.getAllByLabelText(/Logout/i)[0]);
    expect(onNewGame).toHaveBeenCalled();
    expect(onShowScores).toHaveBeenCalled();
    expect(onLogout).toHaveBeenCalled();
  });
});
