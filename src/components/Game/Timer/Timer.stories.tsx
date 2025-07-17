import type { Meta, StoryObj } from "@storybook/react";
import Timer from "./Timer";

const meta: Meta<typeof Timer> = {
  title: "Game/Timer",
  component: Timer,
  tags: ["autodocs"],
};
export default meta;

export const Running: StoryObj<typeof Timer> = {
  args: {
    running: true,
    scores: [30, 45, 60],
  },
};

export const Stopped: StoryObj<typeof Timer> = {
  args: {
    running: false,
    scores: [30, 45, 60],
  },
};
