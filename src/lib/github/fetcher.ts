export async function fetchGithubContributions() {
  console.log("Hello")
  const res = await fetch("/api/github");
  console.log(res)

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch GitHub contributions");
  }

  return await res.json();
}
