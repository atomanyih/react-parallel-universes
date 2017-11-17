// ask if people know about HOCs
// first dive into HOCs

// then do comparison w other patterns
// Vanilla
class ThingsList extends React.Component {
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
  }
}

// Container/View

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

// I'm going to do a bit of prefactoring
// Dangerous, but we're going to look at how different patterns survive these features

// HOC

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

      return <Wrapped {...{things, isLoading}}/>;
    }
  }
);

const AllThingsList = fetchesThings(ThingsList);

// render props

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
// note I'm intentionally not using FaCC
// I can explain why
// *what about component class as props*

// FEATURE:
// user wants to see view on another page that only shows cool things

// Container/View with callback

class ThingsListContainer extends React.Component {
  static propTypes = {
    filterFn: PropTypes.func
  }

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
    const {filterFn = a => a} = this.props;

    const filteredThings = things.filter(filterFn);

    return <ThingsListView {...{things: filteredThings, isLoading}}/>;
  }
}

const AllThingsList = () => <ThingsListContainer/>;
const CoolThingsList = () => <ThingsListContainer filterFn={({isCool}) => isCool}/>;

// more responsibilities
// we've modified the code

// renderProps

const AllThingsList = () => (
  <FetchesThings renderThings={
    (things, isLoading) => <ThingsList {...{things, isLoading}}/>
  }/>
);

const CoolThingsList = () => (
  <FetchesThings renderThings={
    (things, isLoading) => (
      <ThingsList {...{
        things: things.filter(({isCool}) => isCool),
        isLoading
      }}/>
    )
  }/>
);

// this is nice, we've composed filtering in
// we haven't had to modify any code

// HOCs

const withCoolThings = Wrapped => ({things, ...otherProps}) => {
  const coolThings = things.filter(({isCool}) => isCool);
  return <Wrapped {...otherProps} {...{things: coolThings}}/>;
}

const AllThingsList = fetchesThings(ThingsList);
const CoolThingsList = fetchesThings(withCoolThings(ThingsList));

// SHOW SIDE BY SIDE

// FEATURE:
// render things as a table somewhere else

// Container/View?
// doesn't allow you to share behavior

// render props

const AllThingsList = () => (
  <FetchesThings renderThings={
    (things, isLoading) => <ThingsList {...{things, isLoading}}/>
  }/>
);

const CoolThingsList = () => (
  <FetchesThings renderThings={
    (things, isLoading) => (
      <ThingsList {...{
        things: things.filter(({isCool}) => isCool),
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

// HOCs

const AllThingsList = fetchesThings(ThingsList);
const CoolThingsList = fetchesThings(withCoolThings(ThingsList));
const CoolThingsTable = fetchesThings(withCoolThings(ThingsTable));

// easier to see the composition

// FEATURE:
// only show active cool things

// render props

const CoolActiveThingsTable = () => (
  <FetchesThings renderThings={
    (things, isLoading) => (
      <ThingsTable {...{
        things: things.filter(({isCool, status}) => isCool && (status === 'active')),
        isLoading
      }}/>
    )
  }/>
);
// getting hairy in here

// HOC
// can't do this yet
// even higher orders!
// HOC factory

const withFilteredThings = filterFn => Wrapped => ({things, ...otherProps}) => {
  const coolThings = things.filter(filterFn);
  return <Wrapped {...otherProps} {...{things: coolThings}}/>;
};

const CoolActiveThingsTable = fetchesThings(withFilteredThings(({isCool, status}) => isCool && (status === 'active'))(ThingsList));

// better

const CoolActiveThingsTable = compose(
  fetchesThings,
  withFilteredThings(({isCool, status}) => isCool && (status === 'active'))
)(ThingsList);

// FEATURE:
// dynamic filtering!

// render props

const CoolThingsTableWithStatusFilter = ({filterStatus}) => (
  <FetchesThings renderThings={
    (things, isLoading) => (
      <ThingsTable {...{
        things: things.filter(({isCool}) => isCool && (status === filterStatus)),
        isLoading
      }}/>
    )
  }/>
);
// HOC
// can't do this currently!

// possible solutions
// HOC taking higher order function

const withFilteredThings = filterFn => Wrapped => ({things, ...otherProps}) => {
  const coolThings = things.filter(otherProps)(filterFn);
  return <Wrapped {...otherProps} {...{things: coolThings}}/>;
};

const CoolThingsTableWithStatusFilter = compose(
  fetchesThings,
  withFilteredThings(filerStatus => ({isCool, status}) => isCool && (status === filterStatus))
)(ThingsList);

// WOAH
// getting kind of wild

// let's step back
// throw out our filter HOC
// recompose

const CoolThingsTableWithStatusFilter = compose(
  fetchesThings,
  withProps(({filerStatus, things}) => ({
    things: things.filter(({isCool, status}) => isCool && (status === filterStatus))
  }))
)(ThingsList);

// FEATURE: display things and stuff

const fetches = (url, propName) => Wrapped => (
  class FetchesThings extends React.Component {
    state = {
      isLoading: true,
      results: null
    };

    async componentDidMount() {
      const results = await fetch(url);
      this.setState({
        results,
        isLoading: false
      });
    }

    render() {
      const {results, isLoading} = this.state;

      return <Wrapped {...{[propName]: results, isLoading}}/>;
    }
  }
);

const ThingsAndStuffList = compose(
  fetches('http://example.com/api/things', 'things'),
  fetches('http://example.com/api/stuff', 'stuff'),
)




// METRIC:
// do I have to modify any existing code?
// open closed principle

/// ----- end ------

// go through this in other patterns
// then add features
// PARALLEL TIMELINES

// we're kind of creating a prop pipeline here *go over render order vs execution order*
// *draw picture*

// FEATURE:
// OK, now we want to fetch the same things but

// how abstract can we go?

// 3 options
// then -- add filtering

// render props
// - dynamic composition
// - is "more powerful" but you don't always need that power
//   example: you could say global variables are "more powerful" — you have access to everything everywhere
//   but easy to write terrible code
// - prefer Component arguments
// - ran into some pitfalls

// do recompose

// TODO
// clean up props