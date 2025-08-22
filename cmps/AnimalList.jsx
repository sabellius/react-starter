const AnimalList = ({ animalInfos }) => {
  console.log("🚀 ~ AnimalList ~ animalInfos:", animalInfos);
  return (
    <div className="table-container">
      <h1>Rare Animals</h1>
      <table className="animal-list">
        <tbody>
          {animalInfos.map(({ type, count }) => {
            return (
              <tr key={type}>
                <td>{type}</td>
                <td>{count}</td>
                <td>
                  <a
                    href={`https://www.google.com/search?q=${type}`}
                    target="_blank"
                  >
                    Search
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalList;
