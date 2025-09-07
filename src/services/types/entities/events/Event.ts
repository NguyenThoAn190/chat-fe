

export enum EventStatusFilter {
  CANCELLED = "cancelled",
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
}

export enum EventSortOrder {
    DATE_ASC = "date_asc",
    DATE_DESC = "date_desc",
    PRICE_ASC = "price_asc",
    PRICE_DESC = "price_desc",
    NAME_ASC = "name_asc",
    NAME_DESC = "name_desc"
}

export interface EventImageDTO {
  alt?: string;
  type?: string;
  url?: string;
}

export interface EventLocationDTO {
  address?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  name?: string;
}

export interface EventPriceDTO {
  currency?: string;
  display?: string;
  max?: number;
  min?: number;
}

export interface EventRegistrationDTO {
  closes_at?: string;
  is_open?: boolean;
  max_participants?: number;
  opens_at?: string;
  participants_count?: number;
}

export interface EventsDTO {
  category?: string;
  created_at?: string;
  date?: string;
  date_start?: Date;
  date_end?: Date;
  description?: string;
  id?: string;
  image?: EventImageDTO;
  location?: EventLocationDTO;
  price?: EventPriceDTO;
  registration?: EventRegistrationDTO;
  slug?: string;
  status?: string;
  time?: string;
  title?: string;
  updated_at?: string;
}

export interface EventFiltersDTO {
  categories?: string[];
  locations?: string[];
  price_range?: {
    max?: number;
    min?: number;
  };
}

export interface EventPaginationDTO {
  current_page?: number;
  has_next?: boolean;
  has_prev?: boolean;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

export interface EventResponseDTO {
  data: {
    events?: EventsDTO[];
    filters?: EventFiltersDTO;
    pagination?: EventPaginationDTO
  };
}