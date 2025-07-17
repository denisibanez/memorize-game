import type { Meta, StoryObj } from "@storybook/react";
import Header from "@/components/Common/Header/Header";

const meta: Meta<typeof Header> = {
  title: "Common/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    onNewGame: { action: "new game" },
    onShowScores: { action: "show scores" },
    onLogout: { action: "logout" },
  },
};
export default meta;

export const Default: StoryObj<typeof Header> = {
  args: {
    user: {
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "John Doe",
    },
  },
};
