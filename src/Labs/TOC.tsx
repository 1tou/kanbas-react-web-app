import { useLocation } from "react-router";
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a" href="#/Labs" className="nav-link">
          Labs
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a1" href="#/Labs/Lab1"
          className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>
          Lab 1
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a2" href="#/Labs/Lab2"
          className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>
          Lab 2
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a3" href="#/Labs/Lab3"
          className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>
          Lab 3
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a4" href="#/Labs/Lab4"
          className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>
          Lab 4
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a5" href="#/Labs/Lab5"
          className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>
          Lab 5
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-kanbas" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-github" href="https://github.com/1tou" className="nav-link">
          My GitHub
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-client" href="https://github.com/1tou/kanbas-react-web-app.git" className="nav-link">
          kanbas-react-web-app.git
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-server" href="https://github.com/1tou/kanbas-node-server-app.git" className="nav-link">
          kanbas-node-server-app.git
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-remote-server" href="https://kanbas-node-server-app-mongodb-vl38.onrender.com" className="nav-link">
          Remote Server Url
        </a>
      </li>
    </ul>
  );
}
