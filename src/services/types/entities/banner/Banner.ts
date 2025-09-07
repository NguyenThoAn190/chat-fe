export interface BannerDTO {
  created_at?: string;
  description?: string;
  detail?: string;
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
  uuid?: string;
}

export interface BannerResponseDTO {
  page_banners?: BannerDTO[];
}