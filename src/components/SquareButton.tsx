import styled from 'styled-components';

type Props = {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const StyledButton = styled.button<{ disabled: boolean }>`
  width: 48px;
  height: 48px;
  border: ${({ disabled }) => `1px solid ${disabled ? '#9bd4e4' : '#00a1d1'}`};
  border-radius: 5px;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
  color: ${({ disabled }) => (disabled ? '#9bd4e4' : '#00a1d1')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

function Button({ disabled, children, onClick }: Props) {
  return (
    <StyledButton disabled={disabled ?? false} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
