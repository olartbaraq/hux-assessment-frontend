import { Contacts } from "../typings";
import { Edit } from "lucide-react";
import { Delete } from "lucide-react";
import useDelete from "../hooks/useDelete";
import { useNavigate } from "react-router-dom";

const ContactList = ({ contacts }: Contacts) => {
  const navigate = useNavigate();

  // Sort the contacts by lastname in alphabetical order
  const sortedContacts = contacts.sort((a, b) => {
    const lastNameA = a.lastname.toLowerCase();
    const lastNameB = b.lastname.toLowerCase();
    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;
    return 0;
  });

  const mutate = useDelete();

  const deleteContact = (contact_id: string) => {
    mutate(contact_id);
  };

  const editContact = (contact_id: string) => {
    navigate(`/contacts/edit-contact/${contact_id}`);
  };

  return (
    <div>
      {contacts.length == 0 ? (
        <div className="text-3xl text-blue-900 text-center">
          Start by adding new contacts
        </div>
      ) : (
        <div>
          {sortedContacts.map((contact) => (
            <div
              key={contact.id}
              className="w-auto border-b-2 flex flex-row items-center justify-between"
            >
              <div className="w-auto flex flex-row space-x-3 items-center">
                <div className="h-20 w-20 my-4 bg-home rounded-full items-center flex justify-center">
                  <div className="w-full flex flex-row items-center justify-center">
                    <p className="text-4xl">
                      {contact.lastname.charAt(0).toUpperCase()}
                    </p>
                    <p className="text-4xl">
                      {contact.firstname.charAt(0).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 items-start">
                  <h3>
                    {contact.lastname} {contact.firstname}
                  </h3>
                  <p>{contact.phone_number}</p>
                </div>
              </div>

              {/* Edit button */}
              <div className="w-auto flex flex-col space-y-2">
                <button onClick={() => editContact(contact.id)}>
                  <Edit color="#133695" size={30} />
                </button>
                <button onClick={() => deleteContact(contact.id)}>
                  <Delete color="red" size={30} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
