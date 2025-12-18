import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SlipDetail.css";

export default function SlipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [slip, setSlip] = useState<any | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("slips") || "[]");
    const found = saved.find((item: any) => item.id === id);
    setSlip(found || null);
  }, [id]);

  const deleteSlip = () => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    const saved = JSON.parse(localStorage.getItem("slips") || "[]");
    const newList = saved.filter((item: any) => item.id !== id);
    localStorage.setItem("slips", JSON.stringify(newList));

    alert("삭제되었습니다.");
    navigate("/slips");
  };

  // 계산서 발행
  const publishTax = () => {
    if (!window.confirm("이 명세서로 세금계산서를 발행하시겠습니까?")) return;

    const taxId = `TAX-${Date.now()}`;

    // Slip 구조에 맞춰 변환
    const newTax = {
      id: taxId,
       company: slip.customerName, 
      customerName: slip.customerName,
      customerCEO: slip.customerCEO,
      customerBizNumber: slip.customerBizNumber,
      customerAddress: slip.customerAddress,
      customerPhone: slip.customerPhone,

      writeDate: slip.writeDate,
      confirmDate: slip.confirmDate,

      items: slip.items,
      totalSupply: slip.totalSupply,
      totalTax: slip.totalTax,
      totalAmount: slip.totalAmount,

      fromSlipId: slip.id
    };

    const saved = JSON.parse(localStorage.getItem("taxes") || "[]");
    saved.push(newTax);
    localStorage.setItem("taxes", JSON.stringify(saved));

    alert("세금계산서가 발행되었습니다.");
    navigate(`/tax/${taxId}`);
  };

  if (!slip) {
    return (
      <div className="page-container">
        <p>해당 문서를 찾을 수 없습니다.</p>
        <button className="btn" onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="section-title">거래명세서 상세</h1>

      <div className="section-box">
        <h2 className="box-title">거래처 정보</h2>
        <p><strong>거래처명:</strong> {slip.customerName}</p>
        <p><strong>대표자명:</strong> {slip.customerCEO || "-"}</p>
        <p><strong>사업자등록번호:</strong> {slip.customerBizNumber || "-"}</p>
        <p><strong>주소:</strong> {slip.customerAddress || "-"}</p>
        <p><strong>전화번호:</strong> {slip.customerPhone || "-"}</p>
        <p><strong>작성일:</strong> {slip.writeDate}</p>
        <p><strong>확정일:</strong> {slip.confirmDate || "-"}</p>
      </div>

      <div className="section-box">
        <h2 className="box-title">품목 리스트</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>품목명</th>
              <th>수량</th>
              <th>단가</th>
              <th>공급가액</th>
              <th>세액</th>
              <th>총액</th>
            </tr>
          </thead>

          <tbody>
  {slip.items.map((item: any, idx: number) => {
    const supply = item.qty * item.price;
    const tax = Math.floor(supply * 0.1);
    const total = supply + tax;

    return (
      <tr key={idx}>
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

        <td className={tax < 0 ? "negative" : ""}>
          {tax.toLocaleString()}
        </td>

        <td className={total < 0 ? "negative" : ""}>
          {total.toLocaleString()}
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>

      <div className="section-box">
  <h2 className="box-title">합계</h2>

  <p>
    <strong>공급가액:</strong>{" "}
    <span className={slip.totalSupply < 0 ? "negative" : ""}>
      {slip.totalSupply.toLocaleString()}
    </span>
  </p>

  <p>
    <strong>세액:</strong>{" "}
    <span className={slip.totalTax < 0 ? "negative" : ""}>
      {slip.totalTax.toLocaleString()}
    </span>
  </p>

  <p>
    <strong>총 합계금액:</strong>{" "}
    <span className={slip.totalAmount < 0 ? "negative" : ""}>
      {slip.totalAmount.toLocaleString()}
    </span>
  </p>
</div>

      {/* 버튼 영역 */}
      <div className="button-row">
        <button className="btn" onClick={() => navigate(`/slips/${id}/print`)}>
          📄 문서형으로 보기
        </button>

        <button className="btn btn-secondary" onClick={() => navigate(`/slips/${id}/edit`)}>
          ✏ 수정하기
        </button>

        <button className="btn btn-danger" onClick={deleteSlip}>
          🗑 삭제하기
        </button>

        <button className="btn" onClick={publishTax}>
          📑 세금계산서 발행
        </button>

        <button className="btn btn-back" onClick={() => navigate(-1)}>
          ← 뒤로가기
        </button>
      </div>
    </div>
  );
}
