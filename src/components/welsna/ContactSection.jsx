import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import apiClient from "@/api/apiClient";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await apiClient.post("/contacts", form);

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to send message."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-slate-100"
    >
      <div className="max-w-5xl mx-auto px-4">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-navy">
            Contact Us
          </h2>

          <p className="mt-4 text-gray-600">
            We'd love to hear from you. Send us your enquiry and our
            logistics team will respond as soon as possible.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                required
                className="border rounded-lg px-4 py-3 w-full"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                required
                className="border rounded-lg px-4 py-3 w-full"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                className="border rounded-lg px-4 py-3 w-full"
              />

              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                  handleChange("subject", e.target.value)
                }
                className="border rounded-lg px-4 py-3 w-full"
              />

            </div>

            <textarea
              rows="6"
              placeholder="Your Message..."
              value={form.message}
              onChange={(e) =>
                handleChange("message", e.target.value)
              }
              required
              className="border rounded-lg px-4 py-3 w-full resize-none"
            />

            {success && (

              <div className="bg-green-100 text-green-700 rounded-lg p-4 flex items-center gap-2">

                <CheckCircle2 size={20} />

                Your message has been sent successfully.

              </div>

            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 transition text-black font-semibold px-8 py-3 rounded-lg flex items-center gap-2"
            >

              <Send size={18} />

              {loading
                ? "Sending..."
                : "Send Message"}

            </button>

          </form>

        </div>

      </div>
    </section>
  );
}