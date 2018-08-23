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


  stopChildClickPropagation = (e) => {
    e.stopPropagation();
  }

  renderFavorites = (favorites) => {
    console.log("renderFavorites: " + favorites);
    return Object.keys(favorites).map((fave,i)=> {
      return (
        <li key={fave + "-" + Date.now()}>
          {fave}
          <span style={{color: "silver"}} onClick={ ()=> this.props.toggleAddRemoveFavorites(fave)}>(x)</span>
        </li>
      );
    })
  }

  render() {
    const { classes, favorites } = this.props;

    const sideList = (
      <div className="drawer-wrapper">
        <h4>Favorites</h4>
        <ol>
          { this.renderFavorites(favorites) }
        </ol>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer('left', true)}>Favorites</Button>

        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
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
