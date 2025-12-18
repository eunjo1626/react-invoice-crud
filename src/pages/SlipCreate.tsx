import { useState } from "react";
import "./SlipCreate.css";

export default function SlipCreate() {
  // 거래처 정보
  const [customerName, setCustomerName] = useState("");
  const [customerCEO, setCustomerCEO] = useState("");
  const [customerBizNumber, setCustomerBizNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // 날짜
  const [writeDate, setWriteDate] = useState("");
  const [confirmDate, setConfirmDate] = useState("");

  // 품목 리스트
  const [items, setItems] = useState([{ name: "", qty: 0, price: 0 }]);

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: 0, price: 0 }]);
  };

  const deleteItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  // 합계 계산
  const totalSupply = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const totalTax = Math.floor(totalSupply * 0.1);
  const totalAmount = totalSupply + totalTax;

  // 저장
  const saveSlip = () => {
    if (!customerName || !writeDate) {
      alert("거래처명과 작성일은 필수입니다.");
      return;
    }

    const slip = {
      id: `SLIP-${Date.now()}`,

      // 거래처 정보
      company: customerName,
      customerName,
      customerCEO,
      customerBizNumber,
      customerAddress,
      customerPhone,

      // 날짜
      writeDate,
      confirmDate,

      // 품목 / 합계
      items,
      totalSupply,
      totalTax,
      totalAmount
    };

    const saved = JSON.parse(localStorage.getItem("slips") || "[]");
    saved.push(slip);
    localStorage.setItem("slips", JSON.stringify(saved));

    alert("거래명세서가 저장되었습니다.");
  };

  return (
    <div className="page-container">
      <h1 className="section-title">거래명세서 작성</h1>

      {/* 거래처 정보 박스 */}
      <div className="box">
        <h2 className="box-title">거래처 정보</h2>

        <div className="form-row">
          <label>거래처명 *</label>
          <input className="input" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>

        <div className="form-row">
          <label>대표자명</label>
          <input className="input" value={customerCEO} onChange={(e) => setCustomerCEO(e.target.value)} />
        </div>

        <div className="form-row">
          <label>사업자등록번호</label>
          <input className="input" value={customerBizNumber} onChange={(e) => setCustomerBizNumber(e.target.value)} placeholder="123-45-67890" />
        </div>

        <div className="form-row">
          <label>주소</label>
          <input className="input" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
        </div>

        <div className="form-row">
          <label>전화번호</label>
          <input className="input" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
        </div>

        <div className="form-row">
          <label>작성일 *</label>
          <input type="date" className="input" value={writeDate} onChange={(e) => setWriteDate(e.target.value)} />
        </div>

        <div className="form-row">
          <label>확정일</label>
          <input type="date" className="input" value={confirmDate} onChange={(e) => setConfirmDate(e.target.value)} />
        </div>
      </div>

      {/* 품목 입력 */}
      <div className="box">
        <h2 className="box-title">품목 입력</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>품목명</th>
              <th>수량</th>
              <th>단가</th>
              <th>공급가액</th>
              <th>세액</th>
              <th></th>
            </tr>
          </thead>
            <tbody>
  {items.map((item, idx) => {
    const supply = item.qty * item.price;
    const tax = Math.floor(supply * 0.1);

    return (
      <tr key={idx}>
        <td>
          <input 
            className="input"
            value={item.name}
            onChange={(e) => updateItem(idx, "name", e.target.value)}
          />
        </td>

        <td>
          <input
            type="number"
            className={`input ${item.qty < 0 ? "negative" : ""}`}
            value={item.qty}
            onChange={(e) => updateItem(idx, "qty", Number(e.target.value))}
          />
        </td>

        <td>
          <input
            type="number"
            className={`input ${item.price < 0 ? "negative" : ""}`}
            value={item.price}
            onChange={(e) => updateItem(idx, "price", Number(e.target.value))}
          />
        </td>

        <td className={supply < 0 ? "negative" : ""}>
          {supply.toLocaleString()}
        </td>

        <td className={tax < 0 ? "negative" : ""}>
          {tax.toLocaleString()}
        </td>

        <td>
          <button className="btn-danger" onClick={() => deleteItem(idx)}>
            삭제
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

         
          
        </table>

        <button className="btn btn-secondary" onClick={addItem}>+ 품목 추가</button>
      </div>

      {/* 합계 */}
      <div className="box">
        <h2 className="box-title">합계</h2>
        <div className="total-row">
  <span>공급가액 합계</span>
  <strong className={totalSupply < 0 ? "negative" : ""}>
    {totalSupply.toLocaleString()}
  </strong>
</div>

<div className="total-row">
  <span>세액 합계</span>
  <strong className={totalTax < 0 ? "negative" : ""}>
    {totalTax.toLocaleString()}
  </strong>
</div>

<div className="total-row">
  <span>총 합계금액</span>
  <strong className={totalAmount < 0 ? "negative" : ""}>
    {totalAmount.toLocaleString()}
  </strong>
</div>
      </div>

      <button className="btn save-btn" onClick={saveSlip}>저장하기</button>
    </div>
  );
}
