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

const AllThingsList = () => (
  <FetchesThings renderThings={
    (things, isLoading) => <ThingsList {...{things, isLoading}}/>
  }/>
);

const CoolThingsList = () => (
  <FetchesThings renderThings={
    (things, isLoading) => (
      <IdeasList {...{
        ideas: things.filter(({isCool}) => isCool),
        isLoading
      }}/>
    )
  }/>
);

const CoolThingsTable = () => (
  <FetchesThings renderThings={
    (things, isLoading) => (
      <ThingsTable {...{
        things: things.filter(({isCool}) => isCool),
        isLoading
      }}/>
    )
  }/>
);