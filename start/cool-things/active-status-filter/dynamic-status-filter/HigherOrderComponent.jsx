const withFilteredThings = filterFn => Wrapped => ({things, ...otherProps}) => {
  const coolThings = things.filter(filterFn(otherProps));
  return <Wrapped {...otherProps} {...{things: coolThings}}/>;
};

// filterFn : props -> thing -> bool
// Array.filter : Array[things] -> (thing -> bool) -> [things]

const CoolThingsTableWithStatusFilter = compose(
  fetchesThings,
  withFilteredThings((props) => (thing) => thing.isCool && (thing.status === props.filterStatus))
)(ThingsList);

// getting kind of wild - let's dial it back
// introducing recompose

const CoolThingsTableWithStatusFilter = compose(
  fetchesThings,
  withProps(({filterStatus, things}) => ({
    things: things.filter(({isCool, status}) => isCool && (status === filterStatus))
  }))
)(ThingsList);
