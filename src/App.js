import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data)
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    //TODO
    const response = await api.post('repositories', {
      url: "https://github.com/Rocketseat/jackson",
      title: `Novo repositório ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    })
    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete('repositories/' + id)
    if (response.status === 204) {
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
