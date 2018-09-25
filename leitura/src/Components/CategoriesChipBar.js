import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose,bindActionCreators } from 'redux';
import { setCategories } from '../Actions';
import '../App.css';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
 chipRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class CategoriesChipBar extends Component {
handleDelete(){

}
	render() {
		const { classes, categories } = this.props;

		return(
			<div className={classes.chipRoot}>
      			{categories.map((cat, index) => (
       			<Chip
   					avatar={
          				<Avatar>
            				<DoneIcon />
          				</Avatar>
       	 			}
       				key={index} 
       				label={cat.name}
       				clickable 
       				className={classes.chip}
					
       				 /> 
      			))}
      			 
      		</div>
		);
	}
}
const mapStateToProps = store => ({
  categories: store.setCategories.categories,
  
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setCategories }, dispatch);
export default compose(
  withStyles(styles, {
    name: 'CategoriesChipBar',
  }),
  connect(mapStateToProps,mapDispatchToProps),
)(CategoriesChipBar);
