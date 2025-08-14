# Admin Dashboard for Abike Ade Court - v0.dev Prompt

## Project Overview
Build a professional admin dashboard for Abike Ade Court student accommodation platform. This should be a comprehensive admin interface that matches the design system and aesthetic of the existing client-side application.

## Design System Requirements

### Color Palette & Theme
- **Primary Colors**: Indigo-600 (#4F46E5) to Purple-600 (#9333EA) gradient
- **Secondary Colors**: Gray scale (50-900) for backgrounds and text
- **Accent Colors**: 
  - Success: Green-600 (#16A34A)
  - Warning: Yellow-600 (#CA8A04) 
  - Error: Red-600 (#DC2626)
  - Info: Blue-600 (#2563EB)
- **Dark Mode**: Full dark mode support with proper contrast ratios
- **Background**: Neutral-50 (#FAFAFA) for light mode, Gray-900 (#111827) for dark mode

### Typography & Spacing
- **Font**: Inter (Google Fonts)
- **Font Sizes**: Text-sm (14px), Text-base (16px), Text-lg (18px), Text-xl (20px), Text-2xl (24px), Text-3xl (30px)
- **Spacing**: Consistent 4px grid system (p-4, p-6, p-8, etc.)
- **Border Radius**: 0.5rem (8px) for cards, 0.375rem (6px) for buttons

### Component Styling
- **Cards**: White background with subtle borders (border-gray-200, dark:border-gray-800)
- **Buttons**: 
  - Primary: bg-indigo-600 hover:bg-indigo-700
  - Secondary: variant="outline" with gray borders
  - Destructive: bg-red-600 hover:bg-red-700
- **Inputs**: Clean borders with focus states using ring-indigo-500
- **Shadows**: Subtle shadows for elevation (shadow-sm, shadow-md)

## Layout Structure

### Main Layout
- **Sidebar Navigation**: Fixed left sidebar (w-64) with collapsible mobile menu
- **Header**: Top header with breadcrumbs, notifications, and user menu
- **Main Content**: Responsive grid layout with proper spacing
- **Footer**: Simple footer with copyright information

### Navigation Structure
```
Dashboard
├── Overview (Main dashboard with stats)
├── Users
│   ├── User List
│   ├── User Details
│   └── User Management
├── Rooms
│   ├── Room List
│   ├── Add/Edit Room
│   └── Room Assignments
├── Transactions
│   ├── Transaction List
│   ├── Refunds
│   └── Payment Reports
├── Gallery
│   ├── Image Management
│   └── Featured Images
├── Communications
│   ├── Messages
│   ├── Broadcasts
│   └── Notifications
├── Site Management
│   ├── Site Info
│   └── Settings
└── Wallet
    ├── Balance
    ├── Bank List
    └── Transfers
```

## Key Features to Implement

### 1. Authentication System
- **Login Page**: Clean form with username/password
- **Protected Routes**: Redirect to login if not authenticated
- **Session Management**: Handle admin login/logout
- **Password Reset**: Forgot password functionality

### 2. Dashboard Overview
- **Stats Cards**: Total users, rooms, transactions, revenue
- **Recent Activity**: Latest transactions, new users, room assignments
- **Quick Actions**: Add user, add room, send broadcast
- **Charts**: Revenue trends, occupancy rates, payment status

### 3. User Management
- **User List**: Paginated table with search, sort, filter
- **User Details**: Profile view with edit capabilities
- **User Actions**: Activate/deactivate, verify, view transactions
- **Bulk Operations**: Select multiple users for actions

### 4. Room Management
- **Room List**: Grid/list view with availability status
- **Room Details**: Full room information with images
- **Add/Edit Room**: Form with image upload
- **Room Assignment**: Assign rooms to users with duration
- **Gallery Management**: Add/remove room images

### 5. Transaction Management
- **Transaction List**: All payments with status filters
- **Transaction Details**: Full payment information
- **Refund System**: Initiate and process refunds
- **Reports**: Payment analytics and reports

### 6. Communication Tools
- **Messages**: View and reply to user messages
- **Broadcasts**: Send announcements to all users
- **Notifications**: System notifications for admin

### 7. Site Management
- **Site Info**: Update contact details, social media
- **Gallery**: Manage site images and featured content
- **Settings**: System configuration

### 8. Wallet Management
- **Balance**: View Paystack balance
- **Bank List**: Available banks for transfers
- **Transfers**: Process refunds and transfers

## Technical Requirements

### API Integration
- Use the provided Abikeade SDK for all API calls
- Implement proper error handling and loading states
- Use toast notifications for success/error feedback
- Handle authentication tokens and session management

### State Management
- Use React Context for global state (auth, theme)
- Implement proper loading states for all async operations
- Handle form state with React Hook Form or similar

### Responsive Design
- Mobile-first approach
- Collapsible sidebar for mobile devices
- Responsive tables and grids
- Touch-friendly interactions

### Performance
- Implement pagination for large datasets
- Use proper loading skeletons
- Optimize image loading and display
- Implement proper caching strategies

## UI Components to Include

### Data Display
- **Data Tables**: Sortable, filterable, paginated
- **Cards**: Stats cards, info cards, action cards
- **Lists**: User lists, room lists, transaction lists
- **Charts**: Line charts, bar charts, pie charts

### Forms & Inputs
- **Form Components**: Text inputs, selects, textareas, file uploads
- **Validation**: Real-time validation with error messages
- **Multi-step Forms**: For complex operations like room assignment

### Feedback & Notifications
- **Toast Notifications**: Success, error, warning, info
- **Loading States**: Skeletons, spinners, progress bars
- **Empty States**: When no data is available
- **Error Boundaries**: Graceful error handling

### Navigation & Layout
- **Sidebar Navigation**: Collapsible with icons
- **Breadcrumbs**: Show current location
- **Tabs**: Organize related content
- **Modals**: For confirmations and quick actions

## Specific Implementation Details

### Authentication Flow
1. Login form with validation
2. Store auth tokens in cookies/localStorage
3. Check auth status on app load
4. Redirect to login if not authenticated
5. Handle token expiration and refresh

### Data Fetching Pattern
```javascript
// Example pattern for API calls
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  admin.user.userList({
    params: { page: 1, per_page: 20 },
    onSuccess: (response) => {
      setData(response.data);
      setLoading(false);
    },
    onError: (error) => {
      setError(error);
      setLoading(false);
    }
  });
}, []);
```

### Theme Implementation
- Use next-themes for dark/light mode
- Implement theme toggle in header
- Ensure all components support both themes
- Use CSS variables for consistent theming

### Mobile Responsiveness
- Collapsible sidebar with hamburger menu
- Responsive tables with horizontal scroll
- Touch-friendly buttons and interactions
- Proper spacing for mobile devices

## File Structure Suggestion
```
app/
├── admin/
│   ├── layout.tsx
│   ├── page.tsx (dashboard)
│   ├── login/
│   ├── users/
│   ├── rooms/
│   ├── transactions/
│   ├── gallery/
│   ├── messages/
│   ├── broadcasts/
│   ├── settings/
│   └── wallet/
├── components/
│   ├── ui/ (reuse existing components)
│   ├── admin/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── stats-cards.tsx
│   │   ├── data-table.tsx
│   │   └── forms/
│   └── charts/
├── hooks/
│   ├── use-admin-auth.ts
│   ├── use-users.ts
│   ├── use-rooms.ts
│   └── use-transactions.ts
└── lib/
    ├── admin-api.ts
    └── admin-utils.ts
```

## Success Criteria
1. **Visual Consistency**: Matches client-side design perfectly
2. **Functionality**: All admin features work correctly
3. **Performance**: Fast loading and smooth interactions
4. **Responsive**: Works well on all device sizes
5. **Accessibility**: Proper ARIA labels and keyboard navigation
6. **Error Handling**: Graceful error states and user feedback
7. **Security**: Proper authentication and authorization

## Additional Notes
- Focus on creating a professional, clean interface
- Prioritize usability and efficiency for admin tasks
- Ensure all forms have proper validation
- Implement proper loading states and error handling
- Use consistent spacing and typography throughout
- Make sure dark mode works perfectly
- Include proper documentation for complex features

The admin dashboard should feel like a natural extension of the client application while providing powerful administrative capabilities in an intuitive interface.
