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

const withCoolThings = Wrapped => ({things, ...otherProps}) => {
  const coolThings = things.filter(({isCool}) => isCool);
  return <Wrapped {...otherProps} {...{things: coolThings}}/>;
}

const fetchesCoolThings = compose(
  fetchesThings,
  withCoolThings
);
const AllThingsList = fetchesThings(ThingsList);
const CoolThingsList = fetchesCoolThings(ThingsList);
const CoolThingsTable = fetchesCoolThings(ThingsTable);


