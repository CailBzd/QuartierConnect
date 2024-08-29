import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

export async function POST(req: NextRequest) {
    await dbConnect();

    const { email, password } = await req.json();

    try {
        // Recherche de l'utilisateur dans la base de données
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }

        // Vérification du mot de passe avec bcryptjs
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }

        // Génération du token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

        return NextResponse.json({ token, user });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
