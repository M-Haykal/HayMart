import prisma from "../../../prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
