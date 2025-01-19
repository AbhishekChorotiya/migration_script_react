export const getCardNetwork = (panBin) => {
  const bin = panBin.toString();
  const cardNetworks = [
    { name: "Visa", pattern: /^4\d{5}$/ },
    {
      name: "MasterCard",
      pattern:
        /^(5[1-5]\d{4}|2(22[1-9]\d{3}|2[3-9]\d{4}|[3-6]\d{5}|7[0-1]\d{4}|720\d{3}))$/,
    },
    { name: "American Express", pattern: /^3[47]\d{4}$/ },
    {
      name: "Discover",
      pattern:
        /^(6011\d{2}|65\d{4}|64[4-9]\d{3}|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[0-1]\d|92[0-5])\d{2})$/,
    },
    { name: "JCB", pattern: /^35(2[89]|[3-8]\d)\d{2}$/ },
    { name: "Diners Club", pattern: /^3(0[0-5]\d{3}|[68]\d{4})$/ },
    {
      name: "Maestro",
      pattern: /^(5018|5020|5038|56|57|58|6304|6759|676[1-3])\d{2}$/,
    },
    { name: "UnionPay", pattern: /^62\d{4}$/ },
    { name: "RuPay", pattern: /^(60|65|81|82|508)\d{3}$/ },
  ];

  for (const network of cardNetworks) {
    if (network.pattern.test(bin)) {
      return network.name;
    }
  }
  return "Unknown";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


