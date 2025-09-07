export interface TrainingCampLocationDetailDTO {
  name: string;
  city: string;
  province: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  venue_details?: string;
}

interface RegistrationStatistics {
  total_registrations: number;
  confirmed_registrations: number;
  pending_registrations: number;
  cancelled_registrations: number;
  completed_registrations: number;
  no_show_registrations: number;
  available_slots: number;
  fill_percentage: number;
  is_full: boolean;
  has_waitlist: boolean;
  total_revenue: number;
  average_ticket_price: number;
}

interface RegistrationBreakdown {
  by_status: any | null;
  by_distance: any | null;
  by_gender: any | null;
  by_age_group: any | null;
  by_experience: any | null;
  by_location: any | null;
}

interface RegistrationTrends {
  daily_registrations: any | null;
  weekly_registrations: any | null;
  peak_registration_day: string;
  peak_registration_hour: string;
}

export interface TrainingCampRegistrationDetailDTO {
  is_open: boolean;
  opens_at: string;
  closes_at: string;
  early_bird_deadline: string;
  participants_count: number;
  max_participants: number;
  waitlist_count: number;
  registration_url: string;
  statistics: RegistrationStatistics;
  breakdown: RegistrationBreakdown;
  trends: RegistrationTrends;
}

export interface TrainingCampDetailDTO {
  id: string;
  uuid: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  detailed_description: string;
  thumbnail: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  featured_order: number;
  is_published: boolean;
  date_start: string;
  date_end: string;
  duration: number;
  location: TrainingCampLocationDetailDTO;
  registration: TrainingCampRegistrationDetailDTO;
  created_at: string;
  updated_at: string;
}

export interface TrainingCampDetailResponseDTO {
  data: {
    data: TrainingCampDetailDTO;
  };
  message?: string;
  status?: string;
}