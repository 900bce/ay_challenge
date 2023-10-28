import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import RoomControl from './RoomControl';

export type RoomGuest = {
  adult: number;
  child: number;
};

type Props = {
  guest: number;
  room: number;
  onChange: (result: Array<RoomGuest>) => void;
};

const Container = styled.div`
  margin: 0 auto;
  padding: 10px;
  width: 360px;

  .guest-info {
    font-size: 18px;
  }

  .unallocated {
    width: 100%;
    padding: 18px;
    margin: 18px 0 5px 0;
    border: 1px solid #c7eef8;
    border-radius: 6px;
    background-color: #edffff;
    color: #666;
    font-size: 16px;
  }

  .room-card:not(:last-of-type) {
    border-bottom: 1px solid #eee;
  }
`;

function RoomAllocation({ guest, room, onChange }: Props) {
  const [unallocated, setUnallocated] = useState(guest);
  const [result, setResult] = useState<Array<RoomGuest>>(
    Array.from({ length: room }).map((_, i) => ({ adult: 1, child: 0 }))
  );

  const handleChange = (e: RoomGuest, i: number) => {
    setResult((prev) => {
      const newResult = [...prev];
      newResult[i] = e;
      return newResult;
    });
  };

  useEffect(() => {
    const totalAllocated = result.reduce(
      (total, room) => total + room.adult + room.child,
      0
    );
    setUnallocated(guest - totalAllocated);
    onChange(result);
  }, [result]);

  return (
    <Container>
      <p className="guest-info">
        住客人數：{guest} 人 / {room} 房
      </p>
      <div className="unallocated">尚未分配人數：{unallocated} 人</div>
      {result.map((_, i) => (
        <RoomControl
          key={i}
          className="room-card"
          onChange={handleChange}
          index={i}
          unallocated={unallocated}
          disabled={guest === room}
          maxGuest={4}
        />
      ))}
    </Container>
  );
}

export default RoomAllocation;
