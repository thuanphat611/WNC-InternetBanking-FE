const getBankName = (bankId) => {
	switch (bankId) {
		case 0:
			return "DOMLand Bank";
		case 1:
			return "Team3 Bank";
		case 2:
			return "Hoa Bank";
		default:
			return "Unknown Bank";
	}
};

export default getBankName;
