import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose,bindActionCreators } from 'redux';
import { setPosts } from '../Actions';
import '../App.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  card: {
     border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[900]
    }`,
  },
  badge: {
    top: 1,
    right: -30,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[900]
    }`,
  },
  
  actions: {
    display: 'flex',
  },
 title: {
    marginBottom: 16,
    fontWeight: 'bolder',
    fontSize: 20,
  }, 
  autor: {
    marginBottom: 16,
    fontSize: 18,
  }, 
  corpo: {
    marginBottom: 16,
    fontSize: 14,
  }, 
});

class ListPosts extends Component {
  
  render() {
  	const { classes, posts } = this.props;
   
    //const { posts } = this.state;
    console.log(posts);
    return (
      
      posts.map((post)=> (
       <Card key={post.id} className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>
            {post.title}
          </Typography>
          <Typography className={classes.autor}>
            por {post.author}
          </Typography>
          <Typography className={classes.corpo}>
            {post.body}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          
          <IconButton aria-label="Like">
            <Badge badgeContent={post.voteScore} color="primary" classes={{ badge: classes.badge }}>
            	<ThumbUpIcon />
            </Badge>
          </IconButton>
        </CardActions>
      </Card>
      ))
    
    );
  }
}
const mapStateToProps = store => ({
  posts: store.setPosts.posts,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setPosts }, dispatch);
export default compose(
  withStyles(styles, {
    name: 'ListPosts',
  }),
  connect(mapStateToProps,mapDispatchToProps),
)(ListPosts);

