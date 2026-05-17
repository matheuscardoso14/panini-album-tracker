import styles from "./App.module.scss";
import { useAtomValue } from "jotai";
import Header from "./Components/Header/Header";
import { stickersAtom } from "./state/stickersState";
import TeamSection from "./Components/TeamSection/TeamSection";
import Sticker from "./Components/Sticker/Sticker";
import { searchTermAtom } from "./state/searchTermState";
import SearchField from "./Components/SearchField/SearchField";
import Fuse from "fuse.js/basic";
import RadioButton from "./Components/RadioButton/RadioButton";
import { useMemo, useState } from "react";
import { ownedStickersAtom } from "./state/ownedStickersState";
import Footer from "./Components/Footer/Footer";
import Filter from "./enums/Filter";
import SortOrder from "./enums/SortOrder";
import StatBlock from "./Components/StatBlock/StatBlock";

/**
 * App Component
 * The main entry point for the Panini Album Tracker.
 * Handles global state retrieval, filtering, sorting, searching, and rendering of the sticker grid.
 */
function App() {
  // Global state values (managed via Jotai)
  const stickers = useAtomValue(stickersAtom);
  const ownedStickers = useAtomValue(ownedStickersAtom);
  // Retrieve a unique set of teams present in the album for structural rendering
  // The Set naturally filters out duplicate team names from the parsed data array
  const teams = useMemo(() => new Set(stickers.map((sticker) => sticker.team)), [stickers]);
  // Retrieves the current text the user typed into the search bar
  const searchTerm = useAtomValue(searchTermAtom);

  // --- Statistics Calculations ---
  
  // Calculate overall album progress (e.g., "250/991 (25%)")
  const progress = `${ownedStickers.length}/${stickers.length} (${Number((ownedStickers.length / stickers.length).toFixed(2)) * 100}%)`;
  // Calculate the total number of duplicate stickers available for trading
  const totalDuplicates = useMemo(() => ownedStickers.filter((sticker) => sticker.count > 1).reduce((acc, sticker) => acc + (sticker.count - 1), 0), [ownedStickers]);
  // Identify the single sticker the user has the most duplicates of
  const mostDuplicatedSticker = useMemo(() => {
    const mostDuplicated = ownedStickers.reduce((acc, sticker) => sticker.count > acc.count ? sticker : acc, { id: "", count: 0 })
    const name  = stickers.find((sticker) => sticker.id === mostDuplicated.id)?.name

    if (mostDuplicated.count > 0)  return { name, count: mostDuplicated.count }
    return { name: "None", count: 0 }
  }, [ownedStickers, stickers]);
  // Calculate how many teams have all their stickers collected
  const completedTeams = useMemo(() => {
    return `${[...teams].filter((team) => {
      const teamStickers = stickers.filter((sticker) => sticker.team === team);
      const ownedCount = ownedStickers.filter((sticker) => teamStickers.map((sticker) => sticker.id).includes(sticker.id)).length;
      return ownedCount === teamStickers.length;
    }).length}/${teams.size}`;
  }, [teams, stickers, ownedStickers]);

  // --- Filtering and Sorting ---

  // Local state for tracking which filter and sort radio buttons are currently active
  const [activeFilter, setActiveFilter] = useState(Filter.ALL);
  const [activeSort, setActiveSort] = useState(SortOrder.DEFAULT);
  
  // Apply filtering and sorting logic, memoized for performance
  const filteredStickers = useMemo(() => {
    // Map used for O(1) lookups of owned sticker counts
    const ownedStickersMap = new Map(ownedStickers.map((sticker) => [sticker.id, sticker.count]));

    const filtered = stickers.filter(((sticker) => {
      const ownedCount = ownedStickersMap.get(sticker.id) || 0;

      // Apply mutually exclusive view filters
      if (activeFilter === Filter.DUPLICATES) return ownedCount > 1;
      if (activeFilter === Filter.OWNED) return ownedCount > 0;
      if (activeFilter === Filter.NOT_OWNED) return ownedCount === 0;
      // Fallback: if 'DEFAULT' is selected, include all stickers
      return true
    }))

    // Apply sorting conditionally based on the active selection
    if (activeSort === SortOrder.ASCENDING) filtered.sort((a, b) => {
      const aCount = ownedStickersMap.get(a.id) || 0;
      const bCount = ownedStickersMap.get(b.id) || 0;
      return bCount - aCount;
    })
    if (activeSort === SortOrder.DESCENDING) filtered.sort((a, b) => {
      const aCount = ownedStickersMap.get(a.id) || 0;
      const bCount = ownedStickersMap.get(b.id) || 0;
      return aCount - bCount;
    })

    return filtered;
  }, [stickers, ownedStickers, activeFilter, activeSort])


  // --- Fuzzy Search ---

  // Initialize Fuse.js for fuzzy text searching
  const stickersFuse = useMemo(() => new Fuse(filteredStickers, {
    keys: ["name", "team", "number"], // Defines the properties Fuse should look into
    threshold: 0.3, // A lower threshold means the match needs to be more exact (0.0 is perfect, 1.0 matches anything)
    ignoreDiacritics: true, // Enables matching characters with accents (e.g. 'e' matches 'é')
    findAllMatches: true,
    minMatchCharLength: 2, // The user must input at least 2 characters to trigger fuzzy results
    distance: 70, // Defines how far the search term can be from the string's start
    // Keeps the internal results sorted by sticker number ascending by default
    sortFn: (a, b) => Number(a.item.number) - Number(b.item.number)
  }), [filteredStickers]);

  // Perform fuzzy search if a term exists, otherwise return the filtered array
  const searchedStickers = useMemo(() => {
    if (!searchTerm) return filteredStickers;
    return stickersFuse.search(searchTerm).map((result) => result.item);
  }, [filteredStickers, searchTerm, stickersFuse])
  
  
  return (
    <>
      <Header />
      <main>
        <div className={styles.stats__container}>
          <StatBlock title="Progress" value={progress} color="#006ECF" />
          <StatBlock title="Completed teams" value={completedTeams} color="#9151B8" />
          <StatBlock title="Duplicates" value={totalDuplicates} color="#F24F4F" />
          <StatBlock title="Most duplicated" value={`${mostDuplicatedSticker.name} ${mostDuplicatedSticker.count > 0 ? `(${mostDuplicatedSticker.count}x)` : ""}`} color="#EEB72B" />
        </div>
        {/* UI controls container for search, filtering, and sorting */}
        <div className={styles.controls__container}>
          <SearchField placeholder="Search stickers" />
          <div>
            <span>Filters:</span>
            <RadioButton
              func={() => setActiveFilter(Filter.ALL)}
              checked={activeFilter === Filter.ALL}
              text="Default"
            />
            <RadioButton
              func={() => setActiveFilter(Filter.OWNED)}
              checked={activeFilter === Filter.OWNED}
              text="Owned"
            />
            <RadioButton
              func={() => setActiveFilter(Filter.NOT_OWNED)}
              checked={activeFilter === Filter.NOT_OWNED}
              text="Not owned"
            />
            <RadioButton
              func={() => setActiveFilter(Filter.DUPLICATES)}
              checked={activeFilter === Filter.DUPLICATES}
              text="Duplicates"
            />
          </div>
          <div>
            <span>Order:</span>
              <RadioButton 
                func={() => setActiveSort(SortOrder.DEFAULT)}
                checked={activeSort === SortOrder.DEFAULT}
                text="Default"
              />
              <RadioButton 
                func={() => setActiveSort(SortOrder.ASCENDING)}
                checked={activeSort === SortOrder.ASCENDING}
                text="Ascending"
              />
              <RadioButton 
                func={() => setActiveSort(SortOrder.DESCENDING)}
                checked={activeSort === SortOrder.DESCENDING}
                text="Descending"
              />
          </div>
        </div>
        {searchedStickers.length === 0 ?
          // Empty state displayed when search/filters yield zero results
          <span className={styles.no_stickers_found__text}>No stickers found.</span>
          : [...teams].map((team) => {
          // Render a dedicated section per team
          const teamStickers = searchedStickers.filter((sticker) => sticker.team === team);
          if (teamStickers.length === 0) {
            // If the team has no stickers matching the active search or filters, do not render its section wrapper
            return null;
          }
          return (
            <TeamSection team={team} key={team}>
              <>
                {teamStickers.map((sticker) => {
                  // Determine short team code, applying specific logic for Coca-Cola (CC) stickers
                  // Non-special stickers use their first 3 characters (e.g., 'BRA', 'CAN'). Otherwise, default to 'FWC'
                  let shortTeam = sticker.id.slice(0, 3) !== "00" ? sticker.id.slice(0, 3) : "FWC";
                  // Regex specifically to identify Panini's unique Coca-Cola promotional stickers (e.g., 'C1' to 'C14')
                  const cocaMatch = /^C{2}[0-9]{1,2}$/
                  if (shortTeam.match(cocaMatch)) {
                    shortTeam = "CC"
                  }
                  return (
                    <Sticker
                      name={sticker.name}
                      number={sticker.number ?? "00"}
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
      <Footer />
    </>
  )
}

export default App;
