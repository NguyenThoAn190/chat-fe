export interface BlogAuthorDTO {
  avatar?: string;
  id?: string | number;
  name?: string;
}

export interface BlogDTO {
  author?: BlogAuthorDTO;
  content?: string;
  created_at?: string;
  id?: string | number;
  is_active?: boolean;
  slug?: string;
  sort_order?: number;
  subtitle?: string;
  thumbnail?: string;
  title?: string;
  updated_at?: string;
  uuid?: string;
}

export interface BlogPaginationDTO {
  current_page?: number;
  has_next?: boolean;
  has_prev?: boolean;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

export interface BlogsResponseDTO {
  data: {
    blogs?: BlogDTO[];
    pagination?: BlogPaginationDTO;
  }
}