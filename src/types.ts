export interface Review {
  id: string;
  profileId: string;
  rating: number;
  comment?: string;
  reviewerName?: string;
  createdAt: Date;
  isPublic: boolean;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  email: string;
  publicReviews: Review[];
  averageRating: number;
  totalReviews: number;
}