class FetchesThings extends React.Component {
  static propTypes = {
    renderThings: PropTypes.func.isRequired
  };

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

    return renderThings(things, isLoading);
  }
}

const ThingsList = ({things, isLoading}) => {
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

const AllThingsList = () => (
  <FetchesThings renderThings={
    (things, isLoading) => <ThingsList {...{things, isLoading}}/>
  }/>
);