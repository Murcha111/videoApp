import "./App.css";
import Audio from "./components/Audio";
import Video from "./components/Video";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="audio__container">
          <Audio />
        </div>

        <div className="video__container">
          <Video />
        </div>
      </div>
    </>
  );
}

export default App;
