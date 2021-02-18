import {createMuiTheme} from '@material-ui/core/styles/';
 
  const theme = createMuiTheme({
   
    palette: {
      primary: {
        light: '#3864aa',
        main: '#E92030',
        dark: '#192b47',
        contrastText: '#fff',
      },
      secondary: {
        light: '#65cdfd',
        main: '#BD1F58',
        dark: '#0280bb',
        contrastText: '#000',
      },
      common: {
        black: '#121212',
        white: '#efefef'
      },
      type: "light"
    },
    background: {
      paper: '#424242',
      default: '#303030'
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
      divider: 'rgba(255, 255, 255, 0.12)'
    },
    typography: {
      htmlFontSize: 15,
      fontSize: 13,
      fontWeightMedium: '400',
      fontFamily: [
        'Poppins',
        'sans-serif',
      ].join(','),
    
    },
 
   
  });

//   theme.typography.h4 = {
//     fontSize: '1.2rem',
//     '@media (min-width:600px)': {
//       fontSize: '1.6rem',
//     },
//     [theme.breakpoints.up('md')]: {
//       fontSize: '2.4rem',
//     },
//   }

//   theme.typography.body1 = {
//     fontSize: '1rem',
//     '@media (min-width:600px)': {
//       fontSize: '1.122rem',
//     },
//     [theme.breakpoints.up('md')]: {
//       fontSize: '1.142rem',
//     },
//   }


export default theme;