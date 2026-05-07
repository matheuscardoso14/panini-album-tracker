import "./App.scss";
import Header from "./Components/Header/Header";
import TeamSection from "./Components/TeamSection/TeamSection";

function App() {
  return (
    <>
      <Header />
        <main>
          <TeamSection />
          <TeamSection />
        </main>
    </>
  )
}

export default App;
