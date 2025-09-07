export interface EventItemDTO {
  id?: number;
  uuid?: string;
  slug?: string;
  title?: string;
}

export interface EventSeriesDetailDTO {
  id?: number;
  slug?: string;
  name?: string;
  description?: string;
  events_count?: number;
  events: EventItemDTO[];
}

export interface EventSeriesDetailResponseDTO {
  data: EventSeriesDetailDTO;
}
