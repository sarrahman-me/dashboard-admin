export const formatCurrency = (value: number) => {
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

export const stringToSlug = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\W_]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// validasi format domain
export const isValidDomain = (domain: string) => {
  const domainRegex =
    /^(?!:\/\/)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  return domainRegex.test(domain);
};
