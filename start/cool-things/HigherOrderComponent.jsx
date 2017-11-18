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
};

const AllThingsList = fetchesThings(ThingsList);
const CoolThingsList = fetchesThings(withCoolThings(ThingsList));

const CoolThingsListWithCompose = compose(
  fetchesThings,
  withCoolThings
)(ThingsList);



// (fn, fn, fn, ..fn) => fn
// compose(fn1, fn2, fn3)(something)
// === fn1(fn2(fn3(something)))