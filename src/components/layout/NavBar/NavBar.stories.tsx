import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import NavBar from "./NavBar";

const meta: Meta<typeof NavBar> = {
	component: NavBar,
	argTypes: {
		state: {
			control: {type: "select"},
			options: ["guest", "customer", "admin"],
		},
		userAvatarSrc: {
			control: {type: "text"},
		},
		userInitials: {
			control: {type: "text"},
		},
	},
	args: {
		state: "guest",
		userAvatarSrc: "https://i.pravatar.cc/80?img=32",
		userInitials: "JD",
	},
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Guest: Story = {
	args: {state: "guest"},
};

export const Customer: Story = {
	args: {state: "customer"},
};


export const Admin: Story = {
	args: {state: "admin"},
};
