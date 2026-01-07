import Header from "./components/header/Header";

export default function App() {
    return (
        <div className="min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-8 text-white">
                <h1 className="text-2xl font-semibold">
                    Some text goes here
                </h1>
            </main>
        </div>
    );
}