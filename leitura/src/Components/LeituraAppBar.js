import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

function LeituraAppBar(props) {
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Projeto Leitura
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  
  );
}

LeituraAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeituraAppBar);