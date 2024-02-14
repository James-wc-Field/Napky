import LoginCard from '../../components/LoginCard';
import { auth } from '../../api/auth/[...nextauth]/auth'
import React from 'react';

export default function Page() {
  let session = null;
  let loading = true;
  React.useEffect(()=>{
    (async ()=> {
      session = await auth();
      loading = false;
    })();
  }, []);

  return (
    // Center login card in page
    <div className="flex h-screen justify-center items-center">
      {loading && <p>Still loading...</p>}
      {!loading && !session && <p>Not logged in</p>}
      {!loading && session && <p>Logged in</p>}
      <LoginCard session={session}/>
    </div>
  );
}