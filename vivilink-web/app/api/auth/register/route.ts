import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

export async function POST(req: NextRequest) {
    await dbConnect();

    const { email, password } = await req.json();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hachage du mot de passe avec bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
