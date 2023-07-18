/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      428: '428px',
      16: '4rem'
    },

    extend: {
      margin: {
        2: '2rem',
        1: '1rem',
        2.5: '2.5rem',
        1.5: '1.5rem',
        1.25: '1.25rem',
        4.4: '4.4rem',
        3.3: '3.3rem',
        3: '3rem',
        7.4: '7.4rem',
        9: '9rem',
        0.5: '0.5rem',
        5: '5rem',
        6: '6rem',
        6.5: '6.5rem',
        13.6: '13.6rem',
        17: '17rem',
        21: '21rem',
        26: '26rem',
        95: '95%',
        90: '90%'
      },
      height: {
        1.3: '1.3rem',
        48: '48rem',
        12: '12rem',
        2: '2rem',
        1.5: '1.5rem',
        3: '3rem',
        3.25: '3.25rem',
        3.6: '3.6rem',
        2.7: '2.7',
        2.3: '2.4rem',
        2.6: '2.6rem',
        53: '53rem',
        57: '57rem',
        31: '31rem',
        32: '32rem',
        44: '44rem',
        23.4: '23.4rem',
        45: '45rem',
        33: '33rem',
        10: '10rem',
        35: '35rem',
        3.3: '3.3rem',
        4: '4rem',

        5: '5rem',
        25: '25rem',
        41: '41rem',
        9.6: '9.6rem',
        19: '19rem',
        15: '15rem',
        0.05: '0.05rem',
        18: '18rem',
        27: '27rem',
        8.75: '8.75rem',
        8.3: '8.3rem',
        7.3: '7.3rem',
        14: '14rem'
      },
      borderRadius: {},
      textColor: {
        caramel: '#DDCCAA',
        blue: ' #0D6EFD'
      },
      borderWidth: {
        0.1: '0.1rem'
      },
      width: {
        1.3: '1.3rem',
        1.5: '1.5rem',
        2: '2rem',
        3: '3rem',
        3.25: '3.25rem',
        3.6: '3.6rem',
        43: '43rem',
        10: '9rem',
        12: '12rem',
        8.3: '8.3rem',
        9.7: '9.6rem',
        6.8: '6.8rem',
        5.5: '5.5rem',
        14: '14rem',
        6: '6rem',
        7: '7rem',
        8: '8rem',
        54: '54rem',
        50: '50rem',
        48: '48rem',
        22: '22rem',
        20: '20rem',
        17.5: '17.5rem',
        15.6: '15.6rem',
        37.5: '37.5rem',
        33.6: '33.6rem',
        25: '25rem',
        30: '30rem',
        35: '35rem',
        27: '26rem',
        27.5: '27.5rem',
        45: '45rem',
        95: '95rem',
        88: '88rem',
        56: '56rem',
        18: '18rem',
        58: '58rem',
        60: '60rem',
        62: '62rem',
        4: '4rem'
      },
      padding: {
        13: '13rem',
        10: '10rem'
      },
      fontSize: {
        2: '2rem',
        1.5: '1.5rem',
        1.25: '1.25rem',
        1: '1rem',
        3: '3rem',
        4: '4rem'
      },

      colors: {
        'dark-gray': '#6C757D',
        shadow: '0px 0px 0px 4px rgba(13, 110, 253, 0.25);',
        whiteGray: '#CED4DA',
        '#24222F': '#24222F'
      },
      gap: {
        3: '3rem'
      },

      backgroundColor: {
        '#24222F': '#24222F',
        lightRed: '#E33812',
        purple: 'rgba(151, 71, 255, 0.4)',
        red: '#E31221',
        gray: '#222030',
        'light-gray': '#CED4DA',
        blur: 'rgba(0, 0, 0, 0.5)',
        darkgray: '#11101A',
        gradient: 'linear-gradient(187.16deg, #181623 0.7%, #191725 51.65%, #0D0B14 98.75%)',
        modalgradient:
          'linear-gradient(112.94deg, rgba(239, 239, 239, 0.4) -1.81%, rgba(239, 239, 239, 0.00514528) 102.5%, rgba(1, 1, 1, 0.00260417) 102.51%, rgba(239, 239, 239, 0.05) 102.52%);',
        lightBlack: '#181623',
        lgBlack: 'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);'
      },
      backgroundImage: {
        gray: '#222030',
        modalgradient:
          'linear-gradient(112.94deg, rgba(239, 239, 239, 0.4) -1.81%, rgba(239, 239, 239, 0.006) 102.5%, rgba(1, 1, 1, 0.00460417) 102.51%, rgba(239, 239, 239, 0.08) 102.52%);',
        landingPage: 'linear-gradient(180deg, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0.9) 100%)',
        landingPage1: "url('@/assets/images/landingPage-1.png')",
        landingPage2: "url('@/assets/images/landingPage-2.png')",
        landingPage3: "url('@/assets/images/landingPage-3.png')"
      },

      inset: {
        0.8: '0.8rem',
        2.5: '2.5rem',
        3: '2rem',
        7: '7rem',
        8: '8rem',
        9: '9rem',
        10: '10rem',
        12: '12rem',
        3.3: '3.3rem',
        75: '75rem',
        22: '22rem',
        4: '4rem',
        4.4: '4.4rem',
        14: '15rem',
        18: '18.2rem',
        38: '38rem',
        6.25: '6.25rem'
      }
    }
  },
  plugins: []
}
