import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.image = token.picture as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (profile) {
        // Google normalmente retorna 'picture', mas pode ser 'avatar_url' ou 'image' em outros provedores
        const anyProfile = profile as any;
        token.picture = (anyProfile.picture || anyProfile.avatar_url || anyProfile.image) as string;
      }
      return token;
    },
  },
}; 