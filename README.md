# Project Name

**Autocomplete component**

# Build With

**Languages**: HTML, CSS, TypeScript, Javascript   
**Library**: React  
**Build Tool**: Vite

## How to Use

This repository is private, so you won't be able to clone it directly. Instead, you need to download the project as a ZIP file.

### Steps to Set Up:

1. **Download the ZIP file** of the repository from the provided source.
2. **Extract** the contents of the ZIP file to a directory on your local machine.
3. **Navigate to the project directory** in your terminal/command prompt.

4. **Install Dependencies**:
   Make sure you're using **Node.js version 18.x** or higher. To install the dependencies, run:
   ```bash
   npm install
   ```

   Start devlopment server
   ```bash
   npm run dev
   ```

   Access the Application:
   ```bash
   http://localhost:5173/
   ```

### Regarding Mock Data
   The autocomplete component uses mock data of countries for demonstration. The mock data is structured as follows:
   ```
   [
     {
       "id": 1,
       "name": "Xyz",
       "currency": "xyz"
     }
   ]
   ```
   
### API PlaceHolder
   In the codebase, there is a placeholder URL for making actual API calls. Before replacing it with a API endpoint, ensure that the API supports CORS. During development, we use 
   a proxy to bypass CORS issues.

1. To use the cors-anywhere proxy service during development, follow these steps

2. Request Temporary Access:
   1. Open https://cors-anywhere.herokuapp.com/corsdemo in your browser.
   2. Click the "Request temporary access" button.
   3. After temporary access is granted, use the updated API URL (apiUrl) in your API call. This should resolve CORS-related issues while developing locally.

3. Replace the below API URL in the placeholder in the code

4. API URL = `https://cors-anywhere.herokuapp.com/https://freetestapi.com/api/v1/countries`
  
