import React from 'react'
import glamorous from 'glamorous'
import { Container, Row, Col } from 'glamorous-grid'
import withSpacing from 'glamorous-grid/lib/withSpacing'

import TrelloGraph from './TrelloGraph'

const GraphContainer = withSpacing(glamorous.div({
  borderRadius: 6,
  marginBottom: 24,
  boxShadow: '0 2px 4px 0 rgba(25, 29, 34, 0.1)',
  backgroundColor: 'white',
  color: 'rgba(25, 29, 34, 0.54)',
  overflow: 'hidden'
}))

export default class Trello extends React.Component {
  render() {
    return (
      <Container fluid style={{ background: 'rgb(246, 247, 251)' }}>
        <Row style={{ height: '100%' }}>
          <Col alignSelf="center">
            <Row justifyContent="center">
              <Col span={{ xs: 1, sm: 10/12, md: 8/12, lg: 8/12, xl: 6/12 }}>
                <GraphContainer p={{ xs: 12, sm: 24 }}>
                  <h5>Recent Activity</h5>
                  <TrelloGraph />
                </GraphContainer>
              </Col>
            </Row>
            <Row justifyContent="center">
              <Col span={{ xs: 1, sm: 9/12, md: 8/12 }} textAlign="center">
                <p style={{ marginBottom: 0, color: 'rgba(25, 29, 34, 0.38)' }}>Desktop: hover for tooltip. Mobile: Touch or drag for tooltip.</p>
                <p style={{ color: 'rgba(25, 29, 34, 0.38)' }}>
                  <a href="https://github.com/DylanMoz/dylanmoz.github.io/blob/source/src/pages/trello/TrelloGraph.js">Source</a>. Inspired by this <a href="https://dribbble.com/shots/3626885-Trello-Atlassian-Stats">trello design</a>.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}
