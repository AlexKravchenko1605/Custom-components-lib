import type { Meta, StoryObj } from "@storybook/react-webpack5";
import TextField from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Компоненты/TextField",
  component: TextField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const outlined: Story = {
  args: {
    variant: "outlined",
  },
};
