import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <div className="min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-8 text-white">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list" element={<SearchResults />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}