import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
});


function SimpleTable(props) {
  const { classes , found_sentences , word} = props;

  
  /// input data and word and returs array with the sentences connected to that word
function create_table_data(data, word_required){

  let sentences = [];
  const result = data.filter(word => word.word == word_required);

  for(let i=0;i<result.length;i++){
    sentences.push(result[i].sentence)
  }

  return sentences
}


let sentences_in_table = create_table_data(found_sentences,word); 

console.log("SENTENCES IN TABLE", sentences_in_table);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        
        <TableBody>
          {sentences_in_table.map(row => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {row} 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);


// {rows.map(row => (
//   <TableRow key={row.id}>
//     <TableCell component="th" scope="row">
//       {row.name} 
//     </TableCell>
//   </TableRow>
// ))}