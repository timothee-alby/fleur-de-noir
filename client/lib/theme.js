import { createMuiTheme } from '@material-ui/core/styles'

const colours = {
  // primary
  myrtieGreen: '#397367',
  brunswickGreen: '#2e6054',
  hokersGreen: '#43786d',
  winterdreamGreen: '#53877d',

  // secondary
  sunray: '#DDA448',
  maximumYellowRed: '#E7BC5F',

  // ternary
  mauveTaupe: '#74444b',

  // header
  cBlue: '#2D728F',
  tealBlue: '#3D809A',

  // misc
  maximumBlueGreen: '#5ABCB9',
  powderBlue: '#ACE3E9',

  darkSpace: '#273554',

  // spaceship
  spaceshipRed: '#FE4C25',
  spaceshipRedShade: '#E5391C',
  spaceshipBlue: '#A5EAFC',
  spaceshipBlueShade: '#A5EAFC'
}

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: { main: colours.myrtieGreen },
    secondary: { main: colours.sunray },
    ternary: {
      main: colours.mauveTaupe,
      contrastText: '#fff',
      dark: 'rgb(81, 47, 52)',
      light: 'rgb(143, 105, 111)'
    },
    darkSpace: { main: colours.darkSpace },
    background: {
      default: colours.darkSpace,
      header: { main: colours.cBlue, gradient: colours.tealBlue },
      action: {
        main: colours.myrtieGreen,
        gradient: colours.brunswickGreen,
        hover: {
          main: colours.winterdreamGreen,
          gradient: colours.hokersGreen
        }
      }
    },
    card: {
      red: 'darkred',
      black: 'black',
      unknown: colours.mauveTaupe
    },
    spaceship: {
      red: colours.spaceshipRed,
      redShade: colours.spaceshipRedShade,
      blue: colours.spaceshipBlue,
      blueShade: colours.spaceshipBlueShade
    }
  }
})

export default theme
