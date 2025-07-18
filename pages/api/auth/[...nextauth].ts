import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "email-password",
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || user.provider !== "Email") return null;
        const isValid = bcrypt.compareSync(credentials.password, user.password!);
        if (!isValid) return null;
        return user;
      },
    }),

    CredentialsProvider({
      id: "email-otp",
      name: "Email + OTP",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
        password:{label: "Password", type:"text"}
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.otp || !credentials.password) return null;
        const otpRecord = await prisma.oTPTable.findFirst({
          where: {
            email: credentials.email,
            otp: credentials.otp,
            expiry: {
              gt: new Date(Date.now() - 5 * 60 * 1000), // 5 mins
            },
          },
        });
        if (!otpRecord) return null;
        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(credentials.password, salt)
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              provider: "Email",
              password:hashed
            },
          });
        }
        await prisma.oTPTable.deleteMany({
          where: {
            email:credentials.email,
            expiry: { lt: new Date() },
          },
        });
        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) return false;
        console.log(profile, account)
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!user) {
          await prisma.user.create({
            data: {
              email: profile.email,
              provider: "Google",
              // @ts-ignore
              pic: profile?.picture || "",
            },
          });
          return true;
        }
        return user.provider === "Google";
      }

      return true;
    },

    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    
    async session({ session, token }: any) {
      if (token?.email) {
        session.user.email = token.email;
      }
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
  signIn: "/", 
  
  error: "/login",  
},

};

export default NextAuth(authOptions);
