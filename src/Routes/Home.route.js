import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';

const styles = theme => ({
    header: {
        fontSize: '1.4em',
        display: 'inline'
    },
    text: {
        '& > p': {
            margin: '8px 0'
        },
        '& > p:first-child, & > p:last-child': {
            margin: '0'
        }
    },
    card: {
        maxWidth: 600,
        width: '100%'
    }
});

function Home({ classes, className }) {
    return (
        <Grid container direction="column" alignItems="center" spacing={16}>
            <Grid item>
                <Typography variant="h3" align="center">Home</Typography>
            </Grid>
            <Grid item className={classNames(className, classes.card)}>
                <Card raised>
                    <CardContent className={classes.text}>
                        <Typography>This project provides a full stack solution to user authentication, authorization, and access control.</Typography>

                        <Typography><Typography className={classes.header} component="span">Socket.IO: </Typography>
                        provides synchronization of application state between multiple instances.</Typography>

                        <Typography><Typography className={classes.header} component="span">Authentication: </Typography>Provides local account
                        creation, and login through Google and Facebook OAuth APIs. Provides email verification, account management, and password reset.</Typography>

                        <Typography><Typography className={classes.header} component="span">Access Control: </Typography>
                        is provided at a per-route and a per-component level. Access control rules are provided by the back-end during app initialization.</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(styles)
)(Home);