"use client";
import {SubmitHandler, useForm} from "react-hook-form";
import React from "react";
import Button from "@/components/ui/Button";
import {TextField} from "@radix-ui/themes";
import {LoginRequest} from "@/types/auth.types";
import {sendLoginRequest} from "@/services/auth.service";
import {setAuthCookies} from "@/utils/cookies.client";
import {useRouter} from "next/navigation";

export default function LoginPage() {
	const {register, handleSubmit} = useForm<LoginRequest>();
	const router = useRouter();
	const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
		try {
			const response = await sendLoginRequest(data);
			await setAuthCookies(response.accessToken, response.refreshToken);
			window.dispatchEvent(new Event("auth:changed"));
			// Optionally, redirect the user after successful login
			router.push("/dashboard");
		} catch (error) {
			console.error("Failed login:", error);
		}

		console.log(data);
	};
	return (
		<div className={"min-h-screen flex items-center justify-center"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-[400px]">
				<h1>Login</h1>
				<TextField.Root
					{...register("email")}
					type={"email"}
					placeholder={"Username..."}
				></TextField.Root>
				<TextField.Root
					{...register("password")}
					type={"password"}
					placeholder={"Password..."}
				></TextField.Root>
				<Button type={"submit"} variant="primary">
					{" "}
					Login{" "}
				</Button>
				<Button variant="secondary"> Sign Up</Button>
			</form>
		</div>
	);
}
