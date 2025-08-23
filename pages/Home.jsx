import AnimalList from '../cmps/AnimalList.jsx';
import CountDown from '../cmps/CountDown.jsx';
import SeasonClock from '../cmps/SeasonClock.jsx';

const animalInfos = [
  { type: 'Malayan Tiger', count: 787 },
  { type: 'Mountain Gorilla', count: 212 },
  { type: 'Fin Whale', count: 28 },
];

export function Home() {
  return (
    <section className="home">
      {/* <h2>Home Sweet Home</h2> */}
      {/* <AnimalList animalInfos={animalInfos} /> */}
      {/* <SeasonClock /> */}
      <CountDown
        startFrom={10}
        toTime={Date.now() + 5 * 1000}
        onDone={() => console.log('DONE!')}
      />
    </section>
  );
}
