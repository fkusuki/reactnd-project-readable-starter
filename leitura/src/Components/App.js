import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose,bindActionCreators } from 'redux';
import { setPosts } from '../Actions';
import * as LeituraAPI from '../Utils/api'
import LeituraAppBar from './LeituraAppBar'
import ListPosts from './ListPosts'
import '../App.css';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
 root: {
    flexGrow: 1,
    marginTop:theme.spacing.unit * 4,
  },
  paper: {
    padding: theme.spacing.unit * 2,

    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  state = {
  	categories:[],
  	posts:[],
  }

  async componentDidMount() {
    const posts = await LeituraAPI.getAllPosts()
    const categories = await LeituraAPI.getAllCategories()
    
    this.setState({ posts, categories })
  }

   render() {
  	const { classes, setPosts} = this.props;
    
    const { posts } = this.state;
    
    setPosts(posts);
    return (
      <div className="App">
       <LeituraAppBar />
       <div className={classes.root}>
        <Grid container spacing={24} >
         <Grid item xs={4} >
         </Grid>
          <Grid item xs={4} >
              <ListPosts />
           </Grid>
        </Grid>
       </div>
      </div>
    );
  }
}
const mapStateToProps = store => ({
  posts: store.posts,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setPosts }, dispatch);
export default compose(
  withStyles(styles, {
    name: 'App',
  }),
  connect(mapStateToProps,mapDispatchToProps),
)(App);

