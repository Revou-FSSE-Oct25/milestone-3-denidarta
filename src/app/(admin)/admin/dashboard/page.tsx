"use client";

import {useEffect, useState} from "react";

import {Heading, Table} from "@radix-ui/themes";
import {productService} from "@/services/product.service";
import {User} from "@/types/user.types";

export default function Dashboard() {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true);
				const data = await productService.getUsers();
				setUsers(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unknown error occurred.",
				);
			} finally {
				setIsLoading(false);
			}
		};
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<main>
			<Heading>User Dashboard</Heading>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Date Added</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{users.map((user) => (
						<Table.Row key={user.id}>
							<Table.RowHeaderCell>{user.name}</Table.RowHeaderCell>
							<Table.Cell>{user.email}</Table.Cell>
							<Table.Cell>
								{new Date(user.creationAt).toLocaleString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</main>
	);
}
