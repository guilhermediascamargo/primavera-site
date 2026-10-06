export function membershipWhatsApp(planName?: string) {
  const message = planName
    ? `Olá! Gostaria de receber mais informações sobre a modalidade ${planName} do Grêmio Esportivo Bagé.`
    : "Olá! Gostaria de receber mais informações sobre as modalidades de associação do Grêmio Esportivo Bagé.";
  return `https://wa.me/5553999561400?text=${encodeURIComponent(message)}`;
}
