import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
} from "../types";

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Mark Z",
                phone: "111-111-1111",
                email: "mark@facebook.com",
                type: "professional",
            },
            {
                id: 2,
                name: "Jeff B",
                phone: "222-222-1111",
                email: "jeff@amazon.com",
                type: "professional",
            },
            {
                id: 3,
                name: "Tom A",
                phone: "333-333-1111",
                email: "tom@myspace.com",
                type: "personal",
            },
        ],
        current: null,
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //add contact
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    //delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    //set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    //clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    //update contact

    //filter contacts

    //clear filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
