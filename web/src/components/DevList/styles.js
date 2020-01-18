import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  margin-left: 30px;

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    list-style: none;
  }

  @media (max-width: 1000px) {
    margin: 30px 0 0;
  }

  @media (max-width: 650px) {
    ul {
      grid-template-columns: 1fr;
    }
  }
`;

export const Dev = styled.div`
  background: #fff;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
    }
  }

  p {
    color: #666;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0;
  }

  div a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  a {
    color: #8e4dff;
    font-size: 14px;
    text-decoration: none;

    &:hover {
      color: #5a2ea6;
    }

    span {
      margin-right: 5px;
    }
  }
`;

export const ContainerDevInfo = styled.div`
  margin-left: 10px;

  strong {
    display: block;
    font-size: 16px;
    color: #333;
  }

  span {
    font-size: 13px;
    color: #999;
    margin-top: 2px;
  }
`;
