import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const darkTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        h1: {
            fontWeight: 500,
            fontSize: '5rem'
        },
        h2: {
            fontWeight: 500,
            fontSize: '4rem'
        },
        h3: {
            fontWeight: 500,
            fontSize: '3.5rem'
        }
    },
    palette: {
        type: 'dark',
        primary: {
            main: "rgb(36, 126, 176)"
        },
        error: {
            main: "#ff5d5d",
            dark: "#ff6459"
        }
    }
});


function applyTheme(WrappedComponent) {

    function ApplyTheme(props) {
        return (
            <MuiThemeProvider theme={darkTheme}>
                <CssBaseline />
                <WrappedComponent {...props} />
            </MuiThemeProvider>
        );
    }
    return ApplyTheme;
}

export default applyTheme;