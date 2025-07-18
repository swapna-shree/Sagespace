# SageSpace

A judgment-free space to share your thoughts, receive support, and find peace. SageSpace is a mental health support platform that provides a quiet corner of the internet for reflection and community.

## Features

- **User Authentication**: Secure sign-up and sign-in with email verification
- **Google OAuth**: Quick sign-in with Google accounts
- **Profile Management**: Customize your profile with display names and avatars
- **Message System**: Send and receive supportive messages
- **AI-Powered Suggestions**: Get thoughtful questions and affirmations from our AI companion
- **Privacy Controls**: Toggle message acceptance settings
- **Modern UI**: Beautiful, accessible interface built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: NextAuth.js with Google OAuth and credentials
- **Database**: MongoDB with Mongoose ODM
- **Email**: Resend for verification emails
- **AI**: Google Gemini for message suggestions
- **Forms**: React Hook Form with Zod validation
- **Utilities**: use-debounce for optimized API calls

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Google OAuth credentials
- Resend API key
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sagespace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:
- `MONGO_URI`: Your MongoDB connection string
- `NEXTAUTH_SECRET`: A random secret for NextAuth
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth credentials
- `RESEND_API_KEY`: Resend email service API key
- `GEMINI_API_KEY`: Google Gemini API key

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── context/              # React context providers
├── helpers/              # Utility functions
├── lib/                  # Library configurations
├── model/                # MongoDB models
├── schemas/              # Zod validation schemas
├── types/                # TypeScript type definitions
└── validation/           # Custom validation functions
```

## API Routes

- `POST /api/signup` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth authentication
- `POST /api/resend` - Email verification
- `GET /api/messages` - Fetch user messages
- `POST /api/messages` - Send new message
- `PUT /api/messages/accept` - Toggle message acceptance
- `PUT /api/profile` - Update user profile
- `PUT /api/change-password` - Change user password
- `POST /api/suggest-messages` - Get AI suggestions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@sagespace.com or create an issue in the repository.
