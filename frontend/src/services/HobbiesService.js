import http from "../http-common";

class HobbiesDataService {
        getAllusers() {
            return http.get("/hobbies/users");
        }
        
        getuser(id) {
            return http.get(`/hobbies/users/${id}`);
        }
        
        createuser(data) {
            return http.post("/hobbies/users", data);
        }
        
        updateuser(id, data) {
            return http.put(`/hobbies/users/${id}`, data);
        }
        
        deleteuser(id) {
            return http.delete(`/hobbies/users/${id}`);
        }
        
        deleteAllusers() {
            return http.delete(`/hobbies/users`);
        }

        getAll() {
            return http.get("/hobbies");
        }

        get(id) {
            return http.get(`/hobbies/${id}`);
        }

        create(data) {
            return http.post("/hobbies/", data);
        }

        update(id, data) {
            return http.put(`/hobbies/${id}`, data);
        }

        delete(id) {
            return http.delete(`/hobbies/${id}`);
        }

        deleteAll() {
            return http.delete(`/hobbies`);
        }

}

export default new HobbiesDataService();