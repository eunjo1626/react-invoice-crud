import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./TaxEdit.css";

export default function TaxEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customerName, setCustomerName] = useState("");
  const [customerCEO, setCustomerCEO] = useState("");
  const [customerBizNumber, setCustomerBizNumber] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // ⭐ 추가 필드 3개
  const [customerType, setCustomerType] = useState("");
  const [customerItem, setCustomerItem] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [writeDate, setWriteDate] = useState("");
  const [confirmDate, setConfirmDate] = useState("");

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taxes") || "[]");
    const found = saved.find((t: any) => t.id === id);

    if (found) {
      setCustomerName(found.customerName);
      setCustomerCEO(found.customerCEO);
      setCustomerBizNumber(found.customerBizNumber);
      setCustomerPhone(found.customerPhone);
      setCustomerAddress(found.customerAddress);

      // ⭐ 추가된 필드들 로드
      setCustomerType(found.customerType || "");
      setCustomerItem(found.customerItem || "");
      setCustomerEmail(found.customerEmail || "");

      setWriteDate(found.writeDate);
      setConfirmDate(found.confirmDate);
      setItems(found.items);
    }
  }, [id]);

  const changeItem = (i: number, field: string, value: string) => {
    const list = [...items];
    list[i][field] = field === "name" ? value : Number(value);
    setItems(list);
  };

  const save = () => {
    const totalSupply = items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
    const totalTax = Math.floor(totalSupply * 0.1);
    const totalAmount = totalSupply + totalTax;

    const updated = {
      id,
      customerName,
      customerCEO,
      customerBizNumber,
      customerPhone,
      customerAddress,

      // ⭐ 저장 시 3개 필드 반드시 포함
      customerType,
      customerItem,
      customerEmail,

      writeDate,
      confirmDate,
      items,
      totalSupply,
      totalTax,
      totalAmount,
    };

    const saved = JSON.parse(localStorage.getItem("taxes") || "[]");
    const idx = saved.findIndex((t: any) => t.id === id);
    saved[idx] = updated;

    localStorage.setItem("taxes", JSON.stringify(saved));

    alert("세금계산서가 수정되었습니다!");
    navigate(`/tax/${id}`);
  };

  return (
    <div className="page-container">
      <h1 className="section-title">세금계산서 수정</h1>

      <div className="form-section">
        <h2>공급받는자 정보</h2>

        <label>상호</label>
        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

        <label>대표자명</label>
        <input value={customerCEO} onChange={(e) => setCustomerCEO(e.target.value)} />

        <label>사업자번호</label>
        <input value={customerBizNumber} onChange={(e) => setCustomerBizNumber(e.target.value)} />

        <label>전화번호</label>
        <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />

        <label>주소</label>
        <input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />

        {/* ⭐ 추가된 3개 필드 */}
        <label>업태</label>
        <input value={customerType} onChange={(e) => setCustomerType(e.target.value)} />

        <label>종목</label>
        <input value={customerItem} onChange={(e) => setCustomerItem(e.target.value)} />

        <label>이메일</label>
        <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />

        <label>작성일</label>
        <input type="date" value={writeDate} onChange={(e) => setWriteDate(e.target.value)} />

        <label>발행일</label>
        <input type="date" value={confirmDate} onChange={(e) => setConfirmDate(e.target.value)} />
      </div>

      <div className="form-section">
        <h2>품목 정보</h2>

        <table className="item-table">
          <thead>
            <tr>
              <th>품명</th>
              <th>수량</th>
              <th>단가</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td>
                  <input value={it.name} onChange={(e) => changeItem(i, "name", e.target.value)} />
                </td>
                <td>
                  <input type="number" value={it.qty} onChange={(e) => changeItem(i, "qty", e.target.value)} />
                </td>
                <td>
                  <input type="number" value={it.price} onChange={(e) => changeItem(i, "price", e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn-row">
        <button className="btn-primary" onClick={save}>저장</button>
        <button className="btn-secondary" onClick={() => navigate(-1)}>취소</button>
      </div>
    </div>
  );
}
