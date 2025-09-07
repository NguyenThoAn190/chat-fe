export interface TrainingVideoDTO {
  created_at?: string;
  description?: string;
  id?: string;
  is_active?: boolean;
  sort_order?: number;
  thumbnail?: string;
  title?: string;
  updated_at?: string;
  video_url?: string;
}

export interface TrainingVideosPaginationDTO {
  current_page?: number;
  has_next?: boolean;
  has_prev?: boolean;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

export interface TrainingVideosResponseDTO {
  data?: {
    pagination?: TrainingVideosPaginationDTO;
    training_videos?: TrainingVideoDTO[];
  };
}