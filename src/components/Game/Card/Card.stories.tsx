import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "Game/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};
export default meta;

export const Default: StoryObj<typeof Card> = {
  args: {
    image: "https://picsum.photos/seed/storybook/120/120",
    flipped: false,
    matched: false,
  },
};

export const Flipped: StoryObj<typeof Card> = {
  args: {
    image: "https://picsum.photos/seed/storybook/120/120",
    flipped: true,
    matched: false,
  },
};

export const Matched: StoryObj<typeof Card> = {
  args: {
    image: "https://picsum.photos/seed/storybook/120/120",
    flipped: true,
    matched: true,
  },
};
