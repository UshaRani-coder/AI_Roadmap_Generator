import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Protect the dashboard
  if (error || !user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-background px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold text-foreground">
          Welcome
          {user.user_metadata?.full_name
            ? `, ${user.user_metadata.full_name}`
            : ""}
          !
        </h1>

        <p className="mt-3 text-muted-foreground">
          Welcome to your RoadmapAI dashboard.
        </p>
      </div>
    </main>
  );
}
