// Helper to convert Arabic-Indic (٠١٢٣٤٥٦٧٨٩) and Extended (۰۱۲۳۴۵۶۷۸۹) digits to English (0-9)
const toEnglishDigits = (input) =>
  input
    .replace(/[\u0660-\u0669]/g, (c) => String(c.charCodeAt(0) - 0x0660)) // Arabic-Indic
    .replace(/[\u06f0-\u06f9]/g, (c) => String(c.charCodeAt(0) - 0x06f0)); // Extended Arabic-Indic

export const formatCurrency = (amount) => {
  if (isNaN(amount)) return 'EGP 0.00';
  const formatted = new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 2,
  }).format(amount);
  return toEnglishDigits(formatted);
};

export default formatCurrency;
