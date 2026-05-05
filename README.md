
# Church Community Web App

## About the Project

Church Community Web App is a Vue 3 frontend application created for a church community platform.

The application allows public visitors to view church news, events, ministries, resources, and institutional information. It also includes an admin area where an authorized user can manage the content displayed on the public website.

This project works together with a Laravel REST API backend.

---

## Main Features

- Public home page for church visitors
- News section
- Events section
- Ministries section
- Resources section
- Institutional information pages
- Contact form
- Admin login
- Admin dashboard
- Content management for news, events, ministries, resources, and pages
- Connection with Laravel REST API

---

## User Roles

### Public Visitors

Public visitors can:

- View published news
- View upcoming events
- Explore church ministries
- Access public resources
- Read institutional information
- Send contact messages

### Admin User

The admin can:

- Log in securely
- Create, edit, and delete news
- Manage events
- Manage ministries
- Manage resources
- Update institutional pages
- Upload images and public content

---

## Technologies Used

- Vue 3
- Vite
- JavaScript
- Vue Router
- Axios
- CSS
- Laravel REST API backend

---

## Project Structure

```txt
src/
  assets/
  components/
  router/
  views/
  services/
````

---

## API Configuration

Create a `.env` file in the root of the project and add:

```env
VITE_API_URL=http://localhost:8000/api
```

The frontend communicates with the Laravel backend through this API URL.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/dayanarojasdrp/vue-app-pavel.git
cd vue-app-pavel
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Backend Repository

This frontend is connected to the Laravel API backend:

```txt
https://github.com/dayanarojasdrp/laravel-pavel
```

---

## Screenshots

Screenshots will be added to show the public website and admin dashboard.

Suggested screenshots:

* Home page
* News section
* Events section
* Admin login
* Admin dashboard

---

## Future Improvements

* Improve responsive design
* Add more loading and error states
* Improve form validation
* Add better image optimization
* Improve accessibility
* Add more admin dashboard statistics

---

## Project Purpose

This project was created as a real-world church communication platform. Its goal is to help church administrators publish information in a structured way and help visitors stay informed about news, events, ministries, and community activities.

---

## Author

Developed by Dayana Rojas

