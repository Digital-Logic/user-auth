import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withAuth } from '../Auth';

function Profile({ className }) {
    return (
        <Grid container direction="column" alignItems="center" spacing={16}>
            <Grid item>
                <Typography variant="h3" align="center">Profile</Typography>
            </Grid>
            <Grid item className={className}>
                <Card raised>
                    <CardContent>
                        <Typography>Profile</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default withAuth()(Profile);
