# My New Blogging Website

Welcome to the repository for my blogging website, now live at [ojasmaheshwari.netlify.app](https://ojasmaheshwari.netlify.app/).
Here people can write blogs and other people can like and comment on them.

## Overview

This project allows users to signup/login, view famous blogs present on the website, write their own blogs, comment on other's blogs, like other's blogs, view other people's profiles, customize their own profiles etc.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Hosting:** Netlify

## Project Structure

```
My-New-Website/
├── client/         # Frontend source code
├── server/         # Backend server code
├── .gitignore      # Git ignore file
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ojasmaheshwari/My-New-Website.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd My-New-Website
   ```

3. **Navigate to server:**

   ```bash
   cd server
   ```
3. **Change CORS target in index.js to localhost:<PORT>:**

   ```bash
   res.header(`Access-Control-Allow-Origin`, `http://localhost:5173`)
   ```

4. **Create env files for client and server and add the appropriate MongoDb connect string to your env file**

5. **Run your server**
   ```bash
   node index.js
   ```

6. **Run your client**
   ```bash
   cd ../client
   npm run dev
   ```

7. **The application should be live now**

## Live Demo

Check out the live version of the website here: [ojasmaheshwari.netlify.app](https://ojasmaheshwari.netlify.app/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

---

*Developed by [Ojas Maheshwari](https://github.com/ojasmaheshwari)*
