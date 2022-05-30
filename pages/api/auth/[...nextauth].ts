import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import jwt_decode from 'jwt-decode'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
      clientId: 'thiago-labs',
      clientSecret: '6gqL9IbcnO9aDLhSN7ievy9vncwDyDyo',
      issuer: 'http://localhost:8881/auth/realms/onearth',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      const decoded: any = jwt_decode(token.accessToken as string)
      session.roles = decoded.resource_access['thiago-labs'].roles

      return session
    },
  },
})
