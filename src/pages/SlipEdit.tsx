import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SlipEdit.css";

export default function SlipEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [slip, setSlip] = useState<any | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("slips") || "[]");
    const found = saved.find((s: any) => s.id === id);
    if (found) setSlip(found);
  }, [id]);

  // 값이 로드되기 전 렌더 막기
  if (!slip) return <div className="page-container">불러오는 중...</div>;

  // --------------------------
  // 입력 핸들러
  // --------------------------
  const handleChange = (field: string, value: string) => {
    setSlip({ ...slip, [field]: value });
  };

  const handleItemChange = (index: number, field: "name" | "qty" | "price", value: string) => {
    const items = [...slip.items];
    items[index][field] = field === "name" ? value : Number(value);
    setSlip({ ...slip, items });
  };

  const addItem = () => {
    setSlip({
      ...slip,
      items: [...slip.items, { name: "", qty: 0, price: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const items = slip.items.filter((_: any, i: number) => i !== index);
    setSlip({ ...slip, items });
  };

  // --------------------------
  // 저장 처리
  // --------------------------
  const saveSlip = () => {
    const updated = { ...slip };

    // 총합 다시 계산
    const totalSupply = updated.items.reduce(
      (sum: number, item: any) => sum + item.qty * item.price,
      0
    );
    const totalTax = Math.floor(totalSupply * 0.1);
    updated.totalAmount = totalSupply + totalTax;
    updated.totalSupply = totalSupply;
    updated.totalTax = totalTax;

    const saved = JSON.parse(localStorage.getItem("slips") || "[]");
    const idx = saved.findIndex((s: any) => s.id === updated.id);
    if (idx === -1) {
  alert("오류: 명세서를 찾을 수 없습니다.");
  return;
}
    saved[idx] = updated;

    localStorage.setItem("slips", JSON.stringify(saved));

    alert("수정되었습니다!");
    navigate(`/slips/${updated.id}`);
  };

  // --------------------------
  // 렌더링
  // --------------------------
  return (
    <div className="page-container">
      <h1 className="section-title">거래명세서 수정</h1>

      {/* 거래처 정보 */}
      <div className="form-section">
        <h2>거래처 정보</h2>

        <label>거래처명</label>
        <input
          value={slip.customerName}
          onChange={(e) => handleChange("customerName", e.target.value)}
        />

        <label>대표자명</label>
        <input
          value={slip.customerCEO}
          onChange={(e) => handleChange("customerCEO", e.target.value)}
        />

        <label>사업자번호</label>
        <input
          value={slip.customerBizNumber}
          onChange={(e) => handleChange("customerBizNumber", e.target.value)}
        />

        <label>전화번호</label>
        <input
          value={slip.customerPhone}
          onChange={(e) => handleChange("customerPhone", e.target.value)}
        />

        <label>주소</label>
        <input
          value={slip.customerAddress}
          onChange={(e) => handleChange("customerAddress", e.target.value)}
        />
      </div>

      {/* 품목 입력 */}
      <div className="form-section">
        <h2>품목 정보</h2>

        <table className="item-table">
          <thead>
            <tr>
              <th>품명</th>
              <th>수량</th>
              <th>단가</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {slip.items.map((item: any, i: number) => (
              <tr key={i}>
                <td>
                  <input
                    value={item.name}
                    onChange={(e) => handleItemChange(i, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(i, "qty", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(i, "price", e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className="btn-danger"
                    onClick={() => removeItem(i)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn" onClick={addItem}>
          + 품목 추가
        </button>
      </div>

      {/* 저장 / 취소 버튼 */}
      <div className="btn-row">
        <button className=" btn btn-primary" onClick={saveSlip}>
          저장
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </div>
  );
}
