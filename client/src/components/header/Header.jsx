import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Language from "./Language";
import UserActions from "./UserActions";

export default function Header() {
    return (
        <header className="w-full text-white flex justify-center px-4">
            <div className="w-full max-w-300 flex flex-wrap items-center justify-between gap-5 mt-5 mb-5">
                <div className="order-1">
                    <Logo/>
                </div>

                <div className="order-3 md:order-2 w-full md:w-auto md:flex-1 flex items-center gap-5">
                    <SearchBar/>
                    <div className="hidden md:block">
                        <Language/>
                    </div>
                </div>

                <div className="order-2 md:order-3 shrink-0">
                    <div className="flex items-center gap-6">
                        <UserActions/>
                    </div>
                </div>
            </div>
        </header>
    );
}