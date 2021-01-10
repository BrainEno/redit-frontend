export interface Post {
  identifier: string;
  title: string;
  body: string;
  slug: string;
  username: string;
  url: string; //virtual fields
  subName: string;
  createdAt: string;
  updatedAt: string;
}
