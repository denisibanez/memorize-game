import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserAvatar from "@/components/Common/UserAvatar/UserAvatar";

describe("UserAvatar", () => {
  it("renders user image when image prop is provided", () => {
    render(
      <UserAvatar
        image="https://randomuser.me/api/portraits/men/32.jpg"
        name="John Doe"
      />,
    );
    const img = screen.getByAltText("John Doe");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("randomuser.me"),
    );
  });

  it("renders fallback icon when image is not provided", () => {
    render(<UserAvatar name="No Avatar" />);
    expect(screen.getByTestId("user-avatar-fallback")).toBeInTheDocument();
  });
});
