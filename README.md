Unick Enterprises Web-based Order & Inventory Management System

A comprehensive order processing, inventory, and production tracking system built with:

Backend: Laravel (PHP) + MySQL

Frontend: React + Bootstrap

Real-time: Pusher / Socket.io

Reporting: Excel + PDF exports

This system is tailored for Unick Enterprises Inc. (Cabuyao, Laguna) to improve order fulfillment, daily woodcraft production monitoring, inventory tracking, and customer engagement through an integrated ordering website.

📦 Tech Stack

Backend (Laravel + MySQL)

Laravel Sanctum → API authentication

Spatie Laravel Permission → Role & permission management

Laravel DomPDF → PDF report generation

Maatwebsite Excel → Excel import/export

Pusher PHP Server → Real-time notifications/events

Laravel Telescope (dev) → Debugging & monitoring

Frontend (React + Bootstrap)

React Router DOM → Routing & navigation

React Bootstrap → UI components + Bootstrap styles

Axios → API calls

Chart.js + React ChartJS 2 → Data visualization

React Hook Form + Yup → Forms & validation

React Toastify → Toast notifications

Socket.io Client → Real-time updates

FontAwesome Free → Icons

Moment.js → Date formatting

React Select → Custom select dropdowns

React Datepicker → Date picker UI

⚙️ Installation
🔹 Backend Setup (Laravel)
# Go to backend folder
cd unick-backend

# Install dependencies
composer install

# Install required packages
composer require laravel/sanctum
composer require spatie/laravel-permission
composer require barryvdh/laravel-dompdf
composer require maatwebsite/excel
composer require pusher/pusher-php-server

# Install development dependencies
composer require --dev laravel/telescope

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Start development server
php artisan serve

🔹 Frontend Setup (React)
# Go to frontend folder
cd unick-frontend

# Install dependencies
npm install

# Install required packages
npm install react-router-dom
npm install bootstrap react-bootstrap
npm install axios
npm install chart.js react-chartjs-2
npm install @hookform/resolvers yup react-hook-form
npm install react-toastify
npm install socket.io-client
npm install @fortawesome/fontawesome-free
npm install moment
npm install react-select
npm install react-datepicker

# Start development server
npm start

📊 Features

✅ Secure API authentication (Sanctum)
✅ Role-based access control (Admin, Staff, Customer)
✅ Order management & production tracking
✅ Real-time notifications for new orders & inventory updates
✅ PDF & Excel report generation (sales, inventory, production)
✅ Interactive dashboards with charts
✅ Modern responsive UI with Bootstrap
✅ Form validation & error handling
✅ User-friendly date & dropdown inputs

📑 Dependencies Table
🔹 Backend (Laravel)
Package	Purpose	Example Use Case
laravel/sanctum	API authentication	Secure login for customers/staff with tokens
spatie/laravel-permission	Role & permission management	Admin can manage users, staff can process orders, customers can order
barryvdh/laravel-dompdf	Generate PDF reports	Export invoices, receipts, production reports
maatwebsite/excel	Excel/CSV import & export	Download sales report in Excel, import product list
pusher/pusher-php-server	Real-time updates	Notify staff when a new order is placed
laravel/telescope	Debugging & monitoring (dev only)	View queries, API requests, exceptions
🔹 Frontend (React)
Package	Purpose	Example Use Case
react-router-dom	Routing/navigation	Navigate between Dashboard, Orders, Reports
bootstrap react-bootstrap	UI design & components	Responsive layouts, styled buttons, tables
axios	API requests	Fetch product inventory from backend
chart.js react-chartjs-2	Charts & graphs	Sales trends, inventory stock levels
react-hook-form yup @hookform/resolvers	Form handling & validation	Validate order form before submitting
react-toastify	Notifications	Show “Order placed successfully” toast
socket.io-client	Real-time communication	Auto-update dashboard when new orders arrive
@fortawesome/fontawesome-free	Icons	Shopping cart, user, settings icons
moment	Date/time formatting	Show “Aug 19, 2025” or “3 days ago”
react-select	Custom dropdowns	Choose product category, assign roles
react-datepicker	Date picker input	Select delivery date or filter reports
🗂 Folder Structure
unick-backend/   # Laravel API + database
unick-frontend/  # React frontend

👨‍💻 Development Notes

Use Telescope to debug queries, requests, and jobs.

Use Pusher/Socket.io for real-time updates on orders/inventory.

Export reports via Excel/PDF for documentation and analysis.

📜 License

This project is developed for Unick Enterprises Inc.
Usage is restricted unless permitted.
