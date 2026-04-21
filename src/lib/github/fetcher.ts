export async function fetchGithubContributions() {

  const res = await fetch("/api/github");


  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch GitHub contributions");
  }

  return await res.json();
}
