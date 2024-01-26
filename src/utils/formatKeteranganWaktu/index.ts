import moment from "moment";

// Fungsi untuk memformat waktu terakhir masuk
const formatKeteranganWaktu = (lastLogin: string) => {
  const now = moment();
  const lastLoginMoment = moment(lastLogin);

  if (now.isSameOrBefore(lastLoginMoment)) {
    const diffInMinutes = lastLoginMoment.diff(now, "minutes");

    if (diffInMinutes <= 1) {
      return "Baru saja";
    } else if (diffInMinutes < 60) {
      return `Dalam ${diffInMinutes} menit`;
    } else if (lastLoginMoment.isSame(now, "day")) {
      return `Dalam ${lastLoginMoment.format("HH:mm")}`;
    } else if (lastLoginMoment.clone().subtract(1, "day").isSame(now, "day")) {
      return `Besok ${lastLoginMoment.format("HH:mm")}`;
    } else if (lastLoginMoment.isSame(now, "year")) {
      return lastLoginMoment.format("DD MMMM [pukul] HH:mm");
    } else {
      return lastLoginMoment.format("DD MMMM YYYY [pukul] HH:mm");
    }
  } else {
    const diffInMinutes = now.diff(lastLoginMoment, "minutes");

    if (diffInMinutes < 1) {
      return "Baru saja";
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
  }
};

export default formatKeteranganWaktu;
