// Document structure of the user database

type User = {
    userID:            string,
    shortID:           string,

    timestamp: {
        init:          number,
        lastUpdated:   number
    },

    lastSeqID:         number,

    email: {
        address:       string,
        verified:      boolean,
        code: {
            token:     string,
            generated: number,
            expiry:    number
        }
    }
};

export { User };
