import AnimalList from '../cmps/AnimalList.jsx';

const animalInfos = [
  { type: 'Malayan Tiger', count: 787 },
  { type: 'Mountain Gorilla', count: 212 },
  { type: 'Fin Whale', count: 28 },
];

export function Home() {
  return (
    <section className="home">
      <h2>Home Sweet Home</h2>
      <AnimalList animalInfos={animalInfos} />
    </section>
  );
}
