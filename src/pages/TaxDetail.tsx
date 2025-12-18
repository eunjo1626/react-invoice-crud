import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./TaxDetail.css";

export default function TaxDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<any>(null);

  const COMPANY = {
    name: "SlipNTax Manager",
    ceo: "Rei",
    biz: "123-45-67890",
    phone: "010-1234-5678",
    address: "서울특별시 강남구 테헤란로 100",
    logo: "/assets/logo.png",
    type: "서비스",
    item: "소프트웨어 개발",
    email: "contact@slipntax.com",
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taxes") || "[]");
    const found = saved.find((t: any) => t.id === id);
    setData(found || null);
  }, [id]);

  const deleteTax = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const saved = JSON.parse(localStorage.getItem("taxes") || "[]");
    const filtered = saved.filter((t: any) => t.id !== id);
    localStorage.setItem("taxes", JSON.stringify(filtered));

    alert("삭제되었습니다.");
    navigate("/tax");
  };

  if (!data)
    return (
      <div className="page-container">
        <h2>세금계산서를 찾을 수 없습니다.</h2>
      </div>
    );

  return (
    <div className="page-container">
      <h1 className="section-title">전자세금계산서 상세보기</h1>

      {/* 공급자 정보 */}
      <div className="detail-box">
        <h2>공급자 정보</h2>

        <div className="row"><div className="label">사업자번호</div><div>{COMPANY.biz}</div></div>
        <div className="row"><div className="label">상호</div><div>{COMPANY.name}</div></div>
        <div className="row"><div className="label">대표자명</div><div>{COMPANY.ceo}</div></div>
        <div className="row"><div className="label">업태</div><div>{COMPANY.type}</div></div>
        <div className="row"><div className="label">종목</div><div>{COMPANY.item}</div></div>
        <div className="row"><div className="label">이메일</div><div>{COMPANY.email}</div></div>
        <div className="row"><div className="label">주소</div><div>{COMPANY.address}</div></div>
        <div className="row"><div className="label">전화</div><div>{COMPANY.phone}</div></div>
      </div>

      {/* 공급받는자 정보 */}
      <div className="detail-box">
        <h2>공급받는자 정보</h2>

        <div className="row"><div className="label">거래처명</div><div>{data.customerName}</div></div>
        <div className="row"><div className="label">대표자명</div><div>{data.customerCEO}</div></div>
        <div className="row"><div className="label">사업자번호</div><div>{data.customerBizNumber}</div></div>
        <div className="row"><div className="label">업태</div><div>{data.customerType}</div></div>
        <div className="row"><div className="label">종목</div><div>{data.customerItem}</div></div>
        <div className="row"><div className="label">이메일</div><div>{data.customerEmail}</div></div>
        <div className="row"><div className="label">주소</div><div>{data.customerAddress}</div></div>
        <div className="row"><div className="label">전화</div><div>{data.customerPhone}</div></div>
      </div>

      {/* 금액 정보 */}
      <div className="detail-box">
        <h2>금액 정보</h2>

        <div className="row"><div className="label">작성일</div><div>{data.writeDate}</div></div>
        <div className="row"><div className="label">발행일</div><div>{data.confirmDate}</div></div>

        <div className="row">
          <div className="label">공급가액 합계</div>
          <div className={data.totalSupply < 0 ? "negative" : ""}>
            {data.totalSupply.toLocaleString()} 원
          </div>
        </div>

        <div className="row">
          <div className="label">세액 합계</div>
          <div className={data.totalTax < 0 ? "negative" : ""}>
            {data.totalTax.toLocaleString()} 원
          </div>
        </div>

        <div className="row">
          <div className="label">총 합계금액</div>
          <div className={data.totalAmount < 0 ? "negative" : ""}>
            {data.totalAmount.toLocaleString()} 원
          </div>
        </div>
      </div> {/* ← ★ 중요: 금액 박스 닫기 */}

      {/* 품목 리스트 */}
      <div className="detail-box">
        <h2>품목 리스트</h2>

        <table className="item-table">
          <thead>
            <tr>
              <th>품명</th>
              <th>수량</th>
              <th>단가</th>
              <th>공급가액</th>
              <th>세액</th>
              <th>총액</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item: any, i: number) => {
              const supply = item.qty * item.price;
              const tax = Math.floor(supply * 0.1);
              const total = supply + tax;

              return (
                <tr key={i}>
                  <td>{item.name}</td>

                  <td className={item.qty < 0 ? "negative" : ""}>{item.qty}</td>

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

      {/* 버튼 */}
      <div className="btn-row">
        <button className="btn btn-primary" onClick={() => navigate(`/tax/${id}/print`)}>
           📄 문서형으로 보기
        </button>

        <button className="btn btn-secondary" onClick={() => navigate(`/tax/${id}/edit`)}>
          ✏ 수정하기
        </button>

        <button className="btn btn-danger" onClick={deleteTax}>
          🗑 삭제하기
        </button>

        <button className="btn btn-back" onClick={() => navigate(-1)}>
          ← 뒤로가기
        </button>
      </div>
    </div>
  );
}
