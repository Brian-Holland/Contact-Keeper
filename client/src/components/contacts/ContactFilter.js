import React, { useContext, useRef, useEffect } from "react";
import ContactConext from "../../context/contact/contactContext";

const ContactFilter = () => {
    const contactContext = useContext(ContactConext);

    const { filterContacts, clearFilter, filtered } = contactContext;

    const text = useRef("");

    useEffect(() => {
        if (filtered === null) {
            text.current.value = "";
        }
    });

    const onChange = e => {
        if (text.current.value !== "") {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };
    return (
        <form>
            <input
                ref={text}
                type="text"
                placeholder="Filter Contacts"
                onChange={onChange}
            />
        </form>
    );
};

export default ContactFilter;
