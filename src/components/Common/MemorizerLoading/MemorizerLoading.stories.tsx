import type { Meta, StoryObj } from "@storybook/react";
import MemorizerLoading from "./MemorizerLoading";

const meta: Meta<typeof MemorizerLoading> = {
  title: "Common/MemorizerLoading",
  component: MemorizerLoading,
  tags: ["autodocs"],
};
export default meta;

export const Default: StoryObj<typeof MemorizerLoading> = {
  args: {},
};
