import moment from "moment";

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

// Fungsi untuk memformat waktu terakhir masuk
export const formatLastLogin = (lastLogin: string) => {
  const now = moment();
  const lastLoginMoment = moment(lastLogin);
  const diffInMinutes = now.diff(lastLoginMoment, "minutes");

  if (diffInMinutes < 1) {
    return "Baru saja masuk";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  } else if (now.isSame(lastLoginMoment, "day")) {
    return `Hari ini ${lastLoginMoment.format("HH:mm")}`;
  } else if (now.clone().subtract(1, "day").isSame(lastLoginMoment, "day")) {
    return `Kemarin ${lastLoginMoment.format("HH:mm")}`;
  } else if (now.isSame(lastLoginMoment, "year")) {
    return lastLoginMoment.format("DD MMMM [pukul] HH:mm");
  } else {
    return lastLoginMoment.format("DD MMMM YYYY [pukul] HH:mm");
  }
};
