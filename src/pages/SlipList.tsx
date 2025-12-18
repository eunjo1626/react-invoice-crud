import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Slip } from "../types";
import "./SlipList.css";

export default function SlipList() {
  const navigate = useNavigate();
  const [list, setList] = useState<Slip[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("slips") || "[]");
    setList(saved);
  }, []);

  return (
    <div className="page-container">
      <h1 className="section-title">거래명세서 조회</h1>

      <table className="list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>거래처명</th>
            <th>작성일</th>
            <th>총 금액</th>
            <th>상세</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                등록된 명세서가 없습니다.
              </td>
            </tr>
          )}

          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.customerName}</td>
              <td>{item.writeDate}</td>
              <td>{item.totalAmount.toLocaleString()}</td>
              <td>
                <button
                  className="btn-detail"
                  onClick={() => navigate(`/slips/${item.id}`)}
                >
                  보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
