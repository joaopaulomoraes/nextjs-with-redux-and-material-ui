import React from 'react'
import App  from 'next/app'
import Head from 'next/head'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import wrapper from '../src/store'
import theme from '../src/utils/theme'

class _App extends App {
  static async getInitialProps ({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        pathname: ctx.pathname,
      }
    }
  }

  componentDidMount () {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    const {
      Component,
      pageProps,
    } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <title>NextJS - With Redux and Material UI</title>
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    )
  }
}

export default wrapper.withRedux(_App)
