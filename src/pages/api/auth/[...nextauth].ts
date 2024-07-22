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
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });
        console.log(user);
        
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id.toString(), email: user.username, name: user.firstname } as IUser;
        } else {
          throw new Error('Invalid email or password');
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
        // Assurez-vous que token.user contient les informations correctes
        session.user = {
          id: token.sub as string, // Token ID utilisé pour identifier l'utilisateur
          email: token.email as string, // Email stocké dans le token
          name: token.name as string, // Nom stocké dans le token
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
        // Ajoutez les informations de l'utilisateur au token JWT lors de la connexion
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


