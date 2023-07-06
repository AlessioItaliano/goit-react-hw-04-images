import PropTypes from 'prop-types';

import { ButtonStyle } from './Button.styled';

const Button = ({ onClick }) => {
  return <ButtonStyle onClick={onClick}>Load more</ButtonStyle>;
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
