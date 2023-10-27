import CustomInputNumber from '@/components/CustomInputNumber';
import { useState } from 'react';

function App() {
  const [num, setNum] = useState<number>(0);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNum(parseInt(event.target.value));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {};

  return (
    <div>
      <div>{num}</div>
      <CustomInputNumber
        name="custom-input-01"
        min={1}
        max={13}
        step={2}
        disabled={false}
        value={num}
        onChange={handleInput}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default App;
