import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Content from "./Components/Home/Content";
import ViewMorePage from "./page/ViewMore/ViewMorePage";
import DetailsMovie from "./page/Details/Details";
import Search from "./page/Search/Search";
import SearchResults from "./page/Search/SearchResults";
import WatchTv from "./Components/Watch/Watch";
import WatchMovie from "./Components/Watch/WatchMovie";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results/:keyword" element={<SearchResults />} />
          <Route path="/:media_type/:type" element={<ViewMorePage />} />
          <Route path="/details/:media_type/:id" element={<DetailsMovie />} />
          <Route path="/watch/tv/:id" element={<WatchTv />} />
          <Route path="/watch/movie/:id" element={<WatchMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
