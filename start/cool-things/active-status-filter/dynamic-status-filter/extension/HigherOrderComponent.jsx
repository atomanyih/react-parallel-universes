// powerful composition
//

const CoolThingsTableWithStatusFilter = compose(
  fetchesThings,
  withProps(({filterStatus, things}) => ({
    things: things.filter(({isCool, status}) => isCool && (status === filterStatus))
  }))
)(ThingsList);


// scrubbed data

const ScrubbedCoolThingsTableWithStatusFilter = compose(
  fetchesThings,
  withProps(({filterStatus, things}) => ({
    things: things.filter(({isCool, status}) => isCool && (status === filterStatus))
  })),
  withProps(({filterStatus, things}) => ({
    things: things.map((thing) => ({...thing, name: 'redacted'}))
  }))
)(ThingsList);


// deconstruct composable responsibilities

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

const ThingsList = ({things}) => (
  <ul>
    {things.map(({name}) => <li>{name}</li>)}
  </ul>
)

const ThingsListView = compose(
  branch(
    ({isLoading}) => isLoading,
    renderComponent(() => <div>Loading things</div>)
  ),
  branch(
    ({things}) => things.length === 0,
    renderComponent(() => <div>No things</div>)
  )
)(ThingsList)


