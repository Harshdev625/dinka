<div align="center">

# Dinka

### *Connect. Share. Discover.*

**A modern social media platform** built with Next.js, React, Prisma, and PostgreSQL. Share posts, interact through likes and comments, chat in real time, and connect with others.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.12.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)

[🐛 Report Bug](https://github.com/nios-x/dinka/issues) • [💡 Request Feature](https://github.com/nios-x/dinka/issues)

</div>

---

##  Features

<table>
<tr>
<td>

** Core Social Features**
-  Create, edit & delete posts
-  Like & comment system
-  Share posts with friends
-  Infinite scroll feed
-  Post visibility controls

</td>
<td>

** Social Connections**
-  Follow/unfollow users
-  Real-time messaging
-  Voice & video calls
-  Rich user profiles
-  Discover new people

</td>
</tr>
<tr>
<td>

** User Experience**
-  Dark/light mode toggle
-  Mobile-first responsive design
-  Lightning-fast performance
-  Smooth animations (GSAP)
-  Real-time notifications

</td>
<td>

** Security & Authentication**
-  NextAuth.js integration
-  Email verification (OTP)
-  Secure password handling
-  Multiple auth providers
-  Session management

</td>
</tr>
</table>

---

##  Tech Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

### Backend & Database
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-purple?style=flat-square&logo=auth0&logoColor=white)

### Tools & Libraries
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

</div>

---

##  Quick Start

###  Prerequisites

- **Node.js** `>= 18.0.0`
- **PostgreSQL** database (local or cloud)
- **Git**
- **npm** or **yarn**

###  Installation

```bash
# 📥 Clone the repository
git clone https://github.com/nios-x/dinka.git
cd dinka

# 📦 Install dependencies
npm install
# or
yarn install
```

###  Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dinka"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (for OTP verification)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

###  Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) View your data
npx prisma studio
```

###  Run the Application

```bash
#  Start development server
npm run dev

#  Build for production
npm run build

#  Start production server
npm start
```

** Open [http://localhost:3000](http://localhost:3000) in your browser!**

---

##  Project Structure

```
dinka/
  app/                    # Next.js App Router
     api/v1/            # API endpoints
        auth/          # Authentication
        chats/         # Chat management
        comment/       # Comment operations
        create-post/   # Post creation
        friends/       # Friend management
        togglelike/    # Like/unlike posts
     call/              # Video call pages
     chat/              # Chat interface
     profile/           # User profiles
     Providers/         # Context providers
  components/             # Reusable UI components
     Posts/             # Post-related components
     ui/                # shadcn/ui components
     Comment/           # Comment system
     Friends/           # Friend management
  lib/                   # Utilities & configs
     prisma.ts          # Prisma client
     cloudinary.ts      # Cloudinary config
     utils.ts           # Helper functions
  prisma/                # Database schema & migrations
  public/                # Static assets
```

---

##  API Endpoints

### Authentication
- `POST /api/v1/auth/[...nextauth]` - NextAuth.js authentication
- Email verification with OTP system

### Posts
- `GET /api/v1/get-posts` - Fetch user feed
- `GET /api/v1/getuserposts` - Get user's posts
- `POST /api/v1/create-post` - Create new post
- `DELETE /api/v1/deletepost` - Delete post
- `POST /api/v1/togglelike` - Like/unlike post

### Social Features
- `GET /api/v1/friends` - Manage friend connections
- `POST /api/v1/chats` - Send messages
- `POST /api/v1/comment` - Add comments
- `GET /api/v1/getuserdetails` - Get user profile details

---

##  Contributing

We welcome contributions! Here's how you can help:

<div align="center">

[![Contributors](https://img.shields.io/github/contributors/nios-x/dinka?style=for-the-badge)](https://github.com/nios-x/dinka/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/nios-x/dinka?style=for-the-badge)](https://github.com/nios-x/dinka/network/members)
[![Stars](https://img.shields.io/github/stars/nios-x/dinka?style=for-the-badge)](https://github.com/nios-x/dinka/stargazers)
[![Issues](https://img.shields.io/github/issues/nios-x/dinka?style=for-the-badge)](https://github.com/nios-x/dinka/issues)

</div>

### Development Workflow

1.  **Fork** the repository
2.  **Clone** your fork locally
3.  **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4.  **Make** your changes
5.  **Test** your changes
6.  **Commit** your changes (`git commit -m 'Add amazing feature'`)
7.  **Push** to your branch (`git push origin feature/amazing-feature`)
8.  **Open** a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Ensure your code passes all existing tests

---

##  Roadmap

- [ ]  Enhanced video calling features
- [ ]  Mobile app (React Native)
- [ ]  AI-powered content recommendations
- [ ]  Internationalization (i18n)
- [ ]  Analytics dashboard
- [ ]  Gaming integration
- [ ]  Creator monetization tools

---

##  Known Issues

- Video calls may experience latency on slower connections
- Image uploads are limited by Cloudinary configuration
- Real-time notifications require proper WebSocket setup

---

##  Support

If you encounter any issues or have questions:

- 🐛 **Issues**: [GitHub Issues](https://github.com/nios-x/dinka/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/nios-x/dinka/discussions)

---

##  License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 💖 Show your support

Give a ⭐️ if this project helped you!

**Made with ❤️ by [nios-x](https://github.com/nios-x)**

[🔝 Back to top](#dinka)

</div>
