import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MemorizerTitle from "@/components/Common/MemorizerTitle/MemorizerTitle";

describe("MemorizerTitle", () => {
  it("renders the MEMORIZER title", () => {
    render(<MemorizerTitle />);
    expect(screen.getByText(/MEMORIZER/i)).toBeInTheDocument();
  });
});
