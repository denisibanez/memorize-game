import type { Meta, StoryObj } from "@storybook/react";
import UserAvatar from "./UserAvatar";

const meta: Meta<typeof UserAvatar> = {
  title: "Common/UserAvatar",
  component: UserAvatar,
  tags: ["autodocs"],
};
export default meta;

export const WithImage: StoryObj<typeof UserAvatar> = {
  args: {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "John Doe",
  },
};

export const WithoutImage: StoryObj<typeof UserAvatar> = {
  args: {
    name: "No Avatar",
  },
};
