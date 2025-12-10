import React from "react";
import { BeatLoader } from "react-spinners";

export const LoadingState: React.FC = React.memo(() => {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <BeatLoader size={8}  />
      </div>
    </main>
  );
});

LoadingState.displayName = "LoadingState";
