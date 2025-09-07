export interface PageBannerDTO {
  created_at?: string;
  description?: string;
  detail?: { [key: string]: any };
  id?: string;
  is_active?: boolean;
  media_alt?: string;
  media_type?: string;
  media_url?: string;
  position?: string;
  sort_order?: number;
  target_url?: string;
  title?: string;
  type?: string;
  updated_at?: string;
}

export interface PageBannerResponseDTO {
  page_banners?: PageBannerDTO[];
}
export enum PAGE_TYPE_PARAMS {
  HOME = "home",
  ABOUT = "about",
  CONTACT = "contact",
  EVENTS = "events",
  PARTNERS = "partners",
}