// NAIVE

class ThingsListContainer extends React.Component {
  static propTypes = {
    filterFn: PropTypes.func,
    showsTable: PropTypes.bool
  };

  state = {
    isLoading: true,
    things: []
  };

  async componentDidMount() {
    const things = await fetch('example.com/api/things');
    this.setState({
      things,
      isLoading: false
    });
  }

  render() {
    const {things, isLoading} = this.state;
    const {filterFn = a => a, showsTable} = this.props;

    const filteredThings = things.filter(filterFn);

    if(showsTable) {
      return <ThingsTable {...{things: filteredThings, isLoading}}/>;
    }
    return <ThingsListView {...{things: filteredThings, isLoading}}/>;
  }
}

const CoolThingsList = () => <ThingsListContainer filterFn={({isCool}) => isCool}/>;
const CoolThingsTable = () => <ThingsListContainer isTable filterFn={({isCool}) => isCool}/>;