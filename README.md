# SageSpace

A judgment-free space to share your thoughts, receive support, and find peace. SageSpace is a mental health support platform that provides a quiet corner of the internet for reflection and community.

## Features

- **User Authentication**: Secure sign-up and sign-in with email verification and OTP
- **Google OAuth**: Quick sign-in with Google accounts
- **Profile Management**: Customize your profile with display names, usernames, and avatars
- **Message System**: Send and receive supportive messages with privacy controls
- **AI-Powered Suggestions**: Get thoughtful questions and affirmations from Google Gemini AI
- **Privacy Controls**: Toggle message acceptance settings with secure session validation
- **Modern UI**: Beautiful, accessible interface with warm pastel color palette and SaaS-style navigation
- **Responsive Design**: Optimized for all devices with consistent branding
- **Session Management**: Secure session-based authentication with NextAuth.js

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components, custom warm pastel palette
- **Authentication**: NextAuth.js with Google OAuth and credentials provider
- **Database**: MongoDB with Mongoose ODM
- **Email**: Resend for verification emails with custom templates
- **AI**: Google Gemini for intelligent message suggestions and support
- **Forms**: React Hook Form with Zod validation schemas
- **Utilities**: use-debounce for optimized API calls, custom validation functions
- **State Management**: React Context for authentication state

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (Atlas recommended)
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
```env
# Database
MONGO_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Service
RESEND_API_KEY=your_resend_api_key

# AI Service
GEMINI_API_KEY=your_gemini_api_key
```

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
│   │   ├── auth/          # Authentication endpoints
│   │   ├── messages/      # Message management
│   │   ├── profile/       # Profile operations
│   │   └── suggest-messages/ # AI suggestions
│   ├── dashboard/         # User dashboard
│   ├── home/              # Landing page
│   ├── messages/          # Messages page
│   ├── profile/           # Profile management
│   ├── settings/          # User settings
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   └── verify/            # Email verification
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

### Authentication
- `POST /api/signup` - User registration with email verification
- `POST /api/auth/[...nextauth]` - NextAuth authentication (credentials + Google OAuth)
- `POST /api/resend` - Resend verification email
- `POST /api/verify-code` - Verify OTP code

### User Management
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `PUT /api/change-password` - Change user password
- `GET /api/check-username` - Check username uniqueness

### Messages
- `GET /api/messages` - Fetch user messages
- `POST /api/messages` - Send new message
- `PUT /api/toggle-messages` - Toggle message acceptance (legacy)
- `POST /api/toggle-messages/secure-route` - Secure message toggle with session validation

### AI Features
- `POST /api/suggest-messages` - Get AI-powered message suggestions using Google Gemini

## Key Features Implemented

### Authentication & Security
- NextAuth.js integration with credentials and Google OAuth
- Email verification with OTP system
- Session-based authentication
- Secure API routes with session validation
- Password hashing and validation

### User Experience
- Modern SaaS-style navigation with session awareness
- Warm pastel color palette for emotional comfort
- Responsive design across all devices
- Consistent branding and typography
- Loading states and error handling

### AI Integration
- Google Gemini AI for intelligent message suggestions
- Supportive questions and affirmations generation
- Context-aware responses

### Database & API
- MongoDB with Mongoose for data persistence
- Comprehensive API endpoints with validation
- Error handling and proper HTTP status codes
- Username uniqueness validation

## Development Status

- **Backend**: Complete with all API endpoints and database models
- **Authentication**: Fully implemented with NextAuth.js
- **Frontend**: Modern UI with consistent design system
- **AI Integration**: Google Gemini integration complete
- **Security**: Session validation and secure routes implemented

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**SageSpace** - A safe space for your thoughts.
