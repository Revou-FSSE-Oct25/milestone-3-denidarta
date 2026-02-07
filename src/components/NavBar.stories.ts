import NavBar from "./NavBar";

export default {
	component: NavBar,
	argTypes: {
		state: {
			control: {type: "select"},
			options: ["guest", "user", "admin"],
		},
	},
};

export const Guest = {
	args: {state: "guest"}
};

export const LoggedInUser = {
	args: {state: "user"}
};

export const Admin = {
	args: {state: "admin"}
};