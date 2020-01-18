import React from 'react';

import FormDev from '../../components/FormDev';
import DevList from '../../components/DevList';
import { Container } from './styles';

export default function Dev() {
  return (
    <Container>
      <FormDev />
      <DevList />
    </Container>
  );
}
