const withFilteredThings = filterFn => Wrapped => ({things, ...otherProps}) => {
  const coolThings = things.filter(otherProps)(filterFn);
  return <Wrapped {...otherProps} {...{things: coolThings}}/>;
};

const CoolThingsTableWithStatusFilter = compose(
  fetchesThings,
  withFilteredThings(({filterStatus}) => ({isCool, status}) => isCool && (status === filterStatus))
)(ThingsList);

// getting kind of wild - let's dial it back
// introducing recompose

const CoolThingsTableWithStatusFilter = compose(
  fetchesThings,
  withProps(({filterStatus, things}) => ({
    things: things.filter(({isCool, status}) => isCool && (status === filterStatus))
  }))
)(ThingsList);
