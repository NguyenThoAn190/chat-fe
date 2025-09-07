export interface TraningCampFeaturedLocationDTO {
  name?: string;
  address?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
}

export interface TraningCampFeaturedRegistrationDTO {
  is_open?: boolean;
  opens_at?: string;
  closes_at?: string;
  participants_count?: number;
  max_participants?: number;
}

export interface TraningCampFeaturedDTO {
  id?: string;
  uuid?: string;
  slug?: string;
  name?: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
  status?: string;
  is_featured?: boolean;
  date_start?: string;
  date_end?: string;
  location?: TraningCampFeaturedLocationDTO;
  registration?: TraningCampFeaturedRegistrationDTO;
  created_at?: string;
  updated_at?: string;
}

export interface TraningCampFeaturedResponseDTO {
  data?: TraningCampFeaturedDTO[];
}