# 🚀 Jobby App

A modern job search platform built with React that allows users to browse, search, and filter job listings. This application provides a seamless user experience with authentication, job filtering, and detailed job information.

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Authentication
- Secure user login system
- JWT token-based authentication
- Protected routes for authenticated users only
- Persistent login sessions using local storage

### Job Listings
- Browse comprehensive list of available jobs
- Search jobs by title
- Filter by employment type (Full Time, Part Time, Freelance, Internship)
- Filter by salary range
- Responsive design for all screen sizes

### Job Details
- View detailed information about specific jobs
- Company information and ratings
- Required skills for the position
- Life at company insights
- Similar job recommendations
- Direct link to company website

### User Experience
- Clean and intuitive interface
- Loading states for better UX
- Error handling with user-friendly messages
- Smooth navigation between pages
- Retry options on failures

## 🎯 Demo

**Live Demo:** https://mj35jobbyapp.ccbp.tech/

**Test Credentials:**
- Username: `rahul`
- Password: `rahul@2021`

## 🛠️ Technologies Used

- **React** - Frontend library
- **React Router** - Navigation and routing
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling
- **Fetch API** - HTTP requests
- **JWT** - Authentication tokens
- **Cookies/Local Storage** - Client-side storage

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or pnpm package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/manoj2304s/jobby-app.git
```

2. Navigate to the project directory
```bash
cd jobby-app
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm start
```

5. Open your browser and visit
```
http://localhost:3000
```

## 📁 Project Structure

```
jobby-app/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── LoginForm/
│   │   ├── Home/
│   │   ├── Jobs/
│   │   ├── JobCard/
│   │   ├── JobItemDetails/
│   │   ├── JobEmploymentTypesList/
│   │   ├── SalaryRange/
│   │   ├── ProfileDetails/
│   │   ├── NotFound/
│   │   └── ProtectedRoute/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .eslintrc
├── .prettierrc
├── package.json
└── README.md
```

## 💻 Usage

### Login
1. Navigate to the login page
2. Enter valid credentials
3. Click "Login" button
4. Upon successful authentication, you'll be redirected to the Home page

### Browse Jobs
1. Click on "Jobs" in the navigation menu
2. View all available job listings
3. Use the search bar to search by job title
4. Apply filters:
   - Select employment types (checkboxes)
   - Choose salary range (radio buttons)

### View Job Details
1. Click on any job card from the jobs list
2. View comprehensive job information
3. Check required skills and company details
4. Explore similar job recommendations
5. Visit company website via provided link

### Logout
1. Click on the "Logout" button in the header
2. You'll be redirected to the login page
3. Your session will be cleared

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (< 768px)
- Tablets (768px - 991px)
- Desktops (992px - 1199px)
- Large screens (≥ 1200px)

## 🎨 Key Components

### ProtectedRoute
Ensures only authenticated users can access protected pages. Redirects to login if no valid JWT token is found.

### Header
Navigation component with links to Home, Jobs, and Logout functionality.

### LoginForm
Handles user authentication with form validation and error handling.

### Jobs
Main jobs listing page with search and filter capabilities.

### JobItemDetails
Displays comprehensive information about a specific job including skills, company details, and similar jobs.

### JobEmploymentTypesList
Renders employment type filter checkboxes.

### SalaryRange
Renders salary range filter options.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨💻 Author

**Manoj**
- GitHub: [@manoj2304s](https://github.com/manoj2304s)

## 🙏 Acknowledgments

- Design inspired by Nxtwave
- Icons and images from Nxtwave
- API provided by Nxtwave

---

Made by Manoj
