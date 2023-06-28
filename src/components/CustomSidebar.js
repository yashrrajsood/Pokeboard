import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import '../components/css/customSidebar.css'

class CustomSidebar extends Component {
  render() {
    return (
      <div style={{display:"flex", height: 1000 ,top: 0, position: "sticky", position: '-webkit-sticky', color: 'white'}}>
        <Sidebar backgroundColor='#3b3b48' width='300px'>
          <img src="../img/main-logo.png" alt='pokemon logo' style={{width: '250px', marginTop: 20, marginBottom: 20}}></img>
          <Menu>
            <MenuItem icon={<img src='../img/icons8-dashboard_layout.png' style={{height: 20, width: 20}}/>}>
              <Link to="/">Dashboard</Link>
            </MenuItem>
            <MenuItem icon={<img src='../img/icons8-pokemon.png' style={{height: 20, width: 20}}/>}>
              <Link to="/random-pokemon">Pokémon VS Pokémon</Link>
            </MenuItem>
          </Menu>
          <div style={{position: 'absolute', bottom: 30, textAlign: 'center', marginLeft: '17%'}}>
            <img src='../img/icons8-snorlax.png' style={{height: 30, width: 30}}/>
            <p>Made by <u><a href='https://github.com/yashrrajsood'>Yash Rraj Sood</a></u></p>
          </div>
        </Sidebar>
      </div>
    );
  }
}

export default CustomSidebar;
