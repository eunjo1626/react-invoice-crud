type TaxData = {
  id: string;
  customerName: string;
  customerCEO: string;
  customerBizNumber: string;
  customerPhone: string;
  customerAddress: string;
  writeDate: string;
  confirmDate: string;
  items: {
    name: string;
    qty: number;
    price: number;
  }[];
  totalSupply: number;
  totalTax: number;
  totalAmount: number;
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TaxList.css";

export default function TaxList() {
  const navigate = useNavigate();
  const [list, setList] = useState<TaxData[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taxes") || "[]");
    setList(saved);
  }, []);

  return (
    <div className="page-container">
      <h1 className="section-title">세금계산서 조회</h1>

      <div className="list-wrapper">
        <table className="list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>공급받는자명</th>
              <th>작성일</th>
              <th>총 금액</th>
              <th>상세</th>
            </tr>
          </thead>

          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-msg">
                  저장된 세금계산서가 없습니다.
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
                    onClick={() => navigate(`/tax/${item.id}`)}
                  >
                    보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
