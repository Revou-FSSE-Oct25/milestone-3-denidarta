"use client";

import {Table} from "@radix-ui/themes";
import {User} from "@/types/user.types";

export interface UsersTableProps {
	rows: User[];
	emptyMessage?: string;
}

export default function UsersTable({
	rows,
	emptyMessage = "No users found.",
}: UsersTableProps) {
	return (
		<Table.Root
			variant="surface"
			className="min-w-[680px] border border-[#c6c6c6] bg-white text-[#161616]"
		>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell className="border-b border-[#c6c6c6] bg-[#f4f4f4] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#525252]">
						Full name
					</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell className="border-b border-[#c6c6c6] bg-[#f4f4f4] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#525252]">
						Email
					</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell className="border-b border-[#c6c6c6] bg-[#f4f4f4] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#525252]">
						Date Added
					</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{rows.length === 0 && (
					<Table.Row>
						<Table.Cell colSpan={3} className="px-4 py-10 text-sm text-[#525252]">
							{emptyMessage}
						</Table.Cell>
					</Table.Row>
				)}
				{rows.map((user, index) => (
					<Table.Row
						key={user.id}
						className={`border-b border-[#e0e0e0] ${
							index % 2 === 0 ? "bg-white" : "bg-[#fcfcfc]"
						} hover:bg-[#edf5ff]`}
					>
						<Table.RowHeaderCell className="px-4 py-3 text-sm font-medium text-[#161616]">
							{user.name}
						</Table.RowHeaderCell>
						<Table.Cell className="px-4 py-3 text-sm text-[#161616]">{user.email}</Table.Cell>
						<Table.Cell className="px-4 py-3 text-sm text-[#525252]">
							{new Date(user.creationAt).toLocaleString()}
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
}
