import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [slips, setSlips] = useState<any[]>([]);
  const [taxes, setTaxes] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  // 1) 거래명세서 / 세금계산서 / 합계 계산
  useEffect(() => {
    const slipData = JSON.parse(localStorage.getItem("slips") || "[]");
    const taxData = JSON.parse(localStorage.getItem("taxes") || "[]");

    setSlips(slipData);
    setTaxes(taxData);

    const slipSum = slipData.reduce(
      (acc: number, s: any) => acc + (s.totalAmount || 0),
      0
    );
    const taxSum = taxData.reduce(
      (acc: number, t: any) => acc + (t.totalAmount || 0),
      0
    );
    setTotalAmount(slipSum + taxSum);
  }, []);

  // 2) 방문자수 (새로고침할 때마다 +1)
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const visitData = JSON.parse(localStorage.getItem("visitorCount") || "{}");

    const newCount = (visitData.count || 0) + 1;
    const updated = { date: today, count: newCount };

    setVisitorCount(newCount);
    localStorage.setItem("visitorCount", JSON.stringify(updated));
  }, []);

  return (
    <div className="page-container">
      <h1 className="home-title section-title">문서 관리 시스템</h1>

      {/* 카드 영역 */}
      <div className="card-row">
        <div className="card home-card">
          <h3>총 거래금액</h3>
          <p
  className={
    totalAmount < 0 ? "card-value-negative" : "card-value-positive"
  }
>
  ₩ {totalAmount.toLocaleString()}
</p>
        </div>

        <div className="card home-card">
          <h3>거래명세서 수</h3>
          <p className="card-value">{slips.length}건</p>
        </div>

        <div className="card home-card">
          <h3>세금계산서 수</h3>
          <p className="card-value">{taxes.length}건</p>
        </div>

        <div className="card home-card">
          <h3>방문자 수</h3>
          <p className="card-value">{visitorCount}명</p>
        </div>
      </div>

      {/* 최근 거래명세서 */}
      <div className="section-box">
        <h2 className="section-subtitle">최근 등록된 거래명세서 5건</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>거래처</th>
              <th>작성일자</th>
              <th>확정일자</th>
              <th>합계금액</th>
            </tr>
          </thead>

          <tbody>
            {slips
              .slice(-5)
              .reverse()
              .map((s) => (
                <tr
                  key={s.id}
                  onClick={() => navigate(`/slips/${s.id}`)}
                  className="row-link"
                >
                  <td>{s.id}</td>
                  <td>{s.company}</td>
                  <td>{s.writeDate}</td>
                  <td>{s.confirmDate || "-"}</td>
                  <td
  className={
    s.totalAmount < 0 ? "amount-negative" : "amount-positive"
  }
>
  ₩ {s.totalAmount?.toLocaleString()}
</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 최근 세금계산서 */}
      <div className="section-box">
        <h2 className="section-subtitle">최근 세금계산서 5건</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>거래처</th>
              <th>작성일자</th>
              <th>확정일자</th>
              <th>합계금액</th>
            </tr>
          </thead>

          <tbody>
            {taxes
              .slice(-5)
              .reverse()
              .map((t) => (
                <tr
                  key={t.id}
                  onClick={() => navigate(`/tax/${t.id}`)}
                  className="row-link"
                >
                  <td>{t.id}</td>
                  <td>{t.company}</td>
                  <td>{t.writeDate}</td>
                  <td>{t.confirmDate || "-"}</td>
                  <td
  className={
    t.totalAmount < 0 ? "amount-negative" : "amount-positive"
  }
>
  ₩ {t.totalAmount?.toLocaleString()}
</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
