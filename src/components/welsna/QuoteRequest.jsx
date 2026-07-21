import { useState } from "react";
import { CheckCircle, Calculator, Sparkles } from "lucide-react";
import apiClient from "@/api/apiClient";
import freightImage1 from "./freight-forwarding1.jpg";

const GOODS_TYPES = [
  "General Merchandise",
  "Electronics",
  "Perishable Goods",
  "Hazardous Materials",
  "Other",
];

const MULTIPLIERS = {
  "General Merchandise": 1,
  Electronics: 1.2,
  "Perishable Goods": 1.5,
  "Hazardous Materials": 2.5,
  Other: 1,
};

const BASE_RATE = 50000;
const RATE_PER_KG = 1500;

const CHECKLIST = [
  {
    title: "Transparent Pricing",
    desc: "Clear breakdown of every cost",
  },
  {
    title: "No Hidden Fees",
    desc: "What you see is what you pay",
  },
  {
    title: "Competitive Rates",
    desc: "Best value in the market",
  },
];

function formatNaira(amount) {
  return "₦" + Math.round(amount).toLocaleString("en-NG");
}

export default function QuoteRequest() {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    origin: "",
    destination: "",
    weight: "",
    goods_type: "General Merchandise",
    custom_goods_type: "",
  });

  const [estimate, setEstimate] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = (e) => {
    e.preventDefault();

    const weight = parseFloat(form.weight) || 0;
    const multiplier = MULTIPLIERS[form.goods_type] || 1;

    const cost =
      (BASE_RATE + weight * RATE_PER_KG) *
      multiplier;

    setEstimate(cost);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      await apiClient.post("/quotes", {
        ...form,
        weight: parseFloat(form.weight),
        estimated_cost: estimate,
        status: "New",
      });

      setSaved(true);

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to save quotation request."
      );

    } finally {

      setSaving(false);

    }
  };

  return (
    <section
      id="quote"
      className="py-20 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT */}

          <div className="relative rounded-2xl overflow-hidden p-10">

            <img
              src={freightImage1}
              alt="freight forwarding1"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="relative">

              <span className="uppercase text-cyan-300 tracking-widest text-xs">
                Instant Estimate
              </span>

              <h2 className="text-4xl text-white font-bold mt-3 mb-5">
                Request a Quote
              </h2>

              <p className="text-gray-200 mb-8">
                Fill in your shipment details and receive an
                instant estimate.
              </p>

              <div className="space-y-5">

                {CHECKLIST.map((item) => (

                  <div
                    key={item.title}
                    className="flex gap-3"
                  >
                    <CheckCircle className="text-cyan-300 mt-1" />

                    <div>

                      <p className="font-semibold text-white">
                        {item.title}
                      </p>

                      <p className="text-gray-300 text-sm">
                        {item.desc}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* FORM */}

          <div className="bg-white rounded-2xl shadow-xl p-8">

            <form
              onSubmit={calculate}
              className="space-y-5"
            >

              <h3 className="text-2xl font-bold">
                Customer Information
              </h3>

              <input
                type="text"
                placeholder="Full Name"
                value={form.customer_name}
                onChange={(e) =>
                  handleChange(
                    "customer_name",
                    e.target.value
                  )
                }
                required
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={form.customer_email}
                onChange={(e) =>
                  handleChange(
                    "customer_email",
                    e.target.value
                  )
                }
                required
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={form.customer_phone}
                onChange={(e) =>
                  handleChange(
                    "customer_phone",
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
              />

              <hr />

              <input
                type="text"
                placeholder="Origin"
                value={form.origin}
                onChange={(e) =>
                  handleChange(
                    "origin",
                    e.target.value
                  )
                }
                required
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                placeholder="Destination"
                value={form.destination}
                onChange={(e) =>
                  handleChange(
                    "destination",
                    e.target.value
                  )
                }
                required
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                type="number"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={(e) =>
                  handleChange(
                    "weight",
                    e.target.value
                  )
                }
                required
                className="w-full border rounded-lg px-4 py-3"
              />

              <select
                value={form.goods_type}
                onChange={(e) =>
                  handleChange(
                    "goods_type",
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
              >
                {GOODS_TYPES.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>

              {form.goods_type === "Other" && (

                <input
                  type="text"
                  placeholder="Specify Goods"
                  value={form.custom_goods_type}
                  onChange={(e) =>
                    handleChange(
                      "custom_goods_type",
                      e.target.value
                    )
                  }
                  required
                  className="w-full border rounded-lg px-4 py-3"
                />

              )}

              <button
                type="submit"
                className="w-full bg-navy text-white py-3 rounded-lg flex justify-center items-center gap-2"
              >
                <Calculator size={18} />
                Calculate Estimate
              </button>

            </form>

            {estimate !== null && (

              <div className="mt-8 bg-slate-900 rounded-xl text-white p-6">

                <div className="flex gap-2 items-center">

                  <Sparkles className="text-yellow-400" />

                  <span className="uppercase text-xs tracking-widest">
                    Estimated Cost
                  </span>

                </div>

                <h2 className="text-4xl font-bold mt-3">
                  {formatNaira(estimate)}
                </h2>

                <p className="text-gray-300 mt-3 mb-6">
                  This is an estimated logistics cost.
                </p>

                {saved ? (

                  <div className="bg-green-600 rounded-lg p-3 text-center">
                    ✓ Quote Request Submitted Successfully
                  </div>

                ) : (

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 rounded-lg"
                  >
                    {saving
                      ? "Saving..."
                      : "Submit Quote Request"}
                  </button>

                )}

              </div>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}