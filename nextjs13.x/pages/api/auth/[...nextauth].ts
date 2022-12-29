import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
var bcrypt = require('bcryptjs');
import {open} from 'sqlite';


import LibConst from "../../../src/SliteConn";
export default NextAuth({
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),

    CredentialsProvider({      
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'text'},
        password: { label: 'Password', type: 'password' },
  
      },
      authorize: async (credentials) => {
        // HARD CODED LOGIN
        // if (credentials.email === 'user@email.com' && credentials.password === '123') {
        //   return { id: 11, name: 'User', email: 'user@email.com'} 
        // }               
        console.log('credentials', credentials)
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
      
        var dbFile = LibConst.get_config().CommentDbFileName
        
        // console.log(d)
        // const items = await db.all('select * from Products order by ProductName desc');
        const db = await open(
          {filename: dbFile , driver: sqlite3.Database}
        );
                          
        const user = await db.all('SELECT * FROM Users WHERE Email = ?', credentials.email)
        // const usertmp = await db.all('SELECT * FROM Users WHERE Email = ?', credentials.email)
        // db.all('SELECT * FROM Users WHERE Email = ?', credentials.email, function(err, rows) {                            
        //   const user = { id: rows.Id, name: rows.Username, email: rows.Email}
        //   console.log('user ', user )
        //   return user        
        // });	
        
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        
        // console.log(user )
        // Create hash with user salt
        //var PHash = bcrypt.hashSync(payload.password, user.Salt);
  
        // if(PHash === user[0].Password) {              
        //   return user
        // } else {
        //   return null;
        // }
    
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
    signOut: '/auth/signout',
    
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token }) {
      
      token.userRole = "admin"
      return token
    },
  },

})
