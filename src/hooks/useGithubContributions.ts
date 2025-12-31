import { useEffect, useState } from "react";
import { fetchGithubContributions } from "../lib/github/fetcher";
import type { ContributionCalendar } from "../types/github";

export function useGithubContributions(username: string) {
  const [data, setData] = useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGithubContributions(username)
      .then(setData)
      .finally(() => setLoading(false));
  }, [username]);

  return { data, loading };
}
