import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { AppError } from '../errors/AppError';
import type { RegisterDto, LoginDto, JwtPayload } from '../types/auth.type';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

export const register = async (dto: RegisterDto) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: dto.email },
    });
    if (existingUser) {
        throw new AppError('Email already in use', 409);
    }

    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: {
            email: dto.email,
            password: hashedPassword,
        },
    });

    return { userId: user.id, email: user.email };
}

export const login = async (dto: LoginDto) => {
    const user = await prisma.user.findUnique({
        where: { email: dto.email },
    });
    if (!user) {
        throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
        throw new AppError('Invalid credentials', 401);
    }

    const payload: JwtPayload = { userId: user.id, email: user.email };
    const signOptions: SignOptions = { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] };
    const token = jwt.sign(payload, JWT_SECRET, signOptions);

    return { token };
}
