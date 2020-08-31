import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { config } from '../utils/config'

/* Material-UI Core */
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
// import Drawer from '@material-ui/core/Drawer'
// import List from '@material-ui/core/List'

/* Material-UI Icon */
import MenuIcon from '@material-ui/icons/Menu'


import LayoutStyle from '../styles/components/Layout.module.scss'

type Props = {
  children?: ReactNode
  title?: string
}

const drawerToggle = () => {
  
}

const Layout = ({ children, title = config.WEB_NAME }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className={LayoutStyle.headerContainer}>
      <AppBar position="fixed">
        <Toolbar>
          <div className={LayoutStyle.headerSubtitleDrawerBtn}>
            <IconButton edge="start" onClick={ drawerToggle } color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
          </div>
          <Link href="/">
            <div className={LayoutStyle.headerAppLogoContainer}>
              {/* <div className={LayoutStyle.imgContainer}>
                <img src="/assets/images/logo_web.png" alt="Web logo" />
              </div> */}
              <span className={LayoutStyle.text}>{ config.WEB_NAME }</span>
            </div>
          </Link>
        </Toolbar>
        
      </AppBar>
    </div>
    
    {children}
    {/* <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer> */}
  </div>
)

export default Layout

/* <nav>
    <Link href="/">
      <a>Home</a>
    </Link>{' '}
    |{' '}
    <Link href="/about">
      <a>About</a>
    </Link>{' '}
    |{' '}
    <Link href="/users">
      <a>Users List</a>
    </Link>{' '}
    | <a href="/api/users">Users API</a>
  </nav> */