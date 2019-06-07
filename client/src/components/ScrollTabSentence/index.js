import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SimpleTable from './SimpleTable';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});


let sentence_test= [ { word: 0, sentence: 'zero zero zero'},
    { word: 'Speaker', sentence: 'THIS IS THE SPEAKER' },
    { word: 'Speaker', sentence: 'THIS IS THE SPEAKER ONE' },
    { word: 'is', sentence: ' is car is car this sentence one' },
    { word: 'car', sentence: ' is car is car' },
    { word: 'is', sentence: ' is iguana' } ]

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };


  render() {
    let top_words_sorted = null;
    {top_words_sorted = (this.props.top_words_sorted || ["one", "two", "three"])};

    const { classes } = this.props;
    const { value } = this.state;
    console.log('**** top_words_sorted: ', this.props.top_words_sorted);
    
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {top_words_sorted.slice(0,9).map(label => (
            <Tab key={label} value={label} label={label} />
            ))}
            
          </Tabs>
        </AppBar>
        
        {value === top_words_sorted[0] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[0]}/> </TabContainer>}
        {value === top_words_sorted[1] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[1]}/> </TabContainer>}
        {value === top_words_sorted[2] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[2]}/> </TabContainer>}
        {value === top_words_sorted[3] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[3]}/> </TabContainer>}
        {value === top_words_sorted[4] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[4]}/> </TabContainer>}
        {value === top_words_sorted[5] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[5]}/> </TabContainer>}
        {value === top_words_sorted[6] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[6]}/> </TabContainer>}
        {value === top_words_sorted[7] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[7]}/> </TabContainer>}
        {value === top_words_sorted[8] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[8]}/> </TabContainer>}
        {value === top_words_sorted[9] && <TabContainer> <SimpleTable found_sentences={this.props.found_sentences} word={top_words_sorted[9]}/> </TabContainer>}

      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);


    