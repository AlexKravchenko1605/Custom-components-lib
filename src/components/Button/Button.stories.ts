import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Компоненты/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const small: Story = {
  args: {
    size: "small",
    children: "Кнопка",
  },
};
