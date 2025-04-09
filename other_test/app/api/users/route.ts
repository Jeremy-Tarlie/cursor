import { NextRequest } from 'next/server';
import { UserController } from '../../../src/presentation/controllers/UserController';

const userController = new UserController();

export async function GET() {
  return userController.getAllUsers();
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return userController.createUser(body);
} 