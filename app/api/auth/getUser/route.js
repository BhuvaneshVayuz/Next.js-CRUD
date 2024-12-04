export async function GET(req) {
    // Access user data from the custom header set by the middleware
    const userHeader = req.headers.get('X-User');
  
    // If there's no user information, return unauthorized
    if (!userHeader) {
      return new Response(JSON.stringify({ message: 'No user logged in' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    // Parse the user data from the header
    const user = JSON.parse(userHeader);
  
    // Return the user data
    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  