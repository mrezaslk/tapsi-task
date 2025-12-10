import React from "react";
import { useParams, Link } from "react-router-dom";
import { useItem } from "@client/hooks/useItem";
import { LoadingState } from "@client/components/LoadingState";
import { BackButton } from "@client/components/BackButton";
import { ItemCard } from "@client/components/ItemCard";
import { ErrorState } from "@client/components/ErrorState";

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { item, loading, error } = useItem(id);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-gray-600 text-lg mb-4">آیتم پیدا نشد.</div>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 min-h-[44px]"
            >
              برگشت به لیست
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <BackButton />
        <ul className="space-y-3">
          <ItemCard item={item} />
        </ul>
      </div>
    </main>
  );
};
