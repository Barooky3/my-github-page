import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getGitHubProfile } from "@/lib/github.functions";

export const Route = createFileRoute("/github-connect")({
  head: () => ({
    meta: [
      { title: "Connect GitHub — Lovable App" },
      { name: "description", content: "Connect your GitHub profile to the app." },
      { property: "og:title", content: "Connect GitHub — Lovable App" },
      { property: "og:description", content: "Connect your GitHub profile to the app." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GitHubConnectPage,
});

function GitHubConnectPage() {
  const fetchProfile = useServerFn(getGitHubProfile);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["github-profile"],
    queryFn: () => fetchProfile({ data: undefined }),
    retry: false,
  });

  const isNotConfigured =
    error?.message?.includes("not configured") ?? false;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">
          GitHub connection
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Link your GitHub account so the app can read your public profile.
        </p>

        <div className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : data ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {data.avatar_url && (
                  <img
                    src={data.avatar_url}
                    alt={`${data.login} avatar`}
                    className="h-16 w-16 rounded-full border border-border"
                  />
                )}
                <div>
                  <p className="text-lg font-medium text-card-foreground">
                    {data.name || data.login}
                  </p>
                  <p className="text-sm text-muted-foreground">@{data.login}</p>
                </div>
              </div>
              {data.bio && (
                <p className="text-sm text-muted-foreground">{data.bio}</p>
              )}
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Repos: {data.public_repos}</span>
                <span>Followers: {data.followers}</span>
                <span>Following: {data.following}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {isNotConfigured
                  ? "GitHub is not connected yet. Connect it in your workspace settings, then return here."
                  : "No profile data available."}
              </p>
              <a
                href="https://docs.lovable.dev/integrations/connectors"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Open connector settings
              </a>
            </div>
          )}
        </div>

        {error && !isNotConfigured && (
          <div className="mt-4 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {error.message}
          </div>
        )}

        <button
          onClick={() => refetch()}
          className="mt-6 w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Refresh connection
        </button>
      </div>
    </div>
  );
}
