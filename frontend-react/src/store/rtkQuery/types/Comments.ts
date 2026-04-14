export interface CandidateOverviewParameters {
    candidateId: string;
    vacancyId: string;
}

export interface SendCommentParameters {
    candidate: string; //candidateId
    text: string;
}

export interface Creator {
  id: number;
  email: string;
  phone: string;
  professional_role: string;
  user_photo: string;
  photo_url: string;
  created_by: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

export interface Comment {
  id: number;
  candidate: string; // UUID format
  text: string;
  created_at: string; // ISO 8601 date-time format
  updated_at: string; // ISO 8601 date-time format
  creator: Creator;
}