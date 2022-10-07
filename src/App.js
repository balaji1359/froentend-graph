import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { ForceGraph } from "./components/forceGraph";
import './App.css';

function App() {
  const url = "http://45.55.42.215:8000"
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>
      <b>${node.name}</b>
    </div>`;
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!data) {
    return <div>Loading...</div>;
  } else if (data) {
    return (
      <div className="App">
        <header className="App-header">
          Force Graph Example
        </header>
        <section className="Main">
          <ForceGraph linksData={data.links} nodesData={data.nodes} nodeHoverTooltip={nodeHoverTooltip} />
        </section>
      </div>

    );
  }
}

export default App;
