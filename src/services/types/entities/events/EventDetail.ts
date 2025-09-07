interface EventDistanceSectionDTO {
  id?: number;
  name?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}

export interface EventDistanceDTO {
  id?: number;
  name?: string;
  name_display?: string;
  distance?: number;
  unit?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
  sections?: EventDistanceSectionDTO[];
}

export interface EventGalleryItemDTO {
  alt?: string;
  type?: string;
  url?: string;
}

export interface EventHeroImageDTO {
  alt?: string;
  type?: string;
  url?: string;
}

export interface EventLocationDTO {
  address?: string;
  city?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  name?: string;
  province?: string;
  venue_details?: string;
}

export interface EventOrganizerContactDTO {
  email?: string;
  phone?: string;
  website?: string;
}

export interface EventOrganizerDTO {
  contact?: EventOrganizerContactDTO;
  name?: string;
}

export interface EventPartnerSponsorDTO {
  category?: string;
  logo?: string;
  name?: string;
  type?: string;
}

export interface EventPricingTierDTO {
  distance?: string;
  id?: string;
  includes?: string[];
  name?: string;
  price?: number;
}

export interface EventPricingDTO {
  currency?: string;
  display?: string;
  max_price?: number;
  min_price?: number;
  tiers?: EventPricingTierDTO[];
}

interface RegistrationStatisticsDTO {
  total_registrations?: number;
  confirmed_registrations?: number;
  pending_registrations?: number;
  cancelled_registrations?: number;
  completed_registrations?: number;
  no_show_registrations?: number;
  available_slots?: number;
  fill_percentage?: number;
  is_full?: boolean;
  has_waitlist?: boolean;
  total_revenue?: number;
  average_ticket_price?: number;
}

interface RegistrationBreakdownDTO {
  by_status?: any[];
  by_distance?: any[];
  by_gender?: any[];
  by_age_group?: any[];
  by_experience?: any[];
  by_location?: any[];
}

interface RegistrationTrendsDTO {
  daily_registrations?: any[];
  weekly_registrations?: any[];
  peak_registration_day?: string;
  peak_registration_hour?: string;
}

export interface EventRegistrationDTO {
  closes_at?: string;
  early_bird_deadline?: string;
  is_open?: boolean;
  max_participants?: number;
  opens_at?: string;
  participants_count?: number;
  registration_url?: string;
  waitlist_count?: number;
  statistics?: RegistrationStatisticsDTO;
  breakdown?: RegistrationBreakdownDTO;
  trends?: RegistrationTrendsDTO;
}

export interface EventScheduleItemDTO {
  activity?: string;
  time?: string;
}

export interface EventSeoDTO {
  keywords?: string[];
  meta_description?: string;
  meta_title?: string;
}

interface EventSeriesDTO {
  id?: number;
  slug?: string;
  name?: string;
  description?: string;
  is_active?: boolean;
}

export interface EventDetailsDTO {
  category?: string;
  created_at?: string;
  date_end?: string;
  date_start?: string;
  description?: string;
  detailed_description?: string;
  duration?: number;
  event_type?: string;
  features?: string[] | null;
  gallery?: EventGalleryItemDTO[];
  hero_image?: EventHeroImageDTO;
  id?: string | number;
  uuid?: string;
  image?: EventHeroImageDTO;
  event_series?: EventSeriesDTO;
  intro_sections?: {
    id?: number;
    name?: string;
    title?: string;
    description?: string;
    sort_order?: number;
  }[];
  selling_points?: {
    id?: number;
    name?: string;
    icon?: string;
    url?: string;
    sort_order?: number;
  }[];
  pricing?: EventPricingDTO;
  distances?: EventDistanceDTO[];
  partners_sponsors?: EventPartnerSponsorDTO[];
  organizer?: EventOrganizerDTO;
  registration?: EventRegistrationDTO;
  schedule?: EventScheduleItemDTO[];
  seo?: EventSeoDTO;
  slug?: string;
  status?: string;
  subtitle?: string;
  tags?: string[] | null;
  time?: string;
  title?: string;
  updated_at?: string;
  race_result_link?: string,
  race_photo_link?: string,
  location?: EventLocationDTO & { city?: string; province?: string; venue_details?: string };
}

export interface EventDetailResponseDTO {
  data?: EventDetailsDTO;
}