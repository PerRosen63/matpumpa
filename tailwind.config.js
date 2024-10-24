/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {    
    extend: {
      colors: {
        'orange-custom': '#ea6c06',
        'green-custom': '#626a40',
        'yellow-custom': '#fffcdf',
        'yellow-custom-link': '#fff38c',
      },
      fontSize: {
        'clamp-h1': "clamp(3rem, 2.5385rem + 2.0513vw, 4rem)",
        'clamp-h2': "clamp(2.4rem, 2.1231rem + 1.2308vw, 3rem)",
        'clamp-h3': "clamp(2.1rem, 1.9154rem + 0.8205vw, 2.5rem)",
        'clamp-h4': "clamp(1.8rem, 1.7077rem + 0.4103vw, 2rem)",
        'clamp-h5': "clamp(1.6rem, 1.5308rem + 0.3077vw, 1.75rem)",
        'clamp-h6': "clamp(1.4rem, 1.3538rem + 0.2051vw, 1.5rem)",
      },
    },
  },
  plugins: [],
}

