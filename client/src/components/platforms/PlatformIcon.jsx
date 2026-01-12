import XboxIcon from "./XboxIcon.jsx";
import SteamIcon from "./SteamIcon.jsx";
import PlayStationIcon from "./PlayStationIcon.jsx";
import NintendoIcon from "./NintendoIcon.jsx";

export default function PlatformIcon({ platform, size = 16, className = "" }) {
  switch (platform?.toUpperCase()) {
    case "XBOX":
      return <XboxIcon size={size} className={className} />;
    case "PC":
      return <SteamIcon size={size} className={className} />;
    case "PLAYSTATION":
      return <PlayStationIcon size={size} className={className} />;
    case "NINTENDO":
      return <NintendoIcon size={size} className={className} />;
    default:
      return null;
  }
}
