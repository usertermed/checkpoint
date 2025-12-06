export type MessageDocument = {
  id: string;
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};
