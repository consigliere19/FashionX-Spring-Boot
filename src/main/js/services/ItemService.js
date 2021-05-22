import axios from 'axios';

const ITEMS_API_BASE_URL = "https://localhost:8443/api/v1/items";

class ItemService{
    getItems(){
        return axios.get(ITEMS_API_BASE_URL);
    }

    addItem(item){
        return axios.post(ITEMS_API_BASE_URL, item);
    }

    getItemById(itemId){
        return axios.get(ITEMS_API_BASE_URL + '/' + itemId);
    }

    updateItem(item, itemId){
        return axios.put(ITEMS_API_BASE_URL + '/' + itemId, item);
    }

    deleteItem(itemId){
        return axios.delete(ITEMS_API_BASE_URL + '/' + itemId);
    }
}

export default new ItemService();