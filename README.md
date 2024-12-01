## Project Name

**Autocomplete component**

## Build With

**Languages**: HTML, CSS, TypeScript, Javascript  
**Library**: React  
**Build Tool**: Vite

## Demo 

https://github.com/user-attachments/assets/3e406379-ca8f-423d-9d15-55425ec69a74

## How to Use

This repository is private, so you won't be able to clone it directly. Instead, you need to download the project as a ZIP file.

## Steps to Set Up:

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

5. **Run the Application**: Access the Application on http://localhost:5173/

6. **Run Tests**:
   To run tests, use the following command:
   ```bash
   npm run test
   ```

## Regarding Mock Data

The autocomplete component uses mock data of countries for demonstration. The mock data is structured as follows:

```json
 {
   "id": 57,
   "name": "Finland",
   "currency": "Euro"
 },
 {
   "id": 58,
   "name": "France",
   "currency": "Euro"
 },
```

## API PlaceHolder

In the codebase,`src/App.tsx` file line no 23, isMockEnabled is set to `true` by default. you can set it to `false` to use the API.

We are using the cors-anywhere proxy service during development.

Please follow below steps to solve CORS issues during running the application.

**Request Temporary Access**

1.  Open https://cors-anywhere.herokuapp.com/corsdemo in your browser.
2.  Click the "Request temporary access" button.
3.  After temporary access is granted, you can use the service.

