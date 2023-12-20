import { create } from "zustand";

interface Feedback {
  msg: string;
  status: "success" | "error";
}

interface FeedbackState {
  feedback: Feedback | null;
  notify: (n: Feedback) => void;
  dismiss: () => void;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
  feedback: null,
  notify: (n) =>
    set({
      feedback: n,
    }),
  dismiss: () =>
    set({
      feedback: null,
    }),
}));
