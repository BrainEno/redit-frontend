export interface Post {
  identifier: string;
  title: string;
  body: string;
  slug: string;
  sub?: Sub;
  username: string;
  url: string; //virtual fields
  subName: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sub {
  createdAt: string;
  updatedAt: string;
  name: string;
  title: string;
  description: string;
  imageUrn: string;
  bannerUrn: string;
  username: string;
  imageUrl: string;
  bannerUrl: string;
  postCount?: number;
  posts: Post[];
}

export interface Comment {
  createdAt: string;
  updatedAt: string;
  identifier: string;
  body: string;
  username: string;
  votes: string;
  //virtural
  userVote: number;
  voteScore: number;
}
