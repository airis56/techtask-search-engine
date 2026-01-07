import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Language from "./Language";
import UserActions from "./UserActions";

export default function Header() {
    return (
        <header className="w-full text-white flex justify-center">
            <div className="w-full max-w-300 flex items-center justify-start gap-5 mt-5 mb-5">
                <Logo/>
                <SearchBar/>
                <Language/>
                <div className="flex items-center gap-6 ml-auto shrink-0">
                    <UserActions/>
                </div>
            </div>
        </header>
    );
}