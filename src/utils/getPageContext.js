import { SheetsRegistry } from 'jss'
import { createGenerateClassName } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

const createPageContext = () => {
  return {
    theme,
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName()
  }
}

let pageContext

const getPageContext = () => {
  if (!process.browser) {
    return createPageContext()
  }

  if (!pageContext) {
    pageContext = createPageContext()
  }

  return pageContext
}

export default getPageContext
