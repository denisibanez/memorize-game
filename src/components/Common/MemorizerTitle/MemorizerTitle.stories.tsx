import type { Meta, StoryObj } from "@storybook/react";
import MemorizerTitle from "./MemorizerTitle";

const meta: Meta<typeof MemorizerTitle> = {
  title: "Common/MemorizerTitle",
  component: MemorizerTitle,
  tags: ["autodocs"],
};
export default meta;

export const Default: StoryObj<typeof MemorizerTitle> = {
  args: {
    className: "",
  },
};
