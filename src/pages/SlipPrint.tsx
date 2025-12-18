import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MY_COMPANY } from "../constants/company";
import "./SlipPrint.css";

export default function SlipPrint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slip, setSlip] = useState<any | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("slips") || "[]");
    const found = saved.find((item: any) => item.id === id);
    setSlip(found || null);
  }, [id]);

  if (!slip) return <div className="print-wrapper">문서를 불러올 수 없습니다.</div>;

  return (
    <div className="print-wrapper">
      <div className="korean-slip">

        {/* 상단 */}
        <div className="tax-top-bar">
          <div className="tax-number">
            거래명세서 번호: <span>{slip.id}</span>
          </div>
          <div className="tax-title">거래명세서</div>
          <div className="tax-date">
            작성일: <span>{slip.writeDate}</span>
          </div>
        </div>

        {/* 공급자 / 공급받는자 */}
        <div className="tax-party-box">

          {/* 공급자 */}
          <div className="party-column">
            <div className="party-row header">공급자</div>

            <div className="party-row">
              <span className="label">등록번호</span>
              <span className="value">{MY_COMPANY.bizNumber}</span>
            </div>

            <div className="party-row">
              <span className="label">상호</span>
              <span className="value">{MY_COMPANY.name}</span>
            </div>

            <div className="party-row">
              <span className="label">성명</span>
              <span className="value">{MY_COMPANY.ceo}</span>
            </div>

            <div className="party-row">
              <span className="label">주소</span>
              <span className="value">{MY_COMPANY.address}</span>
            </div>

            <div className="party-row">
              <span className="label">전화</span>
              <span className="value">{MY_COMPANY.phone}</span>
            </div>
          </div>

          {/* 로고 */}
          <div className="stamp-area">
            {MY_COMPANY.logo && (
              <img src={MY_COMPANY.logo} className="tax-logo" alt="company logo" />
            )}
            <div className="tax-stamp">SlipNTax</div>
          </div>

          {/* 공급받는자 */}
          <div className="party-column">
            <div className="party-row header">공급받는자</div>

            <div className="party-row">
              <span className="label">등록번호</span>
              <span className="value">{slip.customerBizNumber || "-"}</span>
            </div>

            <div className="party-row">
              <span className="label">상호</span>
              <span className="value">{slip.customerName}</span>
            </div>

            <div className="party-row">
              <span className="label">대표자명</span>
              <span className="value">{slip.customerCEO || "-"}</span>
            </div>

            <div className="party-row">
              <span className="label">주소</span>
              <span className="value">{slip.customerAddress || "-"}</span>
            </div>

            <div className="party-row">
              <span className="label">전화</span>
              <span className="value">{slip.customerPhone || "-"}</span>
            </div>
          </div>
        </div>

        {/* 총금액 */}
        <div className="tax-total-bar">
          총금액(공급가액 + 세액):{" "}
          <span className={slip.totalAmount < 0 ? "negative" : ""}>
            {slip.totalAmount.toLocaleString()}
          </span>
        </div>

        {/* 품목 테이블 */}
        <table className="tax-item-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>품명</th>
              <th>수량</th>
              <th>단가</th>
              <th>공급가액</th>
              <th>세액</th>
            </tr>
          </thead>

          <tbody>
            {slip.items.map((item: any, idx: number) => {
              const supply = item.qty * item.price;
              const taxAmount = Math.floor(supply * 0.1);

              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>

                  <td>{item.name}</td>

                  <td className={item.qty < 0 ? "negative" : ""}>
                    {item.qty}
                  </td>

                  <td className={item.price < 0 ? "negative" : ""}>
                    {item.price.toLocaleString()}
                  </td>

                  <td className={supply < 0 ? "negative" : ""}>
                    {supply.toLocaleString()}
                  </td>

                  <td className={taxAmount < 0 ? "negative" : ""}>
                    {taxAmount.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 서명 */}
        <div className="tax-footer">
          <div className="sign-row">
            <div className="sign-cell">인수자</div>
            <div className="sign-cell">결재</div>
            <div className="sign-cell">계</div>
          </div>
          <div className="memo-box">MEMO</div>
        </div>

        {/* 버튼 */}
        <div className="no-print tax-btn-row">
          <button className="btn" onClick={() => window.print()}>🖨 인쇄</button>
          <button className="btn btn-back" onClick={() => navigate(`/slips/${id}`)}>← 돌아가기</button>
        </div>

      </div>
    </div>
  );
}
