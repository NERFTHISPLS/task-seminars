export interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

export interface SeminarsFetchState {
  seminars: Seminar[];
  isLoading: boolean;
  error: string;
}
