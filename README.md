# 📖 Spreadsheet Clone 
**Page Link** https://google-sheets-clone-rho.vercel.app/

## 📌 Overview
This is a fully functional **spreadsheet application**, built with **React** and **Zustand** for state management. It includes **formula support, styling, text formatting, and persistence via localStorage.**

## 🚀 Features
✅ **Real-time Editing** - Click on any cell to edit its contents.  
✅ **Formula Support** - Perform calculations using functions like `SUM()`, `AVERAGE()`, etc.  
✅ **Text Formatting** - Bold, Italic, Underline, Strikethrough, Font size, Colors.  
✅ **Persistent Storage** - Data is saved in `localStorage`, so it remains after refresh.  
✅ **Undo/Redo Support** - Modify changes and revert if necessary.  
✅ **Dynamic Row & Column Addition** - Scroll to load more rows/columns automatically.  

## 🛠 Tech Stack Used & Why?

| **Technology** | **Purpose** | **Why?** |
|--------------|------------|--------|
| **React** | Frontend UI | Reusable components, fast rendering with Virtual DOM. |
| **Zustand** | State Management | Simple, lightweight alternative to Redux, excellent for real-time global state updates. |
| **LocalStorage** | Data Persistence | Saves user progress without requiring a backend. |
| **SCSS** | Styling | Clean and modular styling with nesting and variables. |
| **React Icons** | UI Enhancements | Provides clean and customizable icons. |

## 🔢 Supported Formulas
The spreadsheet supports the following **formulas** (must start with `=`).

| **Formula** | **Description** | **Example** |
|------------|---------------|------------|
| `SUM(range)` | Adds up numbers in a range. | `=SUM(A1:A3)` |
| `AVERAGE(range)` | Finds the average of a range. | `=AVERAGE(B1:B4)` |
| `MAX(range)` | Returns the highest value. | `=MAX(C1:C10)` |
| `MIN(range)` | Returns the lowest value. | `=MIN(D2:D8)` |
| `COUNT(range)` | Counts numeric cells in a range. | `=COUNT(A1:A10)` |

### 📌 How to Use:
1. Click a cell and type a formula (e.g., `=SUM(A1:A5)`).  
2. Press **Enter** to apply it.  
3. The result will be displayed; double-click to edit the formula.  

## 📥 Installation & Running Locally
1️⃣ **Clone the repository:**  
```sh
git clone https://github.com/onslaught7/Google_Sheets_Clone.git
cd client
```
2️⃣ **Install dependencies:**  
```sh
npm install
```
3️⃣ **Start the development server:**  
```sh
npm run dev
```
4️⃣ Open **http://localhost:5173** in your browser.  

## 📤 Deployment
This app is deployed for free using **Vercel**.  

## 🛠 Future Enhancements
- **Find & Replace** functionality.  
- **Duplicate Removal** feature.  
- **Multi-cell Selection & Bulk Formatting.**  
- **Exporting to CSV or Excel.**    

## 🔗 Connect with Me
📧 **Email:** krutibashmohapatra7@gmail.com  
🔗 **LinkedIn:** https://www.linkedin.com/in/krutibash-mohapatra/ 
🔗 **GitHUb:** https://github.com/onslaught7

## ✨ Final Thoughts
This spreadsheet clone provides an intuitive **Excel-like** experience directly in the browser. With real-time calculations, formatting options, and **persistent storage**, it’s a lightweight clone using **React, Zustand, and state management**.  

Enjoy using it! 🎉  

