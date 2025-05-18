import { PrismaClient, Prisma } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { renameSync } from "fs";

const prisma = new PrismaClient(); // Reuse the same PrismaClient instance

// Utility function to generate hashed password
const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

// JWT token creation function
const maxAge = 3 * 24 * 60 * 60;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

// Signup route
export const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password Required" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: await generatePassword(password),
      },
    });

    return res.status(201).json({
      user: { id: user.id, email: user.email },
      jwt: createToken(user.email, user.id),
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(400).json({ error: "Email already registered" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login route
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password Required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    return res.status(200).json({
      user: { id: user.id, email: user.email },
      jwt: createToken(user.email, user.id),
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user info route
export const getUserInfo = async (req, res) => {
  try {
    if (req.userId) {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          image: user.profileImage,
          username: user.username,
          fullName: user.fullName,
          description: user.description,
          isProfileSet: user.isProfileInfoSet,
        },
      });
    } else {
      return res.status(400).json({ error: "User ID not provided" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Set user info route
export const setUserInfo = async (req, res) => {
  const { userName, fullName, description } = req.body;

  if (!userName || !fullName || !description) {
    return res
      .status(400)
      .json({ error: "Username, Full Name, and Description are required" });
  }

  try {
    if (req.userId) {
      const userNameValid = await prisma.user.findUnique({
        where: { username: userName },
      });

      if (userNameValid) {
        return res.status(400).json({ error: "Username already taken" });
      }

      await prisma.user.update({
        where: { id: req.userId },
        data: {
          username: userName,
          fullName,
          description,
          isProfileInfoSet: true,
        },
      });

      return res.status(200).json({ message: "Profile data updated successfully." });
    } else {
      return res.status(400).json({ error: "User ID not provided" });
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(400).json({ error: "Username already taken" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Set user image route
export const setUserImage = async (req, res) => {
  try {
    if (req.file && req.userId) {
      const date = Date.now();
      const fileName = `uploads/profiles/${date}${req.file.originalname}`;
      renameSync(req.file.path, fileName);

      await prisma.user.update({
        where: { id: req.userId },
        data: { profileImage: fileName },
      });

      return res.status(200).json({ img: fileName });
    } else if (!req.file) {
      return res.status(400).json({ error: "Image not included" });
    } else {
      return res.status(400).json({ error: "User ID not provided" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
