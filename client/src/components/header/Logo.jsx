import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/" className="flex items-center shrink-0">
            <img
                src="/logoFull.svg"
                alt="Eneba"
                className="w-38.75 h-auto block"
            />
        </Link>
    );
}