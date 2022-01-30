const truncateAddress = (str, n) => {
  if (!str) return null;
  return str.substr(0, 6) + "..." + str.substr(str.length - 4, str.length - 1);
};

export default truncateAddress;
