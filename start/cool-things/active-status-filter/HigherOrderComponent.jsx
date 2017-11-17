// can't do this yet
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
