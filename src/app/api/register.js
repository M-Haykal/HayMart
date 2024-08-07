import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: "USER",
        },
      });
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(400).json({ error: "User already exists" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
