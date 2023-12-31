import httpService from "./http.service";

const activeAutorEndpoint = "user/";

const ActiveAutorService = {
    getAutorById: async (_id) => {
        const { data } = await httpService.get(activeAutorEndpoint, {
            params: {
                orderBy: '"_id"',
                equalTo: `"${_id}"`
            }
        });
        return data;
    },
};

export default ActiveAutorService;
