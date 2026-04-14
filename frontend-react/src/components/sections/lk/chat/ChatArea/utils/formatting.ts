import { IChatListItem } from "@/types/Chat";


export const formatDateLabel = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatTimeLabel = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};

export const formatCandidateCaption = (chat: IChatListItem) => {
  const firstName = chat.first_name?.trim();
  const lastName = chat.last_name?.trim();
  const fallback = chat.resume_id ? `Резюме ${chat.resume_id}` : 'Безымянный кандидат';
  const full = [firstName, lastName].filter(Boolean).join(' ');
  return full || fallback;
};