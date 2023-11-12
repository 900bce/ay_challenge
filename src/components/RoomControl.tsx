import { styled } from 'styled-components';
import CustomInputNumber from './CustomInputNumber';
import { ChangeEvent, useEffect, useState } from 'react';
import { RoomGuest } from './RoomAllocation';

type Props = {
  className: string;
  adultCount: number;
  childCount: number;
  onChange: (result: RoomGuest, index: number) => void;
  maxGuest: number;
  index: number;
  unallocated: number;
  disabled: boolean;
};

const Container = styled.div`
  padding: 16px 0;

  .room-title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .adult,
  .children {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    .age {
      color: #aaa;
    }
  }
`;

function RoomControl({
  className,
  adultCount,
  childCount,
  maxGuest,
  onChange,
  index,
  unallocated,
  disabled,
}: Props) {
  const handleAdultChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ adult: parseInt(e.target.value), child: childCount }, index);
  };

  const handleChildChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ adult: adultCount, child: parseInt(e.target.value) }, index);
  };

  return (
    <Container className={className}>
      <p className="room-title">房間：{childCount + adultCount} 人</p>
      <div>
        <div className="adult">
          <div>
            <p>大人</p>
            <p className="age">年齡 20+</p>
          </div>
          <CustomInputNumber
            min={1}
            max={unallocated ? maxGuest - childCount : adultCount}
            name="adult"
            value={adultCount}
            onChange={handleAdultChange}
            disabled={disabled}
          />
        </div>
        <div className="children">
          <div>
            <p>小孩</p>
          </div>
          <CustomInputNumber
            min={0}
            max={unallocated ? maxGuest - adultCount : childCount}
            name="chidren"
            value={childCount}
            onChange={handleChildChange}
            disabled={disabled}
          />
        </div>
      </div>
    </Container>
  );
}

export default RoomControl;
