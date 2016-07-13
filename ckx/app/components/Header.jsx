import React from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'

const Header = ( { title } ) => <h4 style={style}>{title}</h4>

const style = {color: 'green'}

export default connect(e => ({title: e.ui.notice}))(Header)
