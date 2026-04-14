export interface Creator {
    id: number;
    email: string;
    phone: string;
    professional_role: string;
    user_photo: string | null;
    photo_url: string | null;
    created_by: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
}

export interface CandidateNote {
    id: number;
    candidate: string; // UUID представлен как строка
    text: string;
    created_at: string; // Дата в ISO формате
    updated_at: string; // Дата в ISO формате
    creator: Creator;
}