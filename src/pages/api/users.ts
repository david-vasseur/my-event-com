import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/pages/api/auth/[...nextauth]'; 
import { getServerSession } from 'next-auth';
import { CustomSession } from '@/type/CustomSession';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.NEXTAUTH_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions) as CustomSession;
      console.log("ma session", session);
      

      if (!session || !session.user) {
        return res.status(401).json({ error: "Vous n'êtes pas connecté" });
      }

      const userId = Number(session.user.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'ID utilisateur invalide' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId }, 
      });

      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l’utilisateur:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur' });
    }
  } 
  
  else if (req.method === 'POST') {
    const { username, password, lastname, firstname, age, description, picture } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
            username,
            password: hashPassword,
            lastname,
            firstname,
            age,
            description,
            picture,
            },
      });

      const successMessage = `Inscription reussi ! Bienvenue ${user.firstname} ${user.lastname}`;
      res.status(201).json({ message: successMessage });
    } catch (error) {
        console.error('Error creating user:', error); 
        res.status(500).json({ error: 'Error creating user' });
    }
  }
  
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
