import { watcherService } from '../services/watcher.service.js';

const { useState, useEffect, useRef } = React;

const WatcherApp = () => {
  const [watchers, setWatchers] = useState([]);
  const [selectedWatcher, setSelectedWatcher] = useState(null);
  const modalRef = useRef(null);
  const watcherFormRef = useRef(null);
  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    movies: [],
  });

  useEffect(() => {
    watcherService.query().then(watchers => {
      setWatchers(watchers);
    });
  }, []);

  function handleDeleteWatcher(watcherId) {
    watcherService.remove(watcherId);
    setWatchers(watchers.filter(w => w.id !== watcherId));
  }

  useEffect(() => {
    if (selectedWatcher) {
      modalRef.current.showModal();
    } else {
      if (modalRef.current) modalRef.current.close();
    }
  }, [selectedWatcher]);

  useEffect(() => {
    if (toggleForm) {
      watcherFormRef.current.showModal();
    } else {
      if (watcherFormRef.current) {
        watcherFormRef.current.close();
      }
    }
  }, [toggleForm]);

  function handleFormSubmit(e) {
    e.preventDefault();
    if (formData.fullname && formData.movies) {
      watcherService.save(formData).then(watcher => {
        watcherFormRef.current.close();
        setWatchers([...watchers, watcher]);
      });
    } else {
      alert('please fill the form');
    }
  }

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === 'movies') {
      value = value.split('\n').map(v => v.trim());
    }
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="watchers-container flex flex-column justify-center align-center">
      <h1>Watcher App</h1>
      <form>
        <input
          type="button"
          value="Add Watcher"
          onClick={() => setToggleForm(!toggleForm)}
        />
      </form>
      <div className="row flex justify-center align-center">
        {watchers.map(watcher => {
          return (
            <div
              className="card watcher flex flex-column justify-center align-center"
              key={watcher.id}>
              <div className="avatar"></div>
              <p>{watcher.fullname}</p>
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => handleDeleteWatcher(watcher.id)}>
                  X
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedWatcher(watcher)}>
                  Select
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {selectedWatcher && (
        <dialog ref={modalRef} className="watcher-dialog">
          <div className="flex flex-column justify-center align-center">
            <p>{selectedWatcher.fullname}</p>
            <ul>
              {selectedWatcher.movies.map(m => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <button type="button" onClick={() => setSelectedWatcher(null)}>
              Close
            </button>
          </div>
        </dialog>
      )}
      <dialog ref={watcherFormRef}>
        <form onSubmit={e => handleFormSubmit(e)}>
          <label htmlFor="fullname">
            Full Name:
            <input
              type="text"
              name="fullname"
              id="fullname"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="movies">
            Movies (separated by new lines):
            <textarea name="movies" id="movies" onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </dialog>
    </div>
  );
};

export default WatcherApp;
