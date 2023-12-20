import { PiCheckCircleFill } from "react-icons/pi";
import { useEffect } from "react";

import { useFeedbackStore } from "@/features/app";

const FEEDBACK_DURATION = 4000;

export function FeedbackSnackbar() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const dismiss = useFeedbackStore((s) => s.dismiss);

  useEffect(() => {
    if (feedback) {
      setTimeout(() => dismiss(), FEEDBACK_DURATION);
    }
  }, [feedback]);

  if (feedback === null) return null;

  const { msg, status } = feedback;
  const { icon } = statuses[status];

  return (
    <div className={"fixed bottom-[5vh] right-12 z-[100] slideIn"}>
      <div className="flex gap-4 items-center p-4 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] bg-white">
        {icon}
        <span className="font-semibold">{msg}</span>
      </div>
    </div>
  );
}

const statuses = {
  success: {
    icon: <PiCheckCircleFill className="text-3xl text-teal-400" />,
  },
  error: {
    icon: <div className="bg-red-400">Warning icon</div>,
  },
};
