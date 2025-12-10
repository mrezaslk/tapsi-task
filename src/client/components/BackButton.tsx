import React from "react";
import { Link } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  text?: string;
}

export const BackButton: React.FC<BackButtonProps> = React.memo(
  ({ to = "/", text = "بازگشت" }) => {
    return (
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium min-h-[44px]"
      >
        {text}
      </Link>
    );
  }
);

BackButton.displayName = "BackButton";
