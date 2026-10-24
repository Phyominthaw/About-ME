import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const password = body.password;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (password === adminPassword) {
            return NextResponse.json({ success: true, message: 'Authorized' });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}