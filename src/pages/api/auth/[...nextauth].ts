import NextAuth, { Session, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import { User, Profile } from 'next-auth';

const prisma = new PrismaClient();

interface IUser {
  id: string;
  email: string;
  name: string;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Email et mot de passe obligatoire');
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });
        
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id.toString(), email: user.username, name: user.firstname } as IUser;
        } else {
          throw new Error('Mot de passe incorrect');
        }
      },
    }),
  ],
  pages: {
    signIn: '/connect',
  },
  callbacks: {
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token) {
        session.user = {
          id: token.sub as string, 
          email: token.email as string, 
          name: token.name as string, 
        } as NextAuthUser;
      }
      console.log("Session après modification", session);
      return session;
    },
    async jwt({ token, user, account, profile, trigger, isNewUser }: {
      token: JWT;
      user?: User;
      account?: any;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: any;
    }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email as string;
        token.name = user.name as string;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
export { authOptions }; 


