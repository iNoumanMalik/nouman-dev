import { useEffect, useState } from "react";
import { fetchGithubContributions } from "../lib/github/fetcher";
import type { ContributionCalendar } from "../types/github";

export function useGithubContributions() {
  const [data, setData] = useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchGithubContributions()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
