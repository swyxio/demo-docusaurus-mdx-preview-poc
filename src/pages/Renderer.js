import React from 'react'
import {MDXProvider} from '@mdx-js/react'


export default class Renderer extends React.Component {
  state = {
    h1: ({children}) => <h1>{children}</h1>,
    p: ({children}) => <p>{children}</p>,
  }

  render() {
    return (
      <MDXProvider components={this.state}>
        <main {...this.props} />
      </MDXProvider>
    )
  }
}