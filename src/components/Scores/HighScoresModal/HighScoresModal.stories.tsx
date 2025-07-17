import type { Meta, StoryObj } from "@storybook/react";
import HighScoresModal from "./HighScoresModal";

const meta: Meta<typeof HighScoresModal> = {
  title: "Scores/HighScoresModal",
  component: HighScoresModal,
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "close" },
  },
};
export default meta;

export const Open: StoryObj<typeof HighScoresModal> = {
  args: {
    open: true,
    onClose: () => {},
  },
};

export const Closed: StoryObj<typeof HighScoresModal> = {
  args: {
    open: false,
    onClose: () => {},
  },
};
