import { createServerFn } from "@tanstack/react-start";

interface GitHubProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

export const getGitHubProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubProfile> => {
    const lovableApiKey = process.env.LOVABLE_API_KEY;
    const githubApiKey = process.env.GITHUB_API_KEY;

    if (!lovableApiKey || !githubApiKey) {
      throw new Error(
        "GitHub connector is not configured. Link the GitHub connector in your workspace settings."
      );
    }

    const response = await fetch(
      "https://connector-gateway.lovable.dev/github/user",
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": githubApiKey,
        },
      }
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`GitHub request failed [${response.status}]: ${body}`);
    }

    return response.json() as Promise<GitHubProfile>;
  }
);
