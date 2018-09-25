import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose,bindActionCreators } from 'redux';
import { updatePost } from '../Actions';
import '../App.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment'
import Badge from '@material-ui/core/Badge';
import * as LeituraAPI from '../Utils/api';
import sortBy from 'sort-by'; 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import FavoriteIcon from '@material-ui/icons/Favorite';
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
	align: 'right',
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
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {
	margin: theme.spacing.unit * 2,
  },
});

const ITEM_HEIGHT = 48;

class ListPosts extends Component {
   state = {
	anchorEl:null,
   }
   
   votePost = async (id, tipo) => {
    const novoPost = await LeituraAPI.votePost(id,tipo);
    
    const { updatePost } = this.props;
    
    updatePost(novoPost);
  }
  
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (opcao) => {
    this.setState({ anchorEl: null });
    
    
  };
  render() {
  	const { classes, posts, ordem } = this.props;
	 const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const showingPosts = ordem === 'Ordenar por data'
          ? posts.sort(sortBy('timestamp'))
        : posts.sort(sortBy('-voteScore'));
      return (
      
      showingPosts.map((post)=> (
       <Card key={post.id} className={classes.card}>
	    <CardHeader
          action={
            <IconButton
              aria-label="More"
              aria-owns={open ? 'post-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              >
            <MoreVertIcon />
           </IconButton>
          }
		  title={post.title}
          subheader={"por " + post.author}
        >
		</CardHeader>
        <CardContent>
		<Menu
		  id="post-menu"
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
			<MenuItem className={classes.menuItem}>
				<ListItemIcon className={classes.icon}>
					<EditIcon />
				</ListItemIcon>
				<ListItemText classes={{ primary: classes.primary }} inset primary="Editar Post" />
			</MenuItem>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Deletar Post" />
      </MenuItem>

        </Menu>
          <Typography className={classes.corpo}>
            {post.body}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton className={classes.icon} aria-label="Dislike" onClick={() => this.votePost(post.id,'downVote')}>
            <ThumbDownIcon/>
          </IconButton>
          <IconButton className={classes.icon} aria-label="Like" onClick={() => this.votePost(post.id,'upVote')} >
            	<ThumbUpIcon />
          </IconButton>
          <IconButton className={classes.icon} aria-label="Comment">
            <Badge badgeContent={post.commentCount} color="primary" classes={{badge: classes.badge}}>
              <CommentIcon/>
            </Badge>
          </IconButton>
		  <IconButton className={classes.icon} aria-label="Score">
            <Badge badgeContent={post.voteScore} color="primary" classes={{badge: classes.badge}}>
              <FavoriteIcon/>
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
  ordem: store.setOrderList.ordem,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updatePost }, dispatch);
export default compose(
  withStyles(styles, {
    name: 'ListPosts',
  }),
  connect(mapStateToProps,mapDispatchToProps),
)(ListPosts);

