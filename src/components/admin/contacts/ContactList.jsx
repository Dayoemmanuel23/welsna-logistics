import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { Eye, Pencil, Trash2 } from "lucide-react";

import ViewContactModal from "./ViewContactModal";
import EditContactModal from "./EditContactModal";
import DeleteContactModal from "./DeleteContactModal";

export default function ContactList({ search = "" }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedContact, setSelectedContact] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);

      const { data } = await apiClient.get("/contacts");

      setContacts(data.contacts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const keyword = search.toLowerCase();

    return (
      contact.name?.toLowerCase().includes(keyword) ||
      contact.email?.toLowerCase().includes(keyword) ||
      contact.phone?.toLowerCase().includes(keyword) ||
      contact.subject?.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        Loading contacts...
      </div>
    );
  }

  if (filteredContacts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        No contact messages found.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">Subject</th>
              <th className="text-left p-4">Date</th>
              <th className="text-center p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredContacts.map((contact) => (

              <tr
                key={contact._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4 font-medium">
                  {contact.name}
                </td>

                <td className="p-4">
                  {contact.email}
                </td>

                <td className="p-4">
                  {contact.phone || "-"}
                </td>

                <td className="p-4">
                  {contact.subject}
                </td>

                <td className="p-4">
                  {new Date(
                    contact.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowViewModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowEditModal(true);
                      }}
                      className="text-amber-600 hover:text-amber-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showViewModal && (
        <ViewContactModal
          contact={selectedContact}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {showEditModal && (
        <EditContactModal
          contact={selectedContact}
          onClose={() => setShowEditModal(false)}
          onUpdated={loadContacts}
        />
      )}

      {showDeleteModal && (
        <DeleteContactModal
          contact={selectedContact}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={loadContacts}
        />
      )}
    </>
  );
}