class ThingsListContainer extends React.Component {
  static propTypes = {
    showCool: PropTypes.bool
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
    const {showCool} = this.props;

    const filteredThings = showCool ? things.filter(({isCool}) => isCool) : things;

    return <ThingsListView {...{things: filteredThings, isLoading}}/>;
  }
}

const AllThingsList = () => <ThingsListContainer/>;
const CoolThingsList = () => <ThingsListContainer showCool/>;