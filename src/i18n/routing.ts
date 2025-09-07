import { defineRouting } from "next-intl/routing";
import { LOCALES } from "../constants/locale";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: "en",

  // Hide locale prefix completely
  // localePrefix: "never",
});
