import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    deleted: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  toggleFavesDelete = fave => {
    this.props.toggleAddRemoveFavorites(fave);
    this.setState({ deleted: true });
  }

  renderFavorites = (favorites) => {
    const { deleted } = this.state;
    if (Object.keys(favorites).length < 1) {
      return (
        <p className="default-empty-songs">None yet, start favoriting something!</p>
      )
    } else {
        return Object.keys(favorites).map((fave,i)=> {
          return (
            //<Collapse in={deleted}>
              <li key={fave + "-" + Date.now()}>
                {fave}
                <span className="delete"
                      onClick={ ()=> this.toggleFavesDelete(fave)}>
                      <i className="fas fa-times"></i>
                </span>
              </li>
            //</Collapse>
          );
        })
    }
  }

  renderRecentlyPlayed = (recentlyPlayed) => {
    if (Object.keys(recentlyPlayed).length < 1) {
      return (
        <p className="default-empty-songs">None yet, start playing something!</p>
      )
    } else {
        return Object.keys(recentlyPlayed).map((recent,i)=> {
          return (
            <li key={recent + "-" + Date.now()}>
              {recent}
              <span className="delete"
                    onClick={ ()=> this.props.toggleAddRemoveRecentlyPlayed(recent)}>
                    <i className="fas fa-times"></i>
              </span>
            </li>
          );
        })
    }
  }

  render() {
    const { favorites, recentlyPlayed, deleteAllFaves, deleteAllRecents } = this.props;

    const sideList = (
      <div className="drawer-wrapper">
        <h4 onDoubleClick={()=> { deleteAllFaves() }}>
          <i className="fas fa-star"></i>
          Favorites
        </h4>
        <ol>
          { this.renderFavorites(favorites) }
        </ol>
        <h4 onDoubleClick={()=> { deleteAllRecents() }}>
          <i className="fa fa-play"></i>
          Recently Played
        </h4>
        <ol>
          { this.renderRecentlyPlayed(recentlyPlayed) }
        </ol>
      </div>

    );

    const modalProps = {
      BackdropProps: {
        classes: {
          root: "drawer-backdrop-override"
        }
      }
    }

    return (
      <div>
        <div className="star-button">
          <Button className="open-drawer" onClick={this.toggleDrawer('left', true)}>
            <i className="fas fa-star"></i>
          </Button>
        </div>

        <Drawer open={this.state.left} classes={ { "paper": "drawer-override" } } onClose={this.toggleDrawer('left', false)} ModalProps={ modalProps }>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', true)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
