import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#009aca'
        },
        secondary: {
            main: '#fe6508'
        },
        tertiary: {
            main: '#1ec326'
        },
        text: {
            primary: {
                main: '#505050'
            },
            secondary: {
                main: '#fff'
            },
        },
        grey: '#999999'
    },
    typography: {
        fontFamily: 'Roboto, Open Sans',
        h1: {
            fontSize: '96',
            fontWeight: 600,
            lineHeight: 112.032,
            fontFamily: 'Open Sans'
        },

        h2: {
            fontSize: '60',
            fontWeight: 600,
            lineHeight: 72,
            fontFamily: 'Open Sans'
        },

        h3: {
            fontSize: '48',
            fontWeight: 600,
            lineHeight: 56.016,
            fontFamily: 'Open Sans'
        },

        h4: {
            fontSize: '34',
            fontWeight: 600,
            lineHeight: 41.99,
            fontFamily: 'Open Sans'
        },

        h5: {
            fontSize: '24',
            fontWeight: 400,
            lineHeight: 32.016,
            fontFamily: 'Open Sans'
        },

        h6: {
            fontSize: '20',
            fontWeight: 500,
            lineHeight: 32,
            fontFamily: 'Roboto'
        },

        caption: {
            fontSize: '12',
            fontWeight: 400,
            lineHeight: 19.92,
            fontFamily: 'Roboto'
        },

        overline: {
            fontSize: '12',
            fontWeight: 400,
            lineHeight: 31.92,
            fontFamily: 'Roboto'

        },

        subtitle2: {
            fontSize: '14',
            fontWeight: 400,
            lineHeight: 21.98,
            fontFamily: 'Open Sans'
        },

        subtitle1: {
            fontSize: '16',
            fontWeight: 400,
            lineHeight: 28,
            fontFamily: 'Open Sans'
        },

        body2: {
            fontSize: '14',
            fontWeight: 400,
            lineHeight: 20.02,
            fontFamily: 'Open Sans'
        },

        body1: {
            fontSize: '16',
            fontWeight: 400,
            lineHeight: 24,
            fontFamily: 'Open Sans'
        }
    }
});

export default theme;
