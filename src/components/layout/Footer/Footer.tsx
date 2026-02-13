import Link from "next/link";

const FOOTER_LINKS = [
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
	{ label: "Privacy Policy", href: "/privacy" },
	{ label: "Terms", href: "/terms" },
	{ label: "Support", href: "/support" },
];

export default function Footer() {
	return (
		<footer className="border-t border-outline-variant bg-surface-container">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-2">
					<p className="text-base font-semibold text-on-surface">RevoShop</p>
					<p className="text-sm text-on-surface-variant">
						Thoughtfully curated essentials for modern living.
					</p>
				</div>

				<nav aria-label="Footer">
					<ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-surface-variant">
						{FOOTER_LINKS.map((item) => (
							<li key={item.label}>
								<Link
									className="transition-colors hover:text-on-surface"
									href={item.href}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<p className="text-xs text-on-surface-variant">
					&copy; {new Date().getFullYear()} RevoShop. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
