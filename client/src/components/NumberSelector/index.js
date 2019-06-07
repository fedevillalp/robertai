import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 150,
  },
});



const ranges = [
  {
    value: 5,
    label: 'Top 4', //correction factor becasue algo thinks  " " is a word
  },
  {
    value: 6,
    label: 'Top 5',
  },
  {
    value: 7,
    label: 'Top 6',
  },
  {
    value: 8,
    label: 'Top 7',
  },
  {
    value: 9,
    label: 'Top 8',
  },
  
];

class NumberSelector extends React.Component {
  state = {
    topWords: ''
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    this.props.updateTopWords(event.target.value);
  };

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        

        <TextField
          select
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Select words to plot"
          value={this.state.topWords}
          onChange={this.handleChange('topWords')}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
    );
  }
}

NumberSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NumberSelector);
