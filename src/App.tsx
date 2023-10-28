import RoomAllocation from './components/RoomAllocation';

function App() {
  return (
    <div>
      <RoomAllocation
        guest={10}
        room={3}
        onChange={(result) => console.log(result)}
      />
    </div>
  );
}

export default App;
