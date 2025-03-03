export interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

export interface SeminarsFetch {
  seminars: Seminar[];
  isLoading: boolean;
  error: string;
  deleteSeminar: (id: number) => void;
}

export enum ButtonType {
  Neutral = 'neutral',
  Danger = 'danger',
  Success = 'success',
}
