import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose,bindActionCreators } from 'redux';
import { setPosts, updatePost } from '../Actions';
import * as LeituraAPI from '../Utils/api'
import LeituraAppBar from './LeituraAppBar'
import ListPosts from './ListPosts'
import '../App.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Route, Redirect } from 'react-router-dom'

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
const options = [
  'Novo Post',
  'Ordenar por data',
  'Ordenar por pontuação',
];

const ITEM_HEIGHT = 48;

class App extends Component {
  state = {
  	categories:[],
  	posts:[],
    anchorEl:null,
    opcao:null,
    }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (opcao) => {
    this.setState({ anchorEl: null, opcao });
    
  };
  renderRedirect = () => {
    if (this.state.opcao === 'Novo Post') {
      return <Redirect to='/target' />
    }
  };
  async componentDidMount() {
    const posts = await LeituraAPI.getAllPosts()
    //const categories = await LeituraAPI.getAllCategories()
    const { setPosts } = this.props;
    setPosts(posts);
  }

   render() {
  	const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className="App">
      {this.renderRedirect()}
       <LeituraAppBar />
       <div className={classes.root}>
        <Grid container spacing={24} >
         <Grid item xs={4} >
          {JSON.stringify(this.state.opcao)}
         </Grid>
         <Route exact path='/' render={()=>(
          <Grid item xs={4} >
              <ListPosts  />
          </Grid>
          )} />
          <Grid item xs={4}>
            <IconButton
              aria-label="More"
              aria-owns={open ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              >
            <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              {options.map(option => (
                <MenuItem key={option} selected={option === 'Novo Post'} onClick={(event) => this.handleClose(option, event)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>

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
  bindActionCreators({ setPosts, updatePost }, dispatch);
export default compose(
  withStyles(styles, {
    name: 'App',
  }),
  connect(mapStateToProps,mapDispatchToProps),
)(App);

