import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';

const styles = theme => ({
    card: {

    }
});

function Home({ className, classes }) {
    return (
        <Grid container justify="space-between" alignItems="center" direction="column" spacing={8}>
            <Grid item>
                <Typography variant="h1" gutterBottom align="center">Home</Typography>
            </Grid>

            <Grid item className={classNames(className, classes.card)}>
                <Card raised>
                    <CardContent>
                        <Typography>The home page!</Typography>
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