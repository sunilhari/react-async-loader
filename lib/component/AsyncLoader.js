import React from 'react';
import PropTypes from 'prop-types';
/**
 * Accepted Props are Loader,component,componentProps,loaderProps
 */

class AsyncLoader extends React.Component {
  constructor() {
    super();
    this.state = {
      Component: null
    };
  }
  componentDidMount() {
    import(this.props.component)
      .then(Component => {
        this.setState({
          Component: Component.default
        });
      })
      .catch(() => {
        throw Error('Unable to fetch');
      });
  }

  render() {
    let { Loader, componentProps = {}, loaderProps = {} } = this.props;
    let { Component } = this.state;
    if (Component) {
      return <Component {...componentProps}>{this.props.children}</Component>;
    }
    return <Loader {...loaderProps} />;

  }
}
AsyncLoader.propTypes = {
  children: PropTypes.func,
  component: PropTypes.string.isRequired,
  componentProps: PropTypes.object,
  Loader: PropTypes.func,
  loaderProps: PropTypes.object

};
export default AsyncLoader;
