
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions);

  if(!session) {
    redirect("/auth");
  }
  
  console.log(session);

  // const { data: user } = useCurrentUser();

  // if (session) {
  //   return (
  //     <div>
  //       <h1>You are logged in</h1>
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </div>
  //   )
  // }

  return (
    <>
      <h1 className='text-green-500 text-4xl'>Netflix Clone</h1>
      
      {/* <h1 className="text-green-500 text-4xl">Logged in as : {user?.email}</h1> */}
      

      <LogoutButton />

      {/* <button 
        onClick={() => {}}
        className="
          h-10
          w-full
          bg-white
        "
      >Logout!</button> */}
    </>
    )
}
