"use client";
import {SubmitHandler, useForm} from "react-hook-form";
import React from "react";
import Button from "@/components/ui/Button";
import {TextField} from "@radix-ui/themes";
import {LoginRequest} from "@/types/auth.types";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contexts/AuthContext";

export default function LoginPage() {
	const {register, handleSubmit} = useForm<LoginRequest>();
	const router = useRouter();
	const {login, isAuthenticated} = useAuth();
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	React.useEffect(() => {
		if (isAuthenticated) {
			router.replace("/");
		}
	}, [isAuthenticated, router]);

	const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
		try {
			setErrorMessage(null);
			setIsSubmitting(true);
			await login(data);
			router.push("/");
		} catch (error) {
			console.error("Failed login:", error);
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Unable to login with provided credentials.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className={"min-h-screen flex items-center justify-center"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-[400px]">
				<h1>Login</h1>
				{errorMessage && (
					<p className="text-sm text-red-600">{errorMessage}</p>
				)}
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
					{isSubmitting ? "Logging in..." : "Login"}
				</Button>
				<Button variant="secondary" type="button">
					Sign Up
				</Button>
			</form>
		</div>
	);
}
