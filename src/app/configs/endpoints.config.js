export const HttpMethod = {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Patch: "PATCH",
    Delete: "DELETE",
};



const ApiRoutes = {
    auth: {
        signup: { Method: HttpMethod.Post, Endpoint: "auth/sign-up" },
        login: { Method: HttpMethod.Post, Endpoint: "auth/login" },
        reset: { Method: HttpMethod.Post, Endpoint: "auth/reset-password" },
        forget: { Method: HttpMethod.Post, Endpoint: "auth/forget-password" },
        updateProfile: { Method: HttpMethod.Patch, Endpoint: "/user/update-profile" },
        eventHistory: { Method: HttpMethod.Get, Endpoint: "/user/event-history" },

    },

    payment: {
        createPayment: {
            Method: HttpMethod.Post,
            Endpoint: "/user/purchase-ticket"
        }
    },

    membership: {
        getAllMembershipPlan: {
            Endpoint: (params = {}) => {
                const query = new URLSearchParams(params).toString();
                return `/plan/get-all-membership-plans${query ? `?${query}` : ""}`;
            },
            Method: HttpMethod.Get
        },
    }
}
export default ApiRoutes;
