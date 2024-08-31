export interface VideoData {
    src: string;
    title: string;
    description: string;
    creator: {
      name: string;
      avatar: string;
    };
    stats: {
      likes: string;
      views: string;
      uploadDate: string;
      uploadTime: string;
    };
    tags: string[];
    references: string[];
    article: string;
  }
