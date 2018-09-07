import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

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
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  renderFavorites = (favorites) => {
    if (Object.keys(favorites).length < 1) {
      return (
        <p>None yet, start favoriting something!</p>
      )
    } else {
        return Object.keys(favorites).map((fave,i)=> {
          return (
            <li key={fave + "-" + Date.now()}>
              {fave}
              <span className="delete"
                    onClick={ ()=> this.props.toggleAddRemoveFavorites(fave)}>
                    <i className="fas fa-times"></i>
              </span>
            </li>
          );
        })
    }
  }

  renderRecentlyPlayed = (recentlyPlayed) => {
    if (Object.keys(recentlyPlayed).length < 1) {
      return (
        <p>None yet, start playing something!</p>
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
    const { classes, favorites, recentlyPlayed } = this.props;

    const sideList = (
      <div className="drawer-wrapper">
        <h4>
          <i className="fas fa-star"></i>
          Favorites
        </h4>
        <ol>
          { this.renderFavorites(favorites) }
        </ol>
        <h4>Recently Played</h4>
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
        <Button className="open-drawer" onClick={this.toggleDrawer('left', true)}>
          <i className="fas fa-star"></i>
        </Button>

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
