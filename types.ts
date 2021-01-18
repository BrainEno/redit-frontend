export interface Post {
  id: number;
  identifier: string;
  title: string;
  body: string;
  slug: string;
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
