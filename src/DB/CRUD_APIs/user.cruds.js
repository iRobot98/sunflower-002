const { User } = require("../models/users.model");

const CRUD_User = {
    create: async (data) => {
        const user = await CRUD_User.find(data);

        console.log(user);
        if (user) {
            return { success: false, error: "user exists" };
        }

        const newUser = User.create({
            full_name: {
                first_name: data.firstname,
                middle_name: data.middlename,
                last_name: data.lastname,
            },
            date_of_birth: data.DataOfBirth,
            phone_number: [data.phonenumber],
            email: [data.email],
            user_name: data.username,
            /*
    password: 'Passw0rd',
    confirmPassword: 'Passw0rd'
  }
            */
        });
        return { success: false, error: "user doesn't exist" };
    },
    find: async (data) => {
        let query = {};
        if (data.username) query.user_name = data.username;
        if (data.email) query.email = data.email;
        if (data.phonenumber) query.phone_number = data.phonenumber;
        const user = await User.findOne(query).exec();
        // console.log(user);
        return user;
    },
    read: () => {},
    update: () => {},
    delete: () => {},
};

module.exports = CRUD_User;
