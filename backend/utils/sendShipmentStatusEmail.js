import { sendEmail } from "./sendEmail.js";

const formatDate = (date) => {
  if (!date) return "Not Available";

  return new Date(date).toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const sendShipmentStatusEmail = async ({
  to,
  customerName,
  trackingNumber,
  status,
  origin,
  destination,
  currentLocation,
  estimatedDelivery,
}) => {
  const html = `
    <div style="font-family:Arial,sans-serif;background:#f5f7fa;padding:30px;">

      <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,.08);">

        <div style="background:#0f766e;padding:25px;text-align:center;color:#fff;">
          <h1 style="margin:0;">
            Welsna Logistics
          </h1>

          <p style="margin-top:8px;">
            Shipment Status Update
          </p>
        </div>

        <div style="padding:35px;">

          <h2 style="margin-top:0;color:#0f172a;">
            Hello ${customerName},
          </h2>

          <p>
            Your shipment status has been updated.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:25px;">

            <tr>
              <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">
                Tracking Number
              </td>

              <td style="padding:10px;border-bottom:1px solid #eee;">
                ${trackingNumber}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">
                Current Status
              </td>

              <td style="padding:10px;border-bottom:1px solid #eee;color:#0f766e;font-weight:bold;">
                ${status}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">
                Origin
              </td>

              <td style="padding:10px;border-bottom:1px solid #eee;">
                ${origin}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">
                Destination
              </td>

              <td style="padding:10px;border-bottom:1px solid #eee;">
                ${destination}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">
                Current Location
              </td>

              <td style="padding:10px;border-bottom:1px solid #eee;">
                ${currentLocation || "Updating..."}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:bold;">
                Estimated Delivery
              </td>

              <td style="padding:10px;">
                ${formatDate(estimatedDelivery)}
              </td>
            </tr>

          </table>

          <div style="margin-top:35px;text-align:center;">

            <p style="margin-bottom:20px;">
              Thank you for choosing Welsna Logistics.
            </p>

            <a
              href="https://www.instagram.com/welsnaltd"
              style="
                display:inline-block;
                padding:12px 25px;
                background:#0f766e;
                color:white;
                text-decoration:none;
                border-radius:6px;
              "
            >
              Follow Us on Instagram
            </a>

          </div>

        </div>

        <div style="background:#f8fafc;padding:18px;text-align:center;font-size:13px;color:#64748b;">

          Welsna Logistics Limited

          <br><br>

          Email:
          info@welsnanigerialtd.com

          <br>

          Website:
          www.welsnanigerialtd.com

        </div>

      </div>

    </div>
  `;

  await sendEmail({
    to,
    subject: `Shipment Update - ${trackingNumber}`,
    html,
  });
};