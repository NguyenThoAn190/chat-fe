export interface BlogAuthorDTO {
  id?: number | string;
  name?: string;
  avatar?: string;
}

export interface BlogDetailDTO {
  id?: number | string;
  uuid?: string;
  slug?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  thumbnail?: string;
  author?: BlogAuthorDTO;
  is_active?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface BlogDetailResponseDTO {
  data?: BlogDetailDTO;
}