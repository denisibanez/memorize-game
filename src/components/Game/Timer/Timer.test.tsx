import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Timer from "@/components/Game/Timer/Timer";

describe("Timer", () => {
  it("renders timer and clock icon", () => {
    render(<Timer running={true} scores={[30, 45, 60]} />);
    expect(screen.getByText(/:/)).toBeInTheDocument();
    expect(screen.getByTestId("fi-clock")).toBeInTheDocument();
  });

  it("shows trophy icon when in top 3", () => {
    render(<Timer running={false} scores={[30, 45, 60]} />);
    // The trophy only appears if the current time is less than any of the scores, so we force ms
    // As ms is 0 at the start, it should show the trophy
    expect(screen.getByTestId("fa-trophy")).toBeInTheDocument();
  });
});
