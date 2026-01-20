import { GITHUB_CONTRIBUTIONS_QUERY } from "./queries";

export async function fetchGithubContributions(username: string) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GITHUB_CONTRIBUTIONS_QUERY,
      variables: { username },
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  const json = await res.json();
  return json.data.user.contributionsCollection.contributionCalendar;
}
