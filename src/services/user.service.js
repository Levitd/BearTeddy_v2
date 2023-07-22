import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const UserService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
        return data;
    },
    put: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    getUser: async (_id) => {
        const { data } = await httpService.get(userEndpoint, {
            params: {
                orderBy: '"_id"',
                equalTo: `"${_id}"`
            }
        });
        return data;
    },
};

export default UserService;
