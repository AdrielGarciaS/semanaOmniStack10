import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #eee;
  border-radius: 4px;
`;

export const Select = styled(CreatableSelect)`
  width: 100%;
  div {
    border: none;
  }
`;

// Estrutura React Select
{
  /* <div class="react-select-container">
  <div class="react-select__control">

    <div class="react-select__value-container">...</div>
    <div class="react-select__indicators">...</div>
  </div>
  <div class="react-select__menu">
    <div class="react-select__menu-list">
      <div class="react-select__option">...</div>
    </div>
  </div>
</div> */
}
