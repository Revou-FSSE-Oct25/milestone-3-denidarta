import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import {fn} from "storybook/test";
import Button from "./Button";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "outline"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		isLoading: {control: "boolean"},
		disabled: {control: "boolean"},
		asChild: {control: "boolean"},
	},
	args: {onClick: fn()},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary Button",
	},
};
export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Button",
	},
};


