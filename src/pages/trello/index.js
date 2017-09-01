import React from 'react'
import glamorous from 'glamorous'

import TrelloGraph from './TrelloGraph'

const Container = glamorous.div({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgb(246, 247, 251)'
})

const GraphContainer = glamorous.div({
  backgroundColor: 'black',
  borderRadius: 6,
  marginBottom: 24,
  boxShadow: '0 2px 4px 0 rgba(25, 29, 34, 0.1)',
  backgroundColor: 'white',
  padding: 24,
  color: 'rgba(25, 29, 34, 0.54)'
})

export default class Trello extends React.Component {
  render() {
    return (
      <Container>
        <GraphContainer className="eight columns">
          <h5>Recent Activity</h5>
          <TrelloGraph />
        </GraphContainer>
        <p style={{ color: 'rgba(25, 29, 34, 0.38)' }}>
          <a href="https://github.com/DylanMoz/dylanmoz.github.io/blob/source/src/pages/trello/TrelloGraph.js">Source</a>. Inspired by this <a href="https://dribbble.com/shots/3626885-Trello-Atlassian-Stats">trello design</a>.
        </p>
      </Container>
    )
  }
}
