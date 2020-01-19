import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import api from '~/services/api';

import {
  Map,
  Mark,
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

    setDevs(response.data);
    setTechs('');
    Keyboard.dismiss();
  }

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
          <Mark
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}
          >
            <Avatar
              source={{
                uri: dev.avatar_url,
              }}
            />

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
          </Mark>
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
          <MaterialIcons name="send" size={20} color="#fff" />
        </SubmitButton>
      </SearchDevsForm>
    </>
  );
}
