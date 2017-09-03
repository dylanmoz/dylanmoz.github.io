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
    this.refresh(next)
  }

  refresh(props) {
    let { value, period } = props

    setTimeout(() => this.setState({
      value
    }), period)
  }

  render(){
    return this.props.children(this.state.value)
  }
}
