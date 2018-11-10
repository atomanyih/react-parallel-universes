// can't do this yet

const withCoolThings = Wrapped => ({things, ...otherProps}) => {
  const coolThings = things.filter(({isCool}) => isCool);
  return <Wrapped {...otherProps} {...{things: coolThings}}/>;
};

// HOC factory

const withFilteredThings = filterFn => Wrapped => ({things, ...otherProps}) => {
  const coolThings = things.filter(filterFn);
  return <Wrapped {...otherProps} {...{things: coolThings}}/>;
};

const CoolActiveThingsTable = compose(
  fetchesThings,
  withFilteredThings(({isCool, status}) => isCool && (status === 'active'))
)(ThingsList);

const withCoolThings = withFilteredThings(isCoolThing);
const withActiveThings = withFilteredThings(isActiveThing);

// f(a,b,c)
// f(a) -> g(b,c)