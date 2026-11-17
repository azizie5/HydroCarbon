// Hook untuk mereset tur panduan — impor dari sini, bukan dari OnboardingTour.jsx
// Memisahkan hook dari komponen agar Fast Refresh React tidak memperingatkan

export function useOnboardingTour() {
  const resetTour = () => {
    localStorage.removeItem('hydrocarb_tour_done');
    window.location.reload();
  };
  return { resetTour };
}
