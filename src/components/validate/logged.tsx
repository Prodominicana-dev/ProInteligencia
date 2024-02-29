import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react'
import Login from './login';

export default function IsLogged({children} : {children: React.ReactNode}) {
    const {user, isLoading: userLoading} = useUser();
    if(!user && !userLoading) return <Login />
  return (
    <>
        {children}
    </>
  )
}
