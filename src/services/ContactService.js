import axios from 'axios';

const CONTACT_API_BASE_URL = "http://localhost:8080/api/v1/contact";

class ContactService {

    getContact(){
        return axios.get(CONTACT_API_BASE_URL);
    }

    createContact(contact){
        return axios.post(CONTACT_API_BASE_URL, contact);
    }

    getContactById(contactId){
        return axios.get(CONTACT_API_BASE_URL + '/' + contactId);
    }

    updateContact(contact, contactId){
        return axios.put(CONTACT_API_BASE_URL + '/' + contactId, contact);
    }

    deleteContact(contactId){
        return axios.delete(CONTACT_API_BASE_URL + '/' + contactId);
    }
}

export default new ContactService()