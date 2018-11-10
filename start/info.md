Ask about familiarity w/ different patterns

Vanilla

p standard component
explain what component does

a bunch of responsibilities in here

don't technically need to do anything about this
I'm going to do some prefactoring
and we're going to follow multiple timelines


CONTAINER VIEW

now we've separated UI from fetching
still multiple things being done


RENDER PROPS

in render props you pass a function or component as a prop


HIGHER ORDER COMPONENTS

a function that takes a component and returns a component

both of these allow you to do dependency injection


NEW FEATURE: another page has a list of cool things


CONTAINER VIEW

naïve: flag to change filter

slightly better:
take a callback for a filter function
this isn't super great b/c we've added another responsibility


RENDER PROP

you can intercept things and do whatever you want to it
that's nice


HIGHER ORDER COMPONENTS

let's write a new component that filters for us
we can compose this in
looks really nice


FEATURE: THINGS TABLE
a different view

Really easy with HOC and render props
what about containers? well you end up with render props

FEATURE: filter by status
I'm going to ignore

FEATURE: dynamic filtering
easy with render props
hard with HOCs
we have to write something new

let's walk it back
recompose