import React from "react";

class ThingsListContainer extends React.Component {
  state = {
    isLoading: true,
    things: []
  };

  async componentDidMount() {
    const {fetch} = this.props;

    const things = await fetch('example.com/api/things');
    this.setState({
      things,
      isLoading: false
    });
  }

  render() {
    const {things, isLoading} = this.state;

    return <ThingsListView {...{things, isLoading}}/>;
  }
}

const ThingsListView = ({things, isLoading}) => {
  if (isLoading) {
    return <div>Loading things</div>;
  }

  if (things.length === 0) {
    return <div>No things</div>;
  }

  return (
    <ul>
      {things.map(({name}, i) => <li key={i}>{name}</li>)}
    </ul>
  );
};

export default ThingsListContainer;