type Reservation = {
  movieId: number;
  seats: number;
  type: 'regular' | 'student';
};

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  reservations: Reservation[];
};

export type Seat = {
  reserved: boolean;
  userId: number;
};

export type Movie = {
  id: number;
  title: string;
  duration: string;
  genre: string[];
  rate: number;
  poster: string;
  hours: string;
  seats: Seat[];
  description: string;
  type: string;
};