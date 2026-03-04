 // Vercel automatically runs this serverless function but we don't see contributions in localhost. So instead of run dev use vercel dev

export const config = {
    runtime: 'edge',
};

export default async function handler() {
    const username = "iNoumanMalik";
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_TOKEN) {
        return new Response(
            JSON.stringify({ error: "GITHUB_TOKEN is not defined in environment variables" }),
            { status: 500, headers: { 'content-type': 'application/json' } }
        );
    }

    const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
            body: JSON.stringify({
                query,
                variables: { username }
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify(data), {
                status: response.status,
                headers: { 'content-type': 'application/json' }
            });
        }

        const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;

        return new Response(JSON.stringify(calendar), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}



/* 
A serverless function is:
A backend function that runs on-demand without you managing a server.
You write a function.
The platform (like Vercel) runs it when needed.

You don’t:
Create a server
Open a port
Run app.listen()
Manage infrastructure 

Instead of this:
app.listen(5001)

You just write:
export default async function handler(req, res) {
return new Response("Hello");
}

And the platform handles the rest.


Vercel:

Creates server
Runs function when request comes
Scales automatically
Stops it when not used
*/