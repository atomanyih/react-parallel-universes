// can't do this yet
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