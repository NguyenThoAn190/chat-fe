export interface PartnerContactDTO {
  email?: string;
  phone?: string;
  website?: string;
}

export interface PartnerAndSponsorDTO {
  category?: string;
  contact?: PartnerContactDTO;
  created_at?: string;
  description?: string;
  id?: number;
  logo?: string;
  name?: string;
  slug?: string;
  updated_at?: string;
  website?: string;
}

export interface PartnerListResponseDTO {
  data?: PartnerAndSponsorDTO[];
}