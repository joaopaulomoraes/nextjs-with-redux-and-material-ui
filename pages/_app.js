import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import rtl from 'jss-rtl'
import store from '../src/store'
import getPageContext from '../src/utils/getPageContext'

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
})

const _App = withRedux(store)(
  class _App extends App {
    pageContext = getPageContext()

    static async getInitialProps ({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
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
        store
      } = this.props

      return (
        <Container>
          <Head>
            <title>NextJS - With Redux and Material UI</title>
          </Head>
          <StylesProvider jss={jss}>
            <ThemeProvider
              theme={this.pageContext.theme}
            >
              <CssBaseline />
              <Provider store={store}>
                <Component
                  pageContext={this.pageContext}
                  {...pageProps}
                />
              </Provider>
            </ThemeProvider>
          </StylesProvider>
        </Container>
      )
    }
  }
)

export default _App
