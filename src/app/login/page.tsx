import React from "react";
import Button from '@/component/Button'
import {TextField} from "@radix-ui/themes"

export default function LoginPage() {
	return (
		<div>
			<h1>Login</h1>
			<TextField.Root placeholder={"Username..."}></TextField.Root>
			<TextField.Root placeholder={"Password..."}></TextField.Root>
			<Button variant="primary"> Login </Button>
			<Button variant="outline"> Sign Up</Button>
		</div>
	);
}
