import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const common = {
    typography: {
        useNextVariants: true,
        h1: {
            fontWeight: 600,
            fontSize: '4rem'
        },
        h2: {
            fontWeight: 600,
            fontSize: '3.5rem'
        },
        h3: {
            fontWeight: 600,
            fontSize: '3rem'
        },
        h4: {
            fontWeight: 600,
            fontSize: '2.5rem'
        },
        h5: {
            fontWeight: 600,
            fontSize: '2rem'
        }
    }
};

const darkTheme = createMuiTheme({
    ...common,
    palette: {
        type: 'dark',
        primary: {
            main: "rgba(43, 130, 178, 0.87)"
            //main: "rgba(46, 181, 255, 0.87)"
        },
        error: {
            main: "#ff5d5d",
            dark: "#ff6459"
        }
    }
});

const lightTheme = createMuiTheme({
    ...common,
    palette: {
        type: 'light',
        primary: {
            main: "rgba(43, 130, 178, 0.87)"
        },
        text: {
            primary: "rgba(0,0,0,0.7)"
        },
        background: {
            default: "#ddd"
        }
    }
});

const THEME = Object.freeze({
    LIGHT: "LIGHT",
    DARK: "DARK"
});


function applyTheme(WrappedComponent) {

    function ApplyTheme(props) {

        return (
            <MuiThemeProvider theme={ darkTheme }>
                <CssBaseline />

                <WrappedComponent {...props} />

            </MuiThemeProvider>
        );

    }
    return ApplyTheme;
}

export default applyTheme;
