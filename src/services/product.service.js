import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const productEndpoint = "product/";

const ProductService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(productEndpoint + payload._id, payload);
        return data;
    },
    // getCurrentUser: async () => {
    //     const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
    //     return data;
    // },
    put: async (payload) => {
        const { data } = await httpService.put(productEndpoint + payload._id, payload);
        return data;
    },
    getProducts: async (_id) => {
        const { data } = await httpService.get(productEndpoint, {
            params: {
                orderBy: '"create"'
            }
        });
        return data;
    },
};

export default ProductService;
