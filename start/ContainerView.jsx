class ThingsListContainer extends React.Component {
  state = {
    isLoading: true,
    things: []
  };

  async componentDidMount() {
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
      {things.map(({name}) => <li>{name}</li>)}
    </ul>
  );
};

// now we've separated UI from fetching
// UI is still doing multiple things, but it's better