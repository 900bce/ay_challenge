import React, { ChangeEvent, useState, FocusEvent, useEffect } from 'react';
import styled from 'styled-components';
import SquareButton from './SquareButton';

type Props = {
  min: number;
  max: number;
  step?: number;
  name: string;
  value: number;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  gap: 10px;
  padding: 10px;

  .value {
    width: 48px;
    height: 48px;
    border: ${({ disabled }) => `1px solid ${disabled ? '#d3d3d3' : 'gray'}`};
    border-radius: 5px;
    font-size: 20px;
    line-height: 48px;
    text-align: center;
    color: ${({ disabled }) => (disabled ? '#d3d3d3' : 'gray')};
    overflow: hidden;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
`;

function CustomInputNumber({
  min,
  max,
  step = 1,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}: Props) {
  const [valueState, setValueState] = useState<number>(value ?? 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (isNaN(parseInt(newValue)) || newValue === '') {
      setValueState(min);
      return;
    }

    if (parseInt(newValue) > max) {
      newValue = max.toString();
    }

    if (parseInt(newValue) < min) {
      newValue = min.toString();
    }

    setValueState(parseInt(newValue));
  };

  const handleBlur = () => {
    if (!onBlur) {
      return;
    }

    const event = {
      target: {
        name,
        value: valueState,
      },
    } as unknown as FocusEvent<HTMLInputElement>;

    onBlur(event);
  };

  const handleDecrement = () => {
    if (disabled || valueState < min + (step || 0)) {
      return;
    }
    setValueState((prev) => prev - (step || 0));
  };

  const handleIncrement = () => {
    if (disabled || valueState > max - (step || 0)) {
      return;
    }
    setValueState((prev) => prev + (step || 0));
  };

  useEffect(() => {
    if (!onChange) {
      return;
    }

    if (valueState < min) {
      setValueState(min);
    }

    const event = {
      target: {
        name,
        value: valueState,
      },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);
  }, [valueState]);

  return (
    <Container disabled={disabled ?? false}>
      <SquareButton
        disabled={disabled || valueState <= min}
        onClick={handleDecrement}>
        &#8722;
      </SquareButton>
      <input
        className="value"
        type="text"
        onChange={handleInputChange}
        onBlur={handleBlur}
        value={valueState}
        disabled={disabled}
      />
      <SquareButton
        disabled={disabled || valueState >= max}
        onClick={handleIncrement}>
        &#43;
      </SquareButton>
    </Container>
  );
}

export default CustomInputNumber;
