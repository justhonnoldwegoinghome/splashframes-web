import { useEffect } from "react";

import { useFeedbackStore } from "@/stores/useFeedbackStore";

const FEEDBACK_DURATION = 7000;

export function FeedbackSnackbar() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const dismiss = useFeedbackStore((s) => s.dismiss);

  useEffect(() => {
    if (feedback) {
      setTimeout(dismiss, FEEDBACK_DURATION);
    }
  }, [feedback]);

  if (feedback === null) return null;

  const { msg, status } = feedback;
  const { icon } = statuses[status];

  return (
    <div className="fixed bottom-[5vh] right-1/2 translate-x-1/2">
      <div className="bg-white p-4">
        {icon}
        <span>{msg}</span>
        <div>
          <button onClick={dismiss}>Close</button>
        </div>
      </div>
    </div>
  );
}

const statuses = {
  success: {
    icon: <div className="bg-teal-400">Success icon</div>,
  },
  error: {
    icon: <div className="bg-red-400">Warning icon</div>,
  },
};
