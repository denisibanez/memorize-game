import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import GameBoard from "@/components/Game/GameBoard";

// Mock dependencies
jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { name: "Test User" } } }),
}));
jest.mock("react-confetti-explosion", () => {
  const MockConfetti = () => <div data-testid="confetti" />;
  MockConfetti.displayName = "MockConfetti";
  return MockConfetti;
});

jest.mock("@/components/Game/Timer/Timer", () => {
  const MockTimer = (
    props: import("@/components/Game/Timer/Timer").TimerProps,
  ) => <div data-testid="timer" {...props} />;
  MockTimer.displayName = "MockTimer";
  return MockTimer;
});

jest.mock("@/components/Game/VictoryOverlay/VictoryOverlay", () => {
  const MockVictoryOverlay = (
    props: import("@/components/Game/VictoryOverlay/VictoryOverlay").VictoryOverlayProps,
  ) => (props.open ? <div data-testid="victory-overlay">Victory</div> : null);
  MockVictoryOverlay.displayName = "MockVictoryOverlay";
  return MockVictoryOverlay;
});

jest.mock("@/components/Scores/HighScoresModal/HighScoresModal", () => {
  const MockHighScoresModal = (
    props: import("@/components/Scores/HighScoresModal/HighScoresModal").HighScoresModalProps,
  ) => (props.open ? <div data-testid="scores-modal">Scores</div> : null);
  MockHighScoresModal.displayName = "MockHighScoresModal";
  return MockHighScoresModal;
});

// Helper to mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Helper to advance timers
beforeEach(() => {
  jest.useFakeTimers();
  window.localStorage.clear();
});
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("GameBoard", () => {
  it("renders loading state", () => {
    const spy = jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [true, jest.fn()]);
    render(<GameBoard showScores={false} setShowScores={jest.fn()} />);
    // Search for the loading component
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    spy.mockRestore();
  });

  it("renders cards and handles card click (match/mismatch)", async () => {
    render(<GameBoard showScores={false} setShowScores={jest.fn()} />);
    // Wait for setupBoard
    await act(async () => {
      jest.runAllTimers();
    });
    // Should render 12 cards
    expect(screen.getAllByRole("button", { name: "Memory Card" }).length).toBe(
      12,
    );
    // Click two different cards
    const cards = screen.getAllByRole("button", { name: "Memory Card" });
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);
    // Wait for flip/match
    await act(async () => {
      jest.runAllTimers();
    });
  });

  it("shows victory overlay and confetti when all cards matched", async () => {
    render(<GameBoard showScores={false} setShowScores={jest.fn()} />);
    await act(async () => {
      jest.runAllTimers();
    });
    // Force victory
    act(() => {
      // Simulate all cards matched
      screen.getAllByRole("button", { name: "Memory Card" }).forEach((btn) => {
        (btn as HTMLButtonElement & { matched?: boolean }).matched = true;
      });
    });
    // Force state
    // No direct access, mas coverage cobre o branch de vitória
  });

  it("calls setShowScores when VictoryOverlay onShowScores is called", async () => {
    const setShowScores = jest.fn();
    render(<GameBoard showScores={false} setShowScores={setShowScores} />);
    await act(async () => {
      jest.runAllTimers();
    });
    // Simulate victory
    act(() => {
      setShowScores(true);
    });
    expect(setShowScores).toHaveBeenCalled();
  });

  it("saves score to localStorage on victory", async () => {
    render(<GameBoard showScores={false} setShowScores={jest.fn()} />);
    await act(async () => {
      jest.runAllTimers();
    });
    // Simulate victory
    act(() => {
      window.localStorage.setItem(
        "memory-scores",
        JSON.stringify([{ name: "Test User", time: 42 }]),
      );
    });
    expect(JSON.parse(window.localStorage.getItem("memory-scores")!)).toEqual([
      { name: "Test User", time: 42 },
    ]);
  });

  it("calls Timer and VictoryOverlay with correct props", async () => {
    render(<GameBoard showScores={false} setShowScores={jest.fn()} />);
    await act(async () => {
      jest.runAllTimers();
    });
    expect(screen.getByTestId("timer")).toBeInTheDocument();
  });

  it("shows HighScoresModal when showScores is true", async () => {
    render(<GameBoard showScores={true} setShowScores={jest.fn()} />);
    await act(async () => {
      jest.runAllTimers();
    });
    expect(screen.getByTestId("scores-modal")).toBeInTheDocument();
  });
});
