"use client"
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
      }
    

    return (
        <div className="w-full h-[3rem] header-background flex items-center justify-between shadow-custom p-5">
            <div className="flex">
                <p className="mr-1">My Event</p>
                <span className="h-2 w-2 rounded-full bg-red-500 translate-y-[150%] border-[1px] border-white"></span>
                <p className="ml-[1px] -rotate-12 -translate-y-1 text-shadow2">com</p>
            </div>
            <div className="flex gap-5">
                <Link className="hover:text-gray-600 hover:scale-[1.1] hover:font-bold transition-all duration-200" href={"/"}>Acceuil</Link>
                {session ? (
                    <>
                        <Link className="hover:text-gray-600 hover:scale-[1.1] hover:font-bold transition-all duration-200" href={"/events"}>Mes évenements</Link>
                        <Link className="hover:text-gray-600 hover:scale-[1.1] hover:font-bold transition-all duration-200" href={"/profile"}>Mon profil</Link>
                        <button
                            className="hover:text-gray-600 hover:scale-[1.1] hover:font-bold transition-all duration-200 text-slate-500"
                            onClick={() => signOut({ callbackUrl: '/' })}
                        >
                            Se déconnecter
                        </button>
                    </>
                ) : (
                    <Link className="hover:text-gray-600 hover:scale-[1.1] hover:font-bold transition-all duration-200 text-slate-500" href={"/connect"}>Se connecter</Link>
                )}
            </div>
        </div>
    );
};

export default Header;