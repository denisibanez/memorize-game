import type { Meta, StoryObj } from "@storybook/react";
import GameMenu from "@/components/Common/GameMenu/GameMenu";

const meta: Meta<typeof GameMenu> = {
  title: "Common/GameMenu",
  component: GameMenu,
  tags: ["autodocs"],
  argTypes: {
    onNewGame: { action: "new game" },
    onShowScores: { action: "show scores" },
    onLogout: { action: "logout" },
  },
};
export default meta;

export const Mobile: StoryObj<typeof GameMenu> = {
  args: {
    variant: "mobile",
  },
};

export const Desktop: StoryObj<typeof GameMenu> = {
  args: {
    variant: "desktop",
  },
};
