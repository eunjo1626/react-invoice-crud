import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/logo.png"; // 로고 추가

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* 로고 영역 */}
      <div className="sidebar-logo">
        <img src={logo} alt="ST Logo" className="logo-img" />

        <div className="logo-text">
          <span className="main-title">SlipNTax</span>
          <span className="sub-title">Manager</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Home
        </NavLink>

        <div className="menu-section">거래명세서</div>

        <NavLink
          to="/slips"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          조회
        </NavLink>

        <NavLink
          to="/slips/create"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          작성
        </NavLink>

        <div className="menu-section">세금계산서</div>

        <NavLink
          to="/tax"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          조회
        </NavLink>

        <NavLink
          to="/tax/create"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          작성
        </NavLink>
      </nav>
    </div>
  );
}
