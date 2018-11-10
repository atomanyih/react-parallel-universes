const CoolActiveThingsList = ({pickedStatus}) => (
  <FetchesThings renderThings={
    (things, isLoading) => (
      <ThingsList {...{
        things: things.filter(({isCool}) => isCool)
                      .filter(({status}) => (status === pickedStatus)),
        isLoading
      }}/>
    )
  }/>
);

// getting a little hairy