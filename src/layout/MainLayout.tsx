import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";   // ← 경로 수정
import "./MainLayout.css";                    // CSS 파일 (선택)

export default function MainLayout() {
  return (
    <div className="layout-container">
      {/* 왼쪽 사이드바 */}
      <Sidebar />

      {/* 오른쪽 메인 콘텐츠 */}
      <main className="layout-content">
        <Outlet />   {/* ← 대문자 수정 */}
      </main>
    </div>
  );
}
