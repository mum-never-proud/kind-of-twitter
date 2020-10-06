import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import facts from '@constants/facts.json';

const Facts = () => {
  const history = useHistory();
  const [topic, setTopic] = useState(facts[history.location.pathname] || facts['*']);

  useEffect(() => history.listen((ev) => setTopic(facts[ev.pathname] || facts['*'])), []);

  return (
    <>
      <h3>{topic.title}</h3>
      <ul className="p-0">
        {
          topic.facts.map((fact) => (
            // eslint-disable-next-line react/no-danger
            <li key={fact} className="mt-3" dangerouslySetInnerHTML={{ __html: fact }} />
          ))
        }
      </ul>
    </>
  );
};

export default Facts;
