export default function CPUCalculator(cpuData: any) {
  // Mendapatkan data dari cpuUsage array
  const cpuUsageData = cpuData.cpuUsage;

  // Menghitung total waktu CPU
  const totalCpuTime = cpuUsageData.reduce((total: any, cpu: any) => {
    return (
      total + cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle
    );
  }, 0);

  // Menghitung waktu aktif CPU
  const activeCpuTime = cpuUsageData.reduce((total: any, cpu: any) => {
    return total + cpu.times.user + cpu.times.nice + cpu.times.sys;
  }, 0);

  // Menghitung persentase CPU aktif
  const cpuUsagePercentage = (activeCpuTime / totalCpuTime) * 100;

  // Menggunakan .toFixed(2) untuk membatasi jumlah digit desimal menjadi 2
  return cpuUsagePercentage.toFixed(2);
}
