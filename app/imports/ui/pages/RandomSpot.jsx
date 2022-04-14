import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Spots } from '../../api/spot/Spots';
import Spot from '../components/Spot';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class RandomSpot extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    // const info = this.props.spots.map((spot, index) => <Spot key={index} spot={spot}/>);
    const rand = _.sample(this.props.spots.map((spot, index) => <Spot key={index} spot={spot}/>));
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Contacts</Header>
        <Card.Group>
          {rand}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
RandomSpot.propTypes = {
  spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const spots = Spots.collection.find({}).fetch();
  return {
    spots,
    ready,
  };
})(RandomSpot);
