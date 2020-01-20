import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import api from '~/services/api';
import { connect, disconnect, subscribeToNewDevs } from '~/services/socket';

import {
  Map,
  ContainerAvatar,
  Avatar,
  DevInfoWrapper,
  DevName,
  DevBio,
  DevTechs,
  SearchDevsForm,
  TechInput,
  SubmitButton,
} from './styles';

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');
  const [currentRegion, setCurrentRegion] = useState(null);
  const [keyboardState, setKeyboardState] = useState('closed');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function keyboardDidShow(e) {
    setKeyboardState('opened');
    // setKeyboardHeight(e.endCoordinates.height);
  }

  function keyboardDidHide(e) {
    setKeyboardState('closed');
    // setKeyboardHeight(0);
  }

  function setWebSocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
  }

  async function searchDevs() {
    if (!techs) {
      Keyboard.dismiss();
      return;
    }

    const { latitude, longitude } = currentRegion;
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });

    setDevs(
      response.data.map(dev => ({
        ...dev,
        techs: dev.techs.join(', '),
      }))
    );
    setTechs('');
    Keyboard.dismiss();
    setWebSocket();
  }

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  useEffect(() => {
    function createEventListenerKeyboard() {
      Keyboard.addListener('keyboardDidShow', keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    }
    createEventListenerKeyboard();
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  }, []);

  function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <Map
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChange}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}
          >
            <ContainerAvatar>
              <Avatar
                source={{
                  uri: dev.avatar_url,
                }}
              />
            </ContainerAvatar>

            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username,
                });
              }}
            >
              <DevInfoWrapper>
                <DevName>{dev.name}</DevName>
                <DevBio>{dev.bio}</DevBio>
                <DevTechs>{dev.techs}</DevTechs>
              </DevInfoWrapper>
            </Callout>
          </Marker>
        ))}
      </Map>
      <SearchDevsForm keyboard={keyboardState} keyboardHeight={keyboardHeight}>
        <TechInput
          placeholder="Buscar devs por tecnologia"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
          onSubmitEditing={searchDevs}
          style={{
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 4,
              height: 4,
            },
            elevation: 5,
          }}
        />
        <SubmitButton onPress={searchDevs}>
          <MaterialIcons name="search" size={20} color="#fff" />
        </SubmitButton>
      </SearchDevsForm>
    </>
  );
}
