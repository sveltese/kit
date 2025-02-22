import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// Seed the auth_users table
	/** @type {import('@prisma/client').User} */
	const user = await prisma.user.create({
		data: {
			id: 'user1',
			name: 'Test User',
			email: 'test@example.com',
			avatar: 'https://ui-avatars.com/api/?name=S+E'
		}
	});

	// Seed the auth_keys table's
	/** @type {import('@prisma/client').Key} */
	const key = await prisma.key.create({
		data: {
			id: 'email:test@example.com',
			hashed_password:
				's2:gn6XFxYcWmzWffHx:2837a44e2cc1ca86673ac1648f7f7e22dd512c3e313e5c675760162ce81cc4090f70c1b9821959e745ce35dd9094ced88f3f69472d6853eccfb8f77ca6949513',
			user_id: user.id
		}
	});

	console.log({ user, key });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
