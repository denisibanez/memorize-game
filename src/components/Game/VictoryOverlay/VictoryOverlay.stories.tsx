import type { Meta, StoryObj } from "@storybook/react";
import VictoryOverlay from "./VictoryOverlay";

const meta: Meta<typeof VictoryOverlay> = {
  title: "Game/VictoryOverlay",
  component: VictoryOverlay,
  tags: ["autodocs"],
  argTypes: {
    onRestart: { action: "restart" },
    onShowScores: { action: "show scores" },
    formatTime: { control: false },
  },
};
export default meta;

const formatTime = (seconds: number) => `${seconds}s`;

export const Open: StoryObj<typeof VictoryOverlay> = {
  args: {
    open: true,
    time: 42,
    onRestart: () => {},
    onShowScores: () => {},
    formatTime,
  },
};

export const Closed: StoryObj<typeof VictoryOverlay> = {
  args: {
    open: false,
    time: 42,
    onRestart: () => {},
    onShowScores: () => {},
    formatTime,
  },
};
