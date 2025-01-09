const getBankName = (bankId) => {
	switch (bankId) {
		case 0:
			return "DOMLand Bank";
		case 1:
			return "3TBank";
		case 2:
			return "BAOSON Bank";
		default:
			return "DOMLand Bank";
	}
};

export default getBankName;
