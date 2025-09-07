import { cookies } from "next/headers";
import Cookies from "js-cookie";

// Server-side function (only for Server Components)
export async function getLocaleFromServerCookie() {
  return (await cookies()).get("NEXT_LOCALE")?.value || "vi";
}

// Client-side function (for Client Components)
export function getLocaleFromClientCookie(): string {
  if (typeof window === "undefined") {
    // Server-side fallback
    return "vi";
  }
  return Cookies.get("NEXT_LOCALE") || "vi";
}

// Generic function that works in both environments
export function getLocale(): string {
  // Check if we're on the client side
  if (typeof window !== "undefined") {
    return getLocaleFromClientCookie();
  }
  // On server side, return default or use alternative method
  return "vi";
}

// Function to set locale cookie on client side
export function setLocaleCookie(locale: string): void {
  if (typeof window !== "undefined") {
    Cookies.set("NEXT_LOCALE", locale, { expires: 365 });
  }
}
