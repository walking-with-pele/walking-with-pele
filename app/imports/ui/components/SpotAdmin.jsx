import React from 'react';
import { Card, Feed, Label, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SpotAdmin extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Label color='green' ribbon>
            {this.props.spot.spotType}
          </Label>
          <Card.Header>{this.props.spot.name}</Card.Header>
          <Card.Meta>{this.props.spot.address}</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Button className="ui button" as={Link} to={`/spot-page/${this.props.spot._id}`}>
                  View Page
          </Button>
        </Card.Content>
        <Card.Content>
                Likes: {this.props.spot.likes}
        </Card.Content>
        <Card.Content>
                Added by {this.props.spot.owner}
        </Card.Content>
        <Card.Content extra>
          <Card.Header>Comments</Card.Header>
          <Feed>
            {this.props.comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <AddComment owner={this.props.spot.owner} spotId={this.props.spot._id}/>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/edit/${this.props.spot._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
SpotAdmin.propTypes = {
  spot: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    owner: PropTypes.string,
    spotType: PropTypes.string,
    likes: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  comments: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SpotAdmin);
