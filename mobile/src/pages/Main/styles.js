import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const Map = styled(MapView)`
  flex: 1;
`;

export const ContainerAvatar = styled.View`
  border: 4px;
  border-color: #fff;
  border-radius: 4px;
`;

export const Avatar = styled.Image`
  height: 54px;
  width: 54px;
  border-radius: 4px;
`;

export const DevInfoWrapper = styled.View`
  width: 260px;
`;

export const DevName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const DevBio = styled.Text`
  color: #666;
  margin-top: 5px;
`;

export const DevTechs = styled.Text`
  margin-top: 5px;
`;

export const SearchDevsForm = styled.View`
  position: absolute;
  bottom: ${props =>
    props.keyboard === 'opened' ? `${props.keyboardHeight + 15}px` : '30px'};
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

export const TechInput = styled.TextInput`
  flex: 1;
  height: 50px;
  background-color: #fff;
  color: #333;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 16px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #8e4dff;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;
