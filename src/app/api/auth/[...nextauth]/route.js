import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import config from '../../../../config';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: config.google_client_id,
			clientSecret: config.google_client_secret,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
					role: profile.role ?? 'user',
				};
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account.provider === 'google') {
				const { name, email, role, image } = user;

				try {
					const res = await fetch(`${config.nextauth_url}/api/user`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							name,
							email,
							role,
							image,
						}),
					});
					const data = await res.json();

					if (res.ok) {
						user.mongoId = data.data._id;
						user.role = data.data.role;
						return user;
					}
				} catch (error) {
					throw new Error(error);
				}
			}
			return null;
		},
		async jwt({ token, user }) {
			if (user) {
				token.mongoId = user.mongoId;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.mongoId = token.mongoId;
				session.user.role = token.role;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };