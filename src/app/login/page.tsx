"use client";
import {SubmitHandler, useForm} from "react-hook-form";
import React from "react";
import Button from "@/components/Button";
import {TextField} from "@radix-ui/themes";
import {LoginRequest} from "@/types/auth.types";
import {sendLoginRequest} from "@/services/auth.service";

export default function LoginPage() {
	const {register, handleSubmit} = useForm<LoginRequest>();
	const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
		try {
			const response = await sendLoginRequest(data);
			const tokenWindow = window.open("", "_blank");
			tokenWindow?.document.write(`
         <pre>${JSON.stringify(response, null, 2)}</pre>
      `);
		} catch (error) {
			console.error("Failed login:", error);
		}

		console.log(data);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Login</h1>
				<TextField.Root {...register("email")} type={"email"} placeholder={"Username..."}></TextField.Root>
				<TextField.Root {...register("password")} type={"password"}
				                placeholder={"Password..."}></TextField.Root>
				<Button type={"submit"} variant="primary"> Login </Button>
				<Button variant="secondary"> Sign Up</Button>
			</form>
		</div>
	);
}
