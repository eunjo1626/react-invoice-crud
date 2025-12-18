import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MY_COMPANY } from "../constants/company";
import "./TaxPrint.css";

export default function TaxPrint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tax, setTax] = useState<any | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taxes") || "[]");
    const found = saved.find((item: any) => item.id === id);
    setTax(found || null);
  }, [id]);

  if (!tax) return <div className="print-wrapper">문서를 불러올 수 없습니다.</div>;

  return (
    <div className="print-wrapper">
      <div className="korean-tax">

        {/* 상단 헤더 */}
        <div className="tax-top-bar">
          <div className="tax-number">
            세금계산서 번호: <span>{tax.id}</span>
          </div>
          <div className="tax-title">전자세금계산서</div>
          <div className="tax-date">
            작성일: <span>{tax.writeDate}</span>
          </div>
        </div>

        {/* 공급자 / 공급받는자 */}
        <div className="tax-party-box">

          {/* 공급자 */}
          <div className="party-column">
            <div className="party-row header">공급자</div>
            <div className="party-row"><span className="label">사업자번호</span><span className="value">{MY_COMPANY.bizNumber}</span></div>
            <div className="party-row"><span className="label">상호</span><span className="value">{MY_COMPANY.name}</span></div>
            <div className="party-row"><span className="label">대표자명</span><span className="value">{MY_COMPANY.ceo}</span></div>
            <div className="party-row"><span className="label">업태</span><span className="value">{MY_COMPANY.type}</span></div>
            <div className="party-row"><span className="label">종목</span><span className="value">{MY_COMPANY.item}</span></div>
            <div className="party-row"><span className="label">주소</span><span className="value">{MY_COMPANY.address}</span></div>
            <div className="party-row"><span className="label">전화</span><span className="value">{MY_COMPANY.phone}</span></div>
          </div>

          {/* 로고 / 도장 */}
          <div className="stamp-area">
            {MY_COMPANY.logo && (
              <img src={MY_COMPANY.logo} className="tax-logo" alt="company logo" />
            )}
            <div className="tax-stamp">SlipNTax</div>
          </div>

          {/* 공급받는자 */}
          <div className="party-column">
            <div className="party-row header">공급받는자</div>
            <div className="party-row"><span className="label">사업자번호</span><span className="value">{tax.customerBizNumber || "-"}</span></div>
            <div className="party-row"><span className="label">상호</span><span className="value">{tax.customerName}</span></div>
            <div className="party-row"><span className="label">대표자명</span><span className="value">{tax.customerCEO || "-"}</span></div>
            <div className="party-row"><span className="label">업태</span><span className="value">{tax.customerType || "-"}</span></div>
            <div className="party-row"><span className="label">종목</span><span className="value">{tax.customerItem || "-"}</span></div>
            <div className="party-row"><span className="label">주소</span><span className="value">{tax.customerAddress || "-"}</span></div>
            <div className="party-row"><span className="label">전화</span><span className="value">{tax.customerPhone || "-"}</span></div>
          </div>
        </div>

        {/* 총금액 */}
        <div className="tax-total-bar">
          총금액(공급가액 + 세액):{" "}
          <span className={tax.totalAmount < 0 ? "negative" : ""}>
            {tax.totalAmount.toLocaleString()}
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
      <th>총액</th>
    </tr>
  </thead>
  <tbody>
  {(tax.items as any[]).map((item, idx) => {
    const supply = item.qty * item.price;
    const taxAmount = Math.floor(supply * 0.1);
    const total = supply + taxAmount;

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

        <td className={total < 0 ? "negative" : ""}>
          {total.toLocaleString()}
        </td>
      </tr>
    );
  })}
</tbody>



 
</table>

        {/* 인수자 / 결재 */}
        <div className="tax-footer">
          <div className="sign-row">
            <div className="sign-cell">작성</div>
            <div className="sign-cell">검토</div>
            <div className="sign-cell">승인</div>
          </div>
          <div className="memo-box">MEMO</div>
        </div>

        {/* 버튼 */}
        <div className="no-print tax-btn-row">
          <button className="btn" onClick={() => window.print()}>🖨 인쇄</button>
          <button className="btn btn-back" onClick={() => navigate(`/tax/${id}`)}>← 돌아가기</button>
        </div>
      </div>
    </div>
  );
}
