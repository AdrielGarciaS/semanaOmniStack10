import React, { useState, useEffect, createRef } from 'react';
import { DiGithubBadge } from 'react-icons/di';
import InputCreatable from '../InputCreatable';

import {
  Container,
  Strong,
  Form,
  ContainerInput,
  Label,
  ContainerIconInput,
  Input,
  ContainerLatLong,
  SubmitButton,
} from './styles';

export default function FormDev({ onSubmit }) {
  const techsInputRef = createRef();

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [github_username, setGithub_username] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      github_username,
      latitude,
      longitude,
      techs: techsInputRef.current.props.value.map(t => t.value).join(', '),
    });
  }

  return (
    <Container>
      <Strong>Cadastrar</Strong>
      <Form onSubmit={handleSubmit}>
        <ContainerInput>
          <Label htmlFor="github_username">Usuário Github</Label>
          <ContainerIconInput>
            <Input
              name="github_username"
              id="github_username"
              value={github_username}
              onChange={e => setGithub_username(e.target.value)}
              required
            />
            <DiGithubBadge size={35} color="rgba(0,0,0, 0.8)" />
          </ContainerIconInput>
        </ContainerInput>

        <ContainerInput>
          <Label htmlFor="techs">Tecnologias</Label>
          <InputCreatable
            name="techs"
            id="techs"
            placeholder=" "
            fowardRef={techsInputRef}
            required
          />
        </ContainerInput>

        <ContainerLatLong>
          <ContainerInput>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              name="latitude"
              type="text"
              id="latitude"
              value={latitude}
              onChange={() => {}}
              required
            />
          </ContainerInput>

          <ContainerInput>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              name="longitude"
              type="text"
              id="longitude"
              value={longitude}
              onChange={() => {}}
              required
            />
          </ContainerInput>
        </ContainerLatLong>

        <SubmitButton type="submit">Cadastrar</SubmitButton>
      </Form>
    </Container>
  );
}
