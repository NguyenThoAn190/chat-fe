import { useTranslations } from "next-intl";

export function useEventDetailNavTabs(): Record<string, EventNavTab> {
  const t = useTranslations("event_page.event_detail.event_nav");
  return {
    info: { id: "info", label: t("info") },
    race: { id: "race", label: t("race_distance") },
    register: { id: "register", label: t("register") },
    resultphoto: { id: "resultphoto", label: t("result_and_photo") },
    // partnerpromo: { id: "partnerpromo", label: t("partnerpromo") },
  };
}
export type EventNavTab = {
  id: string;
  label: string;
};

export default function EVENT_DETAIL_NAV_TABS(
  t: any,
): Record<string, EventNavTab> {
  return {
    info: { id: "info", label: t("info") },
    race: { id: "race", label: t("race_distance") },
    register: { id: "register", label: t("register") },
    resultphoto: { id: "resultphoto", label: t("result_and_photo") },
    // partnerpromo: { id: "partnerpromo", label: t("partnerpromo") },
  };
}
