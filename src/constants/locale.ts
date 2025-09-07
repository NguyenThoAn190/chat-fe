// constants/locale.ts
export const LOCALES = ["en", "vi"] as const;

export const FLAGS: Record<(typeof LOCALES)[number], string> = {
  vi: "/imgs/flags/vn.svg",
  en: "/imgs/flags/us.svg",
};
