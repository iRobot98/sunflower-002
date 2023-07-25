const { User } = require("../models/users.model");

const CRUD_User = {
    create: (data) => {
        const user = CRUD_User.find(data);

        if (user) {
            return { success: false, error: "user exists" };
        }

        return { success: false, error: "route doesn't exist" };
    },
    find: async (data) => {
        let query = {};
        if (data.username) query.user_name = data.username;
        if (data.email) query.email = data.email;
        if (data.phonenumber) query.phone_number = data.phonenumber;
        const user = await User.findOne(query).exec();
        return user;
    },
    read: () => {},
    update: () => {},
    delete: () => {},
};

module.exports = CRUD_User;
