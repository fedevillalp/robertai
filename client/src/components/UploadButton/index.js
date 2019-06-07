import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  root: {
    background: '#3F51B5',
    borderRadius: 10,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 20px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function IconLabelButtons(props) {
  const { classes } = props;
  return (
    <div>
      
      <Button classes={{root: classes.root}} onClick={props.uploadFile} variant="contained" color="default" className={classes.button}>
        Upload & Transcribe
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
      
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);


