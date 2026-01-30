export const GlobalNavigation = () => {
	return (
		<div className="flex flex-row justify-between items-center h-16 bg-secondary-container border-b border-outline-variant sticky top-0 z-50 px-[24px] ">
			<div>Company Logo</div>
			<div id="search-box" className="flex flex-row h-14 bg-secondary-fixed-dim rounded-full px-24 justify-self-center items-center justify-center w-full max-w-300" >
				<span className="text-on-secondary-fixed-variant material-symbols-rounded">
					search
				</span>
				<p className="text-on-secondary-fixed-variant text-base">Search Box</p>
			</div>
			<div id="right-element" className="flex flex-row gap-4">
				<span className="material-symbols-rounded text-on-secondary-container select-none" style={{ fontSize: '24px' }}>
					shopping_basket
				</span>
				<span className="material-symbols-rounded text-on-secondary-container select-none" style={{ fontSize: '24px' }}>
					account_circle
				</span>
			</div>

		</div>
	);
};

export default GlobalNavigation;
