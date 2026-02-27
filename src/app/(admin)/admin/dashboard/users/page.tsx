"use client";

import {useEffect, useState} from "react";
import {Callout, Heading} from "@radix-ui/themes";
import {UsersTable} from "@/components/features/admin/dashboard";
import {User} from "@/types/user.types";
import {fetchAllUsers} from "@/services/user.service";


export default function Dashboard() {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true);
				const data = await fetchAllUsers();
				setUsers(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unknown error occurred.",
				);
			} finally {
				setIsLoading(false);
			}
		};
		void fetchUsers();
	}, []);

	return (
		<main className="min-h-screen bg-[#f4f4f4] px-4 py-6 md:px-8">
			<div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4">
				<Heading as="h1" size="8" className="text-[#161616]">
					User Dashboard
				</Heading>
				<section className="border border-[#c6c6c6] bg-white p-5">
					{isLoading && <div className="text-sm text-[#525252]">Loading users...</div>}
					{error && !isLoading && (
						<Callout.Root color="red" role="alert" className="!rounded-none">
							<Callout.Text>Error: {error}</Callout.Text>
						</Callout.Root>
					)}
					{!isLoading && !error && (
						<div className="overflow-x-auto">
							<UsersTable rows={users} />
						</div>
					)}
				</section>
			</div>
		</main>
	);
}
