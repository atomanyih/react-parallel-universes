const CoolThingsListWithStatusFilter = ({filterStatus}) => (
  <FetchesThings renderThings={
    (things, isLoading) => (
      <ThingsList {...{
        things: things.filter(({isCool, status}) => isCool && (status === filterStatus)),
        isLoading
      }}/>
    )
  }/>
);