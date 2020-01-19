import React, { useState } from 'react';
import api from '~/services/api';

import FormDev from '../../components/FormDev';
import DevList from '../../components/DevList';
import { Container } from './styles';

export default function Dev() {
  const [devs, setDevs] = useState([]);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <Container>
      <FormDev onSubmit={handleAddDev} />
      <DevList devs={devs} setDevs={setDevs} />
    </Container>
  );
}
