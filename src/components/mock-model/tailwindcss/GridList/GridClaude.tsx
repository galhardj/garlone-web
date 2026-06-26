import React from "react";
import { Mail, Phone } from "lucide-react";

const ContactCard = ({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image: any;
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Admin
            </span>
          </div>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 transition-colors hover:bg-gray-50">
          <Mail className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Email</span>
        </button>
        <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 transition-colors hover:bg-gray-50">
          <Phone className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Call</span>
        </button>
      </div>
    </div>
  );
};

const AdminContactsGrid = () => {
  const contacts = [
    {
      name: "Jane Cooper",
      role: "Regional Paradigm Technician",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      name: "Cody Fisher",
      role: "Product Directives Officer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
    {
      name: "Esther Howard",
      role: "Forward Response Developer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    {
      name: "Jenny Wilson",
      role: "Central Security Manager",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    },
    {
      name: "Kristin Watson",
      role: "Lead Implementation Liaison",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
      name: "Cameron Williamson",
      role: "Internal Applications Engineer",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              name={contact.name}
              role={contact.role}
              image={contact.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminContactsGrid;
