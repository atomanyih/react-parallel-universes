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

const AllThingsList = fetchesThings(ThingsList);