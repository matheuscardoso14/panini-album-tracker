import { useAtomValue } from "jotai";
import "./App.scss";
import Header from "./Components/Header/Header";
import { stickersAtom } from "./state/stickersState";
import TeamSection from "./Components/TeamSection/TeamSection";
import Sticker from "./Components/Sticker/Sticker";

function App() {
  const stickers = useAtomValue(stickersAtom);
  const teams = new Set(stickers.map((sticker) => sticker.team))

  return (
    <>
      <Header />
      <main>
        {[...teams].map((team) => {
          const teamStickers = stickers.filter((sticker) => sticker.team === team);
          return (
            <TeamSection team={team} key={team}>
              <>
                {teamStickers.map((sticker) => {
                  let shortTeam = sticker.id.slice(0, 3) !== "00" ? sticker.id.slice(0, 3) : "FWC";
                  const cocaMatch = /^C{2}[0-9]{1,2}$/
                  if (shortTeam.match(cocaMatch)) {
                    shortTeam = "CC"
                  }
                  return (
                    <Sticker number={sticker.number ?? "00"}
                             team={shortTeam}
                             id={sticker.id}
                             key={sticker.id} />
                  )
                })}
              </>
            </TeamSection>
          )
        })}
      </main>
    </>
  )
}

export default App;
