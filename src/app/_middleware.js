import {useUser} from '@auth0/nextjs-auth0/client';

export default function middleware(handler) {
  return async (req, res) => {
    const {user} = useUser({req});
    

    if (!user) {
      
      res.writeHead(307, {Location: '/api/auth/login'});
      res.end();
      return;
    }

    return handler(req, res);
  };
}