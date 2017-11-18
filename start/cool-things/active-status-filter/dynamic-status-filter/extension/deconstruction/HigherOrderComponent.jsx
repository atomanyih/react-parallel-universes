// dope UI components
// adapters

const List = ({items}) => (
  <ul>
    {items.map((item) => <li>{item}</li>)}
  </ul>
);

const FilterableCoolThingsList = compose(
  fetchesThings,
  withProps(({things}) => ({
    things: things.filter(({isCool}) => isCool)
  })),
  withProps(({things, filterStatus}) => ({
    things: things.filter(({status}) => status === filterStatus)
  })),
  branch(
    ({isLoading}) => isLoading,
    renderComponent(() => <div>Loading things</div>)
  ),
  withProps(({things}) => ({
    items: things.map(({name}) => name)
  }))
)(List);

const DescriptionList = ({items}) => (
  <dl>
    {
      items.map(({term, description}) => (
        <div>
          <dt>{term}</dt>
          <dd>{description}</dd>
        </div>
      ))
    }
  </dl>
);

const ThingsList = compose(
  withProps(({things}) => ({
    items: things.map(({name}) => name)
  }))
)(List);

const ThingsDescriptionList = compose(
  withProps(({things}) => ({
    items: things.map(({name, description}) => ({
      term: name,
      description
    }))
  }))
)(DescriptionList);
