import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose,bindActionCreators } from 'redux';
import { updatePost } from '../Actions';
import '../App.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment'
import Badge from '@material-ui/core/Badge';
import * as LeituraAPI from '../Utils/api'
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
   
   votePost = async (id, tipo) => {
        
    const novoPost = await LeituraAPI.votePost(id,tipo);
    
    const { updatePost } = this.props;
    
    updatePost(novoPost);

    
  }
  render() {
  	const { classes, posts } = this.props;
    
      return (
      
      posts.map((post)=> (
       <Card key={post.id} className={classes.card}>
        <CardContent>
          <Badge badgeContent={post.voteScore} color="primary" classes={{ badge: classes.badge }}>
            <Typography className={classes.title}>
              {post.title}
            </Typography>
          </Badge>
          <Typography className={classes.autor}>
            por {post.author}
          </Typography>
          <Typography className={classes.corpo}>
            {post.body}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Dislike" onClick={() => this.votePost(post.id,'downVote')}>
            <ThumbDownIcon/>
          </IconButton>
          <IconButton aria-label="Like" onClick={() => this.votePost(post.id,'upVote')} >
            	<ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="Comment">
            <Badge badgeContent={post.commentCount} color="primary" classes={{badge: classes.badge}}>
              <CommentIcon/>
            </Badge>
          </IconButton>
        </CardActions>
      </Card>
      ))
    
    );
  }
}
const mapStateToProps = store => ({
  posts: store.updatePost.posts,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updatePost }, dispatch);
export default compose(
  withStyles(styles, {
    name: 'ListPosts',
  }),
  connect(mapStateToProps,mapDispatchToProps),
)(ListPosts);

