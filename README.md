# 🍳 The Kitchen Sketch - Premium Recipe Collection

> A sophisticated, modern recipe management platform built with elegant design and powerful functionality.

![Recipe Portal Banner](https://img.shields.io/badge/Recipe-Portal-orange?style=for-the-badge&logo=chef&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)

## ✨ Features

### 🎨 **Premium Dark Theme Design**
- **Sophisticated UI**: Modern dark theme with premium color palette
- **Elegant Typography**: Beautiful Playfair Display + Inter font pairing
- **Smooth Animations**: Subtle hover effects and transitions
- **Responsive Design**: Perfect experience across all devices

### 🔍 **Advanced Search & Filtering**
- **Smart Search**: Search by recipe title, ingredients, or instructions
- **Category Filtering**: Filter by meal type (Breakfast, Lunch, Dinner, etc.)
- **Difficulty Levels**: Easy, Medium, and Hard recipe classifications
- **Real-time Results**: Instant search with live result counts

### 📝 **Recipe Management**
- **Easy Creation**: Intuitive form for adding new recipes
- **Detailed Information**: Title, cooking time, category, difficulty, ingredients, and instructions
- **Quick Editing**: Simple recipe modification
- **One-Click Deletion**: Easy recipe removal with confirmation

### 🎯 **User Experience**
- **Landing Page**: Beautiful welcome experience
- **Organized Navigation**: Clean separation between browsing and adding recipes
- **Visual Feedback**: Interactive elements with professional animations
- **Mobile-First**: Optimized for all screen sizes

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v8 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Evin-Jaison/Cooking_Recipe_Portal.git
   cd Recipe_portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL Database**
   ```sql
   CREATE DATABASE recipe_portal;
   USE recipe_portal;

   CREATE TABLE recipes (
     recipe_id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     cooking_time VARCHAR(100),
     category VARCHAR(100),
     difficulty VARCHAR(50),
     ingredients TEXT,
     instructions TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Configure Database Connection**
   
   Update `db.js` with your MySQL credentials:
   ```javascript
   const db = mysql.createConnection({
     host: "localhost",
     user: "your_username",
     password: "your_password",
     database: "recipe_portal"
   });
   ```

5. **Start the Server**
   ```bash
   npm start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
Recipe_portal/
├── 📁 public/           # Frontend assets
│   ├── 📄 index.html    # Main HTML structure
│   ├── 🎨 style.css     # Premium dark theme styles
│   └── ⚡ script.js     # Frontend functionality
├── 🔧 server.js         # Express.js backend
├── 🗄️ db.js            # MySQL database connection
├── 📦 package.json      # Project dependencies
└── 📚 README.md         # Project documentation
```

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS custom properties
- **Vanilla JavaScript**: Clean, efficient frontend logic
- **Google Fonts**: Playfair Display & Inter typography

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MySQL2**: Database driver
- **Body-Parser**: Request parsing middleware

### Design System
- **Dark Theme**: Sophisticated color palette
- **Typography Scale**: Hierarchical font system
- **Spacing System**: Consistent spacing variables
- **Component Library**: Reusable UI components

## 📱 Responsive Breakpoints

- **Mobile**: `< 480px`
- **Tablet**: `480px - 768px`
- **Desktop**: `> 768px`

## 🎨 Color Palette

```css
/* Dark Theme Colors */
--bg-primary: #0F1419      /* Deep dark background */
--surface-primary: #1E2936  /* Card backgrounds */
--text-primary: #F8FAFC    /* Primary text */
--accent-primary: #F97316   /* Orange accent */
--success: #22C55E         /* Success states */
--danger: #EF4444          /* Delete actions */
```

## 🔌 API Endpoints

### Get All Recipes
```http
GET /recipes
```

### Create New Recipe
```http
POST /recipes
Content-Type: application/json

{
  "title": "Recipe Name",
  "cooking_time": "30 mins",
  "category": "Dinner",
  "difficulty": "Easy",
  "ingredients": "Ingredient list...",
  "instructions": "Step by step..."
}
```

### Delete Recipe
```http
DELETE /recipes/:id
```

## 🚀 Deployment

### Local Development
```bash
npm start
```
Server runs on `http://localhost:3000`

### Production Deployment
1. Set up production MySQL database
2. Update database credentials
3. Configure environment variables
4. Deploy to your preferred platform (Heroku, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Evin Jaison**
- GitHub: [@Evin-Jaison](https://github.com/Evin-Jaison)
- Repository: [Cooking_Recipe_Portal](https://github.com/Evin-Jaison/Cooking_Recipe_Portal)

## 🙏 Acknowledgments

- Google Fonts for beautiful typography
- Modern CSS techniques for the dark theme
- Express.js community for excellent documentation
- MySQL for reliable database management

---

<div align="center">
  <p>Made with ❤️ and lots of ☕</p>
  <p><strong>Happy Cooking! 🍳</strong></p>
</div>
