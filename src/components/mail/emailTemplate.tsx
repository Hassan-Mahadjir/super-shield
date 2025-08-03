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
  thirdWindow: string;
  extraWindow: string;
  extraCost: number;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
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
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
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
          Super Shield
        </h1>
        <p style={{ color: "#666", margin: "5px 0", fontSize: "16px" }}>
          Car Window Tinting Services
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
          Order Confirmation
        </h2>
        <p style={{ color: "#666", margin: "5px 0", fontSize: "14px" }}>
          <strong>Order Number:</strong> {orderNumber}
        </p>
        <p style={{ color: "#666", margin: "5px 0", fontSize: "14px" }}>
          <strong>Order Date:</strong> {orderDate}
        </p>
      </div>

      {/* Customer Information */}
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
          Customer Information
        </h3>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "6px",
          }}
        >
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            <strong>Name:</strong> {customerName}
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            <strong>Phone:</strong> {customerPhone}
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
          Order Details
        </h3>

        {orderItems.map((item, index) => {
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
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#e53e3e",
                    }}
                  >
                    SAR {item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                    Total: SAR {(item.price * item.quantity).toFixed(2)}
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
                    Customization Details:
                  </h5>

                  {/* Customer Info */}
                  <div style={{ marginBottom: "10px" }}>
                    <p style={{ margin: "3px 0", fontSize: "13px" }}>
                      <strong>Customer:</strong> {customizedInfo.customerName}
                    </p>
                    <p style={{ margin: "3px 0", fontSize: "13px" }}>
                      <strong>Phone:</strong> {customizedInfo.phoneNumber}
                    </p>
                  </div>

                  {/* Specifications */}
                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    Specifications:
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
                            Car Make:
                          </td>
                          <td style={{ padding: "4px 8px" }}>{carMake}</td>
                        </tr>
                      )}
                      {carModel && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            Car Model:
                          </td>
                          <td style={{ padding: "4px 8px" }}>{carModel}</td>
                        </tr>
                      )}
                      {carType && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            Car Type:
                          </td>
                          <td style={{ padding: "4px 8px" }}>{carType}</td>
                        </tr>
                      )}
                      {frontWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            Front Window:
                          </td>
                          <td style={{ padding: "4px 8px" }}>{frontWindow}</td>
                        </tr>
                      )}
                      {backWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            Back Window:
                          </td>
                          <td style={{ padding: "4px 8px" }}>{backWindow}</td>
                        </tr>
                      )}
                      {sidesfrontWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            Sides Front Window:
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
                            Sides Back Window:
                          </td>
                          <td style={{ padding: "4px 8px" }}>
                            {sidesbackWindow}
                          </td>
                        </tr>
                      )}
                      {thirdWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            Third Window:
                          </td>
                          <td style={{ padding: "4px 8px" }}>{thirdWindow}</td>
                        </tr>
                      )}
                      {extraWindow && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            Extra Window:
                          </td>
                          <td style={{ padding: "4px 8px" }}>{extraWindow}</td>
                        </tr>
                      )}
                      {extraCost > 0 && (
                        <tr>
                          <td
                            style={{ padding: "4px 8px", fontWeight: "bold" }}
                          >
                            Extra Cost:
                          </td>
                          <td style={{ padding: "4px 8px" }}>
                            SAR {extraCost.toFixed(2)}
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

      {/* Order Summary */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ color: "#333", margin: "0 0 15px 0", fontSize: "20px" }}>
          Order Summary
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "14px" }}>Subtotal:</span>
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>
            SAR {totalPrice.toFixed(2)}
          </span>
        </div>

        {discountAmount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#28a745" }}>
              Discount:
            </span>
            <span
              style={{ fontSize: "14px", fontWeight: "bold", color: "#28a745" }}
            >
              -SAR {discountAmount.toFixed(2)}
            </span>
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
          <span>Total:</span>
          <span>SAR {finalTotal.toFixed(2)}</span>
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
          Thank you for choosing Super Shield!
        </p>
        <p style={{ color: "#666", margin: "5px 0", fontSize: "12px" }}>
          We will contact you soon to schedule your appointment.
        </p>
        <p style={{ color: "#999", margin: "15px 0 0 0", fontSize: "11px" }}>
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    </div>
  );
};

export default EmailTemplate;
