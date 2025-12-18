import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TaxCreate.css";

type TaxItem = {
  name: string;
  qty: number;
  price: number;
};

export default function TaxCreate() {
  const navigate = useNavigate();

  // 공급받는자 정보
  const [customerName, setCustomerName] = useState("");
  const [customerCEO, setCustomerCEO] = useState("");
  const [customerBizNumber, setCustomerBizNumber] = useState("");
  const [customerType, setCustomerType] = useState("");  // 업태
  const [customerItem, setCustomerItem] = useState("");  // 종목
  const [customerEmail, setCustomerEmail] = useState(""); // 이메일
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // 날짜
  const [writeDate, setWriteDate] = useState("");
  const [confirmDate, setConfirmDate] = useState("");

  // 품목 리스트
  const [items, setItems] = useState<TaxItem[]>([
    { name: "", qty: 0, price: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { name: "", qty: 0, price: 0 }]);
  };

  const removeItem = (i: number) => {
    setItems(items.filter((_, idx) => idx !== i));
  };

  const changeItem = (i: number, field: keyof TaxItem, value: string) => {
    const newList: TaxItem[] = [...items];

    if (field === "name") newList[i].name = value;
    else if (field === "qty") newList[i].qty = Number(value);
    else if (field === "price") newList[i].price = Number(value);

    setItems(newList);
  };

  const save = () => {
    const totalSupply = items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );

    const totalTax = Math.floor(totalSupply * 0.1);
    const totalAmount = totalSupply + totalTax;

    const newTax = {
      id: "TAX-" + Date.now(),

      customerName,
      customerCEO,
      customerBizNumber,
      customerType,
      customerItem,
      customerEmail,
      customerPhone,
      customerAddress,

      writeDate,
      confirmDate,

      items,
      totalSupply,
      totalTax,
      totalAmount
    };

    const saved = JSON.parse(localStorage.getItem("taxes") || "[]");
    saved.push(newTax);
    localStorage.setItem("taxes", JSON.stringify(saved));

    alert("세금계산서가 저장되었습니다.");
    navigate("/tax");
  };

  return (
    <div className="page-container">
      <h1 className="section-title">전자세금계산서 작성</h1>

      <div className="form-section">
        <h2>공급받는자 정보</h2>

        <label>상호(거래처명)</label>
        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

        <label>대표자명</label>
        <input value={customerCEO} onChange={(e) => setCustomerCEO(e.target.value)} />

        <label>사업자번호</label>
        <input value={customerBizNumber} onChange={(e) => setCustomerBizNumber(e.target.value)} />

        <label>업태</label>
        <input value={customerType} onChange={(e) => setCustomerType(e.target.value)} />

        <label>종목</label>
        <input value={customerItem} onChange={(e) => setCustomerItem(e.target.value)} />

        <label>이메일</label>
        <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />

        <label>전화번호</label>
        <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />

        <label>주소</label>
        <input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />

        <label>작성일</label>
        <input type="date" value={writeDate} onChange={(e) => setWriteDate(e.target.value)} />

        <label>발행일</label>
        <input type="date" value={confirmDate} onChange={(e) => setConfirmDate(e.target.value)} />
      </div>

      {/* 품목 */}
      <div className="form-section">
        <h2>품목 정보</h2>

        <table className="item-table">
  <thead>
    <tr>
      <th>품명</th>
      <th>수량</th>
      <th>단가</th>
      <th>공급가액</th>
      <th>세액</th>
      <th>총액</th>
      <th></th>
    </tr>
  </thead>
      <tbody>
  {items.map((item, idx) => {
    const supply = item.qty * item.price;
    const tax = Math.floor(supply * 0.1);
    const total = supply + tax;

    return (
      <tr key={idx}>
        <td>
          <input
            value={item.name}
            onChange={(e) => changeItem(idx, "name", e.target.value)}
          />
        </td>

        <td className={item.qty < 0 ? "negative" : ""}>
          <input
            type="number"
            value={item.qty}
            onChange={(e) => changeItem(idx, "qty", e.target.value)}
          />
        </td>

        <td className={item.price < 0 ? "negative" : ""}>
          <input
            type="number"
            value={item.price}
            onChange={(e) => changeItem(idx, "price", e.target.value)}
          />
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

        <td>
          <button onClick={() => removeItem(idx)}>삭제</button>
        </td>
      </tr>
    );
  })}
</tbody>
        
        </table>

        <button className="btn" onClick={addItem}>+ 품목 추가</button>
      </div>

      <div className="btn-row">
        <button className="btn btn-primary" onClick={save}>저장</button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>취소</button>
      </div>
    </div>
  );
}
