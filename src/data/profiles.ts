import { Profile } from '../types';

export const profiles: Profile[] = [
  {
    id: '123',
    name: 'Sarah Johnson',
    title: 'Senior Software Engineer',
    description: 'Passionate about creating innovative web solutions and mentoring junior developers.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    email: 'sarah.johnson@example.com',
    publicReviews: [
      {
        id: '1',
        profileId: '123',
        rating: 5,
        comment: 'Excellent mentorship and technical expertise!',
        reviewerName: 'John D.',
        createdAt: new Date('2024-01-15'),
        isPublic: true
      },
      {
        id: '2',
        profileId: '123',
        rating: 4,
        comment: 'Very helpful and knowledgeable.',
        reviewerName: 'Emily R.',
        createdAt: new Date('2024-01-20'),
        isPublic: true
      }
    ],
    averageRating: 4.5,
    totalReviews: 8
  },
  {
    id: '456',
    name: 'Michael Chen',
    title: 'UX/UI Designer',
    description: 'Crafting beautiful and intuitive user experiences for web and mobile applications.',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    email: 'michael.chen@example.com',
    publicReviews: [
      {
        id: '3',
        profileId: '456',
        rating: 5,
        comment: 'Amazing design skills and attention to detail.',
        reviewerName: 'Lisa M.',
        createdAt: new Date('2024-01-10'),
        isPublic: true
      }
    ],
    averageRating: 4.8,
    totalReviews: 12
  },
  {
    id: '789',
    name: 'David Thompson',
    title: 'Product Manager',
    description: 'Leading cross-functional teams to deliver exceptional products that users love.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    email: 'david.thompson@example.com',
    publicReviews: [],
    averageRating: 0,
    totalReviews: 0
  }
];