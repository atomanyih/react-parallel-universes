const CoolActiveThingsList = () => (
  <FetchesThings renderThings={
    (things, isLoading) => (
      <ThingsList {...{
        things: things.filter(({isCool, status}) => isCool && (status === 'active')),
        isLoading
      }}/>
    )
  }/>
);

// getting a little hairy