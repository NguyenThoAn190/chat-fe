import { EventsDTO } from "../events/Event";

export interface EventSeriesItemDTO {
  id?: number;
  slug?: string;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  events_count?: number;
  events?: EventsDTO[];
}

export interface EventSeriesResponseDTO {
  data: {
    series: EventSeriesItemDTO[];
  };
}

export interface GetEventSeriesBySlugDTO {
  data: {
    series: EventSeriesItemDTO;
  }
}

// SeriesWithEvents type không cần thiết nữa vì EventSeriesItemDTO đã có events array
export type SeriesWithEvents = EventSeriesItemDTO;