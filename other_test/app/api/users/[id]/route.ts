import { NextRequest } from 'next/server';
import { UserController } from '../../../../src/presentation/controllers/UserController';

const userController = new UserController();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return userController.getUserById(params.id);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return userController.updateUser(params.id, body);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return userController.deleteUser(params.id);
} 