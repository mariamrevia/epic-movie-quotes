/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '428': '428px',
      '16': '4rem',
    },

    extend: {
      margin: {
        2:'2rem',
        1.5:'1.5rem',
        4.4:'4.4rem',
        3.3:'3.3rem',
        7.4:'7.4rem',
        0.5:'0.5rem'
        
      
      },
      height: {
        3:'3rem',
        2.3:'2.3rem',
        53:'53rem',
        31:'31rem',
        44:'44rem',
        23.4:'23.4rem',
        33:'33rem'

      },
      borderRadius: {
        
      },
      textColor: {
        caramel: '#DDCCAA'
      },
      width: {
        43: '43rem',
        8.3: '8.3rem',
        6.8:'6.8rem',
        5.5:"5.5rem",
        50:'50rem',
        22:'22rem',
        17.5:'17.5rem',
        15.6:'15.6rem',
        37.5:'37.5rem'
      },
      fontSize: {
       2:'2rem',
       1.25: '1.25rem',
       1:'1rem'
      },
      colors:{
        'dark-gray':'#6C757D'
      },
     
      backgroundColor: {
        red: '#E31221',
        gray:'#222030',
        'light-gray':'#CED4DA',
        blur:'rgba(0, 0, 0, 0.5)'
        
      },
      backgroundImage: {
        landingPage: 'linear-gradient(180deg, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0.9) 100%)',
        landingPage1: "url('@/assets/images/landingPage-1.png')",
        landingPage2: "url('@/assets/images/landingPage-2.png')",
        landingPage3: "url('@/assets/images/landingPage-3.png')"
      },
      inset: {
      
      },
      padding: {
        
      }
    },
  },
  plugins: [],
}