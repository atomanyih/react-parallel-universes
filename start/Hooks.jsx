import React, {useState, useEffect} from 'react';

const ThingsList = ({fetch}) => {
  const [things, setThings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchThings = async () => {
    const things = await fetch('example.com/api/things');
    setThings(things);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchThings()
  }, []);

  if (isLoading) {
    return <div>Loading things</div>;
  }

  if (things.length === 0) {
    return <div>No things</div>;
  }

  return (
    <ul>
      {things.map(({name}, i) => <li key={i}>{name}</li>)}
    </ul>
  );
};

export default ThingsList;