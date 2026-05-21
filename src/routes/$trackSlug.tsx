import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { findTrack } from "@/data/learn-content";

export const Route = createFileRoute("/$trackSlug")({
  beforeLoad: ({ params }) => {
    if (!findTrack(params.trackSlug)) throw notFound();
    throw redirect({
      to: "/learn/$trackSlug",
      params: { trackSlug: params.trackSlug },
      replace: true,
    });
  },
});
