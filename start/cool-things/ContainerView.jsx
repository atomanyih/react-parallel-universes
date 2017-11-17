class ThingsListContainer extends React.Component {
  static propTypes = {
    filterFn: PropTypes.func
  }

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
    const {filterFn = a => a} = this.props;

    const filteredThings = things.filter(filterFn);

    return <ThingsListView {...{things: filteredThings, isLoading}}/>;
  }
}

const AllThingsList = () => <ThingsListContainer/>;
const CoolThingsList = () => <ThingsListContainer filterFn={({isCool}) => isCool}/>;