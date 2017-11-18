const fetchesThings = Wrapped => (
  class FetchesThings extends React.Component {
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

      return <Wrapped {...this.props} {...{things, isLoading}}/>;
    }
  }
);

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

const AllThingsList = fetchesThings(ThingsList);