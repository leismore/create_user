// Document structure of the user_authentication database

type UserAuthentication = {
    userID:        string,
    active:        boolean,

    password: {
        chars:     string,
        generated: number,
        expiry:    number
    },

    token: {
        chars:     string,
        generated: number,
        expiry:    number
    }
};

export { UserAuthentication };
