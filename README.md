# Attanzeel Schools Ibadan Website

![AT-TANZEEL Logo](./src/assets/images/atlogo.png)

A modern, responsive web application built with React for managing student information, academic records, and administrative workflows at Attanzeel institution. This client-side application provides a comprehensive platform for students, staff, and administrators to interact with educational services efficiently.

## 🚀 Features

### User Management
- **Multi-role Authentication**: Secure login system for students, staff, and administrators
- **Student Registration**: Streamlined registration process for new students
- **Role-based Access Control**: Different dashboards and permissions based on user roles

### Academic Management
- **Score Input & Management**: Intuitive forms for entering and updating student test and exam scores
- **Result Tables**: Comprehensive display of academic results with filtering and sorting
- **Student Dashboards**: Personalized views for students to track their progress

### Administrative Tools
- **Admin Dashboard**: Centralized control panel for institution management
- **Staff Workflow**: Dedicated interface for staff operations and data management
- **Enquiry System**: Contact forms for prospective students and parents

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface built with Vanilla CSS
- **Fast Navigation**: React Router for seamless page transitions

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Vanilla CSS
- **Routing**: React Router DOM 7.9.6
- **HTTP Client**: Axios 1.13.2
- **Icons**: React Icons 5.5.0
- **Linting**: ESLint with React-specific rules

## 📋 Prerequisites

- Node.js: v18.x or higher
- npm: v9.x or higher

## 🔧 Fresh Clone & Quickstart

1. **Clone the repository**
   ```bash
   git clone https://github.com/mojeed-painless/school_portal.git
   cd school_portal
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```

4. **Run tests**
   ```bash
   npm run test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📖 Usage

### For Students
- Log in with your credentials provided by administrator
- Access your personalized dashboard to view scores and academic progress

### For Staff
- Log in with staff credentials
- Use the staff workflow interface to manage student data
- Input and update student scores through dedicated forms

### For Administrators
- Access the admin dashboard for institution-wide management
- Monitor system usage and manage user roles
- Oversee academic records and system settings

## 🏗️ Project Structure

```
src/
├── api/                 # API configuration and authentication
├── assets/              # Static assets (images, styles)
├── components/          # Reusable React components
│   ├── ResultTable.jsx
│   ├── RoleBaseDashboard.jsx
│   ├── ScoreInputForm.jsx
│   └── StudentRegistrationForm.jsx
├── pages/               # Main application pages
│   ├── About.jsx
│   ├── AdminDashboard.jsx
│   ├── Home.jsx
│   ├── StudentLogin.jsx
│   └── ...
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── data.js              # Static data and configurations
```

## 🧪 Testing

```bash
npm run test
```

This runs the Vitest suite for the project.

## 🤝 Contributing

We welcome contributions to improve Attanzeel Website! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and ESLint rules
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

<!-- ## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->

## 📞 Contact

For technical inquiries or maintenance requests:

**Developer**: [Mojeed]
- **Email**: [shittumjd00@gmail.com]
- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/mojeed-shittu)
- **Whatsapp**: [Whatsapp](https://wa.me/2349124323167)

---

*Built with ❤️ for educational excellence*
*Developed by [Mojeed] - December 2025*
![Painless Logo](./src/assets/images/pcalogo2.png)