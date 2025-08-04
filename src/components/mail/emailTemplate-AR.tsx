import React from "react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  quantity: number;
}

interface EmailTemplateProps {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  orderItems: OrderItem[];
  totalPrice: number;
  discountAmount: number;
  finalTotal: number;
  orderDate: string;
  carMake: string;
  carModel: string;
  carType: string;
  frontWindow: string;
  sidesfrontWindow: string;
  sidesbackWindow: string;
  backWindow: string;
  thirdWindow?: string;
  extraWindow?: string;
  extraCost: number;
}

const EmailTemplateAr: React.FC<EmailTemplateProps> = ({
  orderNumber,
  customerName,
  customerPhone,
  orderItems,
  totalPrice,
  discountAmount,
  finalTotal,
  orderDate,
  carMake,
  carModel,
  carType,
  frontWindow,
  sidesfrontWindow,
  sidesbackWindow,
  backWindow,
  thirdWindow,
  extraWindow,
  extraCost,
}) => {
  const parseCustomizedProduct = (description: string) => {
    if (!description.includes("Customer:")) return null;

    const parts = description.split(" | ");
    const customerName = parts[0].replace("Customer:", "").trim();
    const phoneNumber = parts[1] ? parts[1].replace("Phone:", "").trim() : "";
    const specificationParts = parts.slice(2);

    return {
      customerName,
      phoneNumber,
      specifications: specificationParts
        .map((spec) => {
          const value = spec.split(":")[1];
          return value ? value.trim() : null;
        })
        .filter((value) => value),
    };
  };

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "right",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          borderBottom: "2px solid #e53e3e",
          paddingBottom: "20px",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "#e53e3e", margin: "0", fontSize: "28px" }}>
          سوبر شيلد
        </h1>
        <p style={{ color: "#666", margin: "5px 0", fontSize: "16px" }}>
          خدمات تظليل نوافذ السيارات
        </p>
      </div>

      {/* Order Confirmation */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ color: "#333", margin: "0 0 10px 0", fontSize: "24px" }}>
          تأكيد الطلب
        </h2>
        <p style={{ color: "#666", margin: "5px 0", fontSize: "14px" }}>
          <strong>رقم الطلب</strong>: {orderNumber}
        </p>
        <p style={{ color: "#666", margin: "5px 0", fontSize: "14px" }}>
          <strong>تاريخ الطلب</strong>: {orderDate}
        </p>
      </div>

      {/* Customer Info */}
      <div style={{ marginBottom: "30px" }}>
        <h3
          style={{
            color: "#333",
            margin: "0 0 15px 0",
            fontSize: "20px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          معلومات العميل
        </h3>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "6px",
          }}
        >
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            <strong>الاسم</strong>: {customerName}
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            <strong>رقم الهاتف</strong>: {customerPhone}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div style={{ marginBottom: "30px" }}>
        <h3
          style={{
            color: "#333",
            margin: "0 0 15px 0",
            fontSize: "20px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          تفاصيل الطلب
        </h3>

        {orderItems.map((item) => {
          const customizedInfo = item.description
            ? parseCustomizedProduct(item.description)
            : null;

          return (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <h4 style={{ margin: "0", color: "#333", fontSize: "16px" }}>
                  {item.name}
                </h4>
                <div>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#e53e3e",
                    }}
                  >
                    {item.price.toFixed(2)} × {item.quantity} ريال
                  </p>
                  <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                    المجموع: {(item.price * item.quantity).toFixed(2)} ريال
                  </p>
                </div>
              </div>

              {customizedInfo && (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "6px",
                  }}
                >
                  <h5
                    style={{
                      margin: "0 0 10px 0",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    تفاصيل التخصيص:
                  </h5>

                  <p style={{ margin: "3px 0", fontSize: "13px" }}>
                    <strong>العميل</strong>: {customizedInfo.customerName}
                  </p>
                  <p style={{ margin: "3px 0", fontSize: "13px" }}>
                    <strong>الهاتف</strong>: {customizedInfo.phoneNumber}
                  </p>

                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    المواصفات:
                  </p>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "13px",
                      marginTop: "10px",
                    }}
                  >
                    <tbody>
                      {carMake && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            نوع السيارة
                          </td>
                          <td style={{ padding: "4px 8px" }}>{carMake}</td>
                        </tr>
                      )}
                      {carModel && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            موديل السيارة
                          </td>
                          <td style={{ padding: "4px 8px" }}>{carModel}</td>
                        </tr>
                      )}
                      {carType && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            فئة السيارة
                          </td>
                          <td style={{ padding: "4px 8px" }}>{carType}</td>
                        </tr>
                      )}
                      {frontWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            الزجاج الأمامي
                          </td>
                          <td style={{ padding: "4px 8px" }}>{frontWindow}</td>
                        </tr>
                      )}
                      {sidesfrontWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            الزجاج الجانبي الأمامي
                          </td>
                          <td style={{ padding: "4px 8px" }}>
                            {sidesfrontWindow}
                          </td>
                        </tr>
                      )}
                      {sidesbackWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            الزجاج الجانبي الخلفي
                          </td>
                          <td style={{ padding: "4px 8px" }}>
                            {sidesbackWindow}
                          </td>
                        </tr>
                      )}
                      {backWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            الزجاج الخلفي
                          </td>
                          <td style={{ padding: "4px 8px" }}>{backWindow}</td>
                        </tr>
                      )}
                      {thirdWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            زجاج الصف الثالث
                          </td>
                          <td style={{ padding: "4px 8px" }}>{thirdWindow}</td>
                        </tr>
                      )}
                      {extraWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            القص الالكتروني
                          </td>
                          <td style={{ padding: "4px 8px" }}>{extraWindow}</td>
                        </tr>
                      )}
                      {extraCost > 0 && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            التكلفة الإضافية
                          </td>
                          <td style={{ padding: "4px 8px" }}>
                            {extraCost.toFixed(2)} ريال
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {!customizedInfo && item.description && (
                <p
                  style={{
                    margin: "10px 0 0 0",
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  {item.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ color: "#333", margin: "0 0 15px 0", fontSize: "20px" }}>
          ملخص الطلب
        </h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>المجموع الفرعي </span>
          <strong>{totalPrice.toFixed(2)}ريال</strong>
        </div>

        {discountAmount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#28a745",
            }}
          >
            <span>الخصم</span>
            <strong>- {discountAmount.toFixed(2)} ريال</strong>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: "2px solid #ddd",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#e53e3e",
          }}
        >
          <span>الإجمالي</span>
          <span>{finalTotal.toFixed(2)} ريال</span>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          borderTop: "2px solid #e53e3e",
          paddingTop: "20px",
          marginTop: "30px",
        }}
      >
        <p style={{ color: "#666", margin: "5px 0", fontSize: "14px" }}>
          شكراً لاختياركم سوبر شيلد!
        </p>
        <p style={{ color: "#666", margin: "5px 0", fontSize: "12px" }}>
          سنتواصل معكم قريباً لتحديد موعدكم.
        </p>
        <p style={{ color: "#999", margin: "15px 0 0 0", fontSize: "11px" }}>
          هذه رسالة بريد إلكتروني تلقائية. الرجاء عدم الرد عليها.
        </p>
      </div>
    </div>
  );
};

export default EmailTemplateAr;
