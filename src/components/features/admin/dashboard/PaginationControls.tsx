"use client";

import clsx from "clsx";

export interface PaginationControlsProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	label: string;
}

export default function PaginationControls({
	currentPage,
	totalPages,
	onPageChange,
	label,
}: PaginationControlsProps) {
	if (totalPages <= 1) {
		return null;
	}

	const pages = Array.from({length: totalPages}, (_, index) => index + 1);
	const controlBaseClass =
		"h-10 min-w-10 border border-[#8d8d8d] bg-white px-3 text-sm font-medium text-[#161616] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62fe] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:border-[#e0e0e0] disabled:bg-[#f4f4f4] disabled:text-[#8d8d8d]";

	return (
		<nav className="mt-4 flex flex-wrap items-center gap-2" aria-label={`${label} pagination`}>
			<button
				type="button"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label={`Go to previous ${label} page`}
				className={controlBaseClass}
			>
				Prev
			</button>
			<div className="flex flex-wrap items-center gap-1">
				{pages.map((page) => (
					<button
						key={page}
						type="button"
						onClick={() => onPageChange(page)}
						disabled={page === currentPage}
						aria-label={`Go to ${label} page ${page}`}
						aria-current={page === currentPage ? "page" : undefined}
						className={clsx(
							controlBaseClass,
							page === currentPage
								? "border-[#0f62fe] bg-[#0f62fe] text-white disabled:border-[#0f62fe] disabled:bg-[#0f62fe] disabled:text-white"
								: "hover:bg-[#f4f4f4]",
						)}
					>
						{page}
					</button>
				))}
			</div>
			<button
				type="button"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label={`Go to next ${label} page`}
				className={controlBaseClass}
			>
				Next
			</button>
		</nav>
	);
}
