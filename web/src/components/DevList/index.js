import React, { useEffect, useState } from 'react';
import { DiGithubBadge } from 'react-icons/di';
import api from '../../services/api';

import { Container, Dev, ContainerDevInfo } from './styles';

export default function DevList() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('devs');

      setDevs(
        response.data.map(dev => ({
          ...dev,
          techs: dev.techs.join(', '),
        }))
      );
    }

    loadDevs();
  }, []);

  return (
    <Container>
      <ul>
        {devs.map(dev => (
          <Dev key={dev._id}>
            <header>
              <img src={dev.avatar_url} alt={dev.name} />
              <ContainerDevInfo>
                <strong>{dev.name}</strong>
                <span>{dev.techs}</span>
              </ContainerDevInfo>
            </header>
            <p>{dev.bio}</p>
            <div>
              <a href={`https://github.com/${dev.github_username}`}>
                <span>
                  <DiGithubBadge size={25} color="rgba(0,0,0, 0.8)" />
                </span>
                Acessar perfil no Github
              </a>
            </div>
          </Dev>
        ))}
      </ul>
    </Container>
  );
}
