const getBankName = (bankId) => {
  switch (bankId) {
    case 0:
      return "DOMLand Bank";
    case 1:
      return "Team3 Bank";
    case 2:
      return "BAOSON Bank";
    default:
      return "DOMLand Bank";
  }
};

export default getBankName;
