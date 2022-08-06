import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({      
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'text'},
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (credentials.email === 'user@email.com' && credentials.password === '123') {
          return { id: 11, name: 'User', email: 'user@email.com'} 
        }
        
        // ***************************************************************** API CALL
          // const payload = {
          //   email: credentials.email,
          //   password: credentials.password,
          // };

          // const url = process.env.NEXT_API_DOMAIN + `/api/auth/login`
             
          // const res = await fetch(url, {
          //   method: 'POST',
          //   body: JSON.stringify(payload),
          //   headers: { "Content-Type": "application/json" }
          // })
          
          // const user = await res.json()
                  
          // If no error and we have user data, return it
          // if (res.ok && user) {
          //   return user;
          // }
        
          // ***************************************************************** API CALL  
        
          return null;
      
      }
    }),

    CredentialsProvider({
      id: "domain-login",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "User I Credentials",
      
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 99, name: "Jane Smith", email: "janesmith@example.com" }
          
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    CredentialsProvider({
      id: "user-login",
      name: "User II Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 26, name: "David Smith", email: "davesmith@example.com" }
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
  ],
  theme: {
    colorScheme: "dark",
  },
  pages: {
    signIn: '/login',
    signOut: '/signout',
    
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token }) {
      
      token.userRole = "regusr"
      return token
    },
  },

})
