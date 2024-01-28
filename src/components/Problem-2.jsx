import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Problem2 = () => {
    const [modal, setModal] = useState(null);
    const [detailsModal, setDetailsModal] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [onlyEven, setOnlyEven] = useState(false);

    const handleModalOpen = (modalType) => {
        setModal(modalType);
        setFilteredContacts(contacts);
        updateURL(modalType);
    };

    const handleDetailsModal = () => {
        setDetailsModal(!detailsModal);
    };

    const handleModalClose = () => {
        setModal(null);
        setFilteredContacts(contacts);
        updateURL("");
    };

    const updateURL = (modalType) => {
        const currentUrl = window.location.href;
        const baseUrl = currentUrl.split("#")[0];
        const newUrl = `${baseUrl}${modalType ? "#" + modalType : ""}`;

        window.history.replaceState(null, "", newUrl);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = "https://contact.mediusware.com/api/contacts/";
                if (modal === "B") {
                    url = "https://contact.mediusware.com/api/country-contacts/United%20States/";
                }
                const { data } = await axios.get(url);
                setContacts(data.results);
                setFilteredContacts(data.results);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        fetchData();
    }, [modal]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            filterContacts();
        }, 10);

        return () => clearTimeout(delay);
    }, [searchTerm, onlyEven]);

    const filterContacts = async () => {
        let filteredContacts = contacts;

        if (searchTerm) {
            if (modal === "A") {
                const searchUrl = `https://contact.mediusware.com/api/contacts/?search=${searchTerm}`;
                const { data } = await axios.get(searchUrl);
                filteredContacts = data.results;
            } else if (modal === "B") {
                const searchUrl = `https://contact.mediusware.com/api/country-contacts/United%20States/?search=${searchTerm}`;
                const { data } = await axios.get(searchUrl);
                filteredContacts = data.results;
            }
        }

        if (onlyEven) {
            filteredContacts = filteredContacts.filter(
                (contact) => contact.id % 2 === 0
            );
        }

        setFilteredContacts(filteredContacts);
    };

    const handleOnlyEvenChange = () => {
        setOnlyEven(!onlyEven);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={() => handleModalOpen('A')}>All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={() => handleModalOpen('B')}>US Contacts</button>
                </div>
            </div>
            {modal ? (
                <div
                    className="modal"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: "block" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal {modal}</h5>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Contacts"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <ul>
                                    {filteredContacts.map((contact) => (
                                        <div
                                            key={contact.id}
                                            onClick={handleDetailsModal}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {detailsModal && (
                                                <div
                                                    className="modal"
                                                    tabIndex="-1"
                                                    role="dialog"
                                                    style={{ display: "block" }}
                                                >
                                                    {/* Modal C content */}
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">Modal C</h5>
                                                            </div>
                                                            <div className="modal-body">
                                                                {/* Contact details */}
                                                                <div className="px-4">
                                                                    <li>Id: {contact.id}</li>
                                                                    <li>Country: {contact.country.name}</li>
                                                                    <li>Phone: {contact.phone}</li>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    onClick={handleDetailsModal}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <li>{contact.phone}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <div className="modal-footer flex justify-content-between">
                                <div className="checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={onlyEven}
                                            onChange={handleOnlyEvenChange}
                                        />
                                        <span className="px-2">Show Only Even Numbers</span>
                                    </label>
                                </div>
                                <div className="btn-group">
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: "#46139f", color: "#FFFFFF" }}
                                        onClick={() => handleModalOpen("A")}
                                    >
                                        All Contacts
                                    </button>
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: "#ff7f50", color: "#FFFFFF" }}
                                        onClick={() => handleModalOpen("B")}
                                    >
                                        US Contacts
                                    </button>
                                    <button
                                        className="btn"
                                        style={{
                                            backgroundColor: "#ffffff",
                                            color: "#000000",
                                            border: "1px solid #46139f",
                                        }}
                                        onClick={handleModalClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
        </div>
    );
};

export default Problem2;