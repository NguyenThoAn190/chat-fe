export interface TrainingCampLocationDTO {
  address?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  name?: string;
}

export interface TrainingCampRegistrationDTO {
  closes_at?: string;
  is_open?: boolean;
  max_participants?: number;
  opens_at?: string;
  participants_count?: number;
}

export interface TrainingCampDTO {
  created_at?: string;
  date_end?: string;
  date_start?: string;
  description?: string;
  id?: string;
  is_featured?: boolean;
  location?: TrainingCampLocationDTO;
  name?: string;
  registration?: TrainingCampRegistrationDTO;
  slug?: string;
  status?: string;
  subtitle?: string;
  thumbnail?: string;
  updated_at?: string;
}

export interface TrainingCampFiltersDTO {
  categories?: string[];
  locations?: string[];
  price_range?: {
    max?: number;
    min?: number;
  };
}

export interface TrainingCampPaginationDTO {
  current_page?: number;
  has_next?: boolean;
  has_prev?: boolean;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

export interface TrainingCampResponseDTO {
  data : {
    filters?: TrainingCampFiltersDTO;
    pagination?: TrainingCampPaginationDTO;
    training_camps?: TrainingCampDTO[];
  }
}