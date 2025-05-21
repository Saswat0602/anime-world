
export async function POST(req: Request) {
    const body = await req.json();
  
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN || ''}`,
      },
      body: JSON.stringify(body),
    });
  
    const data = await response.json();
  
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  