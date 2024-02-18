import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('101.35.200.235:8040');    
      nextUrl.href = 'http://101.35.200.235:8040/dashboard'
//      nextUrl.origin = 'http://101.35.200.235:8040'
//      nextUrl.host = '101.35.200.235:8040'
//      nextUrl.hostname = '101.35.200.235'
//      nextUrl.href = 'http://101.35.200.235:8040/dashboard'
//      nextUrl.port = '8040'
/*      nextUrl = {
	  href: 'http://101.35.200.235:8040/dashboard',
	  origin: 'http://101.35.200.235:8040',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '101.35.200.235:8040',
	  hostname: '101.35.200.235',
	  port: '8040',
	  pathname: '/dashboard',
	  search: '',
	  searchParams: URLSearchParams {  },
	  hash: ''
	}
*/
      console.log(nextUrl) // = '101.35.200.235:8040';    
      console.log(new URL('dashboard', nextUrl)) // = '101.35.200.235:8040';    
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;



