export const GlobalNavigation = () => {
	return (
		<>
			<div className="flex h-16 bg-amber-500 border-b border-amber-200 sticky top-0 z-50 items-center">
				<p className="text-2xl font-bold">GlobalNavigation</p>
				<p> FAQ</p>
				<p> Deals</p>
				<div id="nav-icon" className="flex gap-4">
					<span className="material-symbols-outlined">home</span>
					<span className="material-symbols-outlined">
						shopping_bag
					</span>
					<span className="material-symbols-outlined">person</span>
				</div>
			</div>
			<div></div>
		</>
	);
};

export default GlobalNavigation;
