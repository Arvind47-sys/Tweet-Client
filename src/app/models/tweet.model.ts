export interface Like {
  id: number;
  likedBy: string;
  likedDate: Date;
}

export interface Reply {
  id: number;
  reply: string;
  repliedBy: string;
  repliedDate: Date;
}

export interface Tweet {
  userId: number;
  tweetId: number;
  username: string;
  tag: string;
  body: string;
  likes: Like[];
  replies: Reply[];
  postedDate: Date;
}
