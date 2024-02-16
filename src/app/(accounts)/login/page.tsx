import LoginCard from '../../components/LoginCard';
import { auth } from '../../api/auth/[...nextauth]/auth'
import React from 'react';

export default async function Page() {
  let loading = true;
  let session = await auth()
  loading = false;

  return (
    // Center login card in page
    <div className="flex h-screen justify-center items-center flex-col">
      {loading && <p>Still loading...</p>}
      {!loading && !session && <p>Not logged in</p>}
      {!loading && session && <p>Logged in</p>}
      <p className="overflow-scroll max-w-12">Logged in account is: {JSON.stringify(session)}</p>
      <LoginCard session={session}/>
    </div>
  );
}