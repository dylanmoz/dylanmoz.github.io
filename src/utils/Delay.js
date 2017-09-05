import React from 'react'

export default class Delay extends React.Component {
  static defaultProps = {
    period: 0
  }

  state = {
    value: this.props.initial
  }

  componentDidMount() {
    this.refresh(this.props)
  }

  componentWillReceiveProps(next) {
    // if (!this.unmounting) {
    //   this.refresh(next)
    // }
  }

  componentWillUnmount() {
    this.unmounting = true

    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = 0
    }
  }

  refresh(props) {
    let { value, period } = props

    this.timeout = setTimeout(() => this.setState({
      value
    }), period)
  }

  render(){
    return this.props.children(this.state.value)
  }
}
