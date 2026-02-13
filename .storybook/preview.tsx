import type {Preview} from "@storybook/nextjs-vite";
import React from "react";
import {Theme} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "../src/app/globals.css";

const preview: Preview = {
	decorators: [
		(Story) =>
			React.createElement(
				Theme,
				null,
				React.createElement(Story)
			),
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;