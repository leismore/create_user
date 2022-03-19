// Document structure of the user_authentication database

type UserAuthentication = {
    userID:        string,
    active:        boolean,

    password: {
        chars:     string,
        generated: number,
        expiry:    number | null
    },

    token: {
        chars:     string,
        generated: number,
        expiry:    number | null
    }
};

export { UserAuthentication };
