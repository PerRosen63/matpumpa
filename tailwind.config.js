/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {    
    fontFamily: {
      'sans': ['Arima', 'Helvetica', 'Arial', 'sans-serif'],
    },
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
      strokeWidth: {
        '3': '3px',
        '4': '4px',
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
        '7': '7px',
      },
      backgroundImage: {
        'start-1': "url(https://mfdm.se/woo/wp-content/uploads/pumpa1_blur-600x508.jpg);",
        'start-2': "url(https://mfdm.se/woo/wp-content/uploads/pumpor1_blur-600x329.jpg);",
        'start-3': "url(https://mfdm.se/woo/wp-content/uploads/pumpa2_blur-600x579.jpg);",
      }
    },
  },
  plugins: [
    require('tailwindcss-opentype'),
    function ({ addComponents, theme }) {
      addComponents({
        '.square': {
          backgroundImage: "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Aserif%3D%22http%3A%2F%2Fwww.serif.com%2F%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2080%2020%22%20version%3D%221.1%22%20xml%3Aspace%3D%22preserve%22%20style%3D%22fill-rule%3Aevenodd%3Bclip-rule%3Aevenodd%3Bstroke-linejoin%3Around%3Bstroke-miterlimit%3A2%3B%22%3E%3Crect%20x%3D%22-0%22%20y%3D%22-0.055%22%20width%3D%2280%22%20height%3D%2220%22%20style%3D%22fill%3A%23ea6c06%3B%22%2F%3E%3C%2Fsvg%3E');",
          backgroundSize: "100px 20px;",
          backgroundRepeat: "repeat-x;",
        },
        '.border-rounded': {
          borderRadius: "20px",
          border: "6px solid #ea6c06",

        }
      })
    }
  ],
}

