# Communication Tracker  

A modern web application for tracking and managing company communications.

## Features

- 👥 Company Management
- 📊 Communication Analytics
- 📅 Calendar View
- 📈 Reports Generation (CSV & PDF)
- 📱 Responsive Design
- 🔔 Real-time Notifications

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **PDF Generation**: jsPDF
- **Build Tool**: Vite

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Dependencies

### Core Dependencies
```json
{
  "@headlessui/react": "^1.7.18",
  "@tanstack/react-query": "^5.24.1",
  "clsx": "^2.1.0",
  "date-fns": "^3.3.1",
  "jspdf": "^2.5.1",
  "lucide-react": "^0.344.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.22.1",
  "recharts": "^2.12.2",
  "tailwind-merge": "^2.2.1",
  "zustand": "^4.5.1"
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^9.9.1",
  "@types/react": "^18.3.5",
  "@types/react-dom": "^18.3.0",
  "@vitejs/plugin-react": "^4.3.1",
  "autoprefixer": "^10.4.18",
  "eslint": "^9.9.1",
  "eslint-plugin-react-hooks": "^5.1.0-rc.0",
  "eslint-plugin-react-refresh": "^0.4.11",
  "globals": "^15.9.0",
  "postcss": "^8.4.35",
  "tailwindcss": "^3.4.1",
  "typescript": "^5.5.3",
  "typescript-eslint": "^8.3.0",
  "vite": "^5.4.2"
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Login Credentials

### Admin Access
- Username: admin
- Password: admin123

### User Access
- Username: user
- Password: user123

## Project Structure

```
src/
├── components/        # Reusable UI components
├── lib/              # Utility functions and helpers
├── pages/            # Page components
├── store/            # State management
└── types/            # TypeScript type definitions
```

## Features Documentation

### Admin Module
- Company management (CRUD operations)
- Communication method configuration
- User management

### User Module
- Communication tracking
- Calendar view
- Notifications
- Bulk actions

### Reports Module
- CSV export
- PDF export
- Analytics dashboard
- Communication statistics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

<!-- PR #1: Added note for Pull Request testing -->


<!-- Badge test PR #2 -->


## Testing for YOLO Badge

This branch tests PR merging without reviews.
