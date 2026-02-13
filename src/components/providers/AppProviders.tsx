"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { SessionUIProvider } from "@/contexts/SessionUIContext";

export default function AppProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthProvider>
			<SessionUIProvider>{children}</SessionUIProvider>
		</AuthProvider>
	);
}
