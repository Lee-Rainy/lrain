export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  uuid: string;
  createAt: number;
  updateAt: number;
  filename: string;
}

export type PostListResponse = PostListItem[];
