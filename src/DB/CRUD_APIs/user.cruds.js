const argon2 = require("argon2");
const { User } = require("../models/users.model");
const { CreateToken } = require("./jwt_cruds");
const { check_signin } = require("../../api/authentication/sign_up_auth");

const FindUser = async (data) => {
    let query = {};
    if (data.username) query.user_name = data.username;
    if (data.email) query.email = data.email;
    if (data.phonenumber) query.phone_number = data.phonenumber;
    const user = await User.findOne(query).exec();
    // console.log(user);
    return user;
};

const GenPassword = async (password) => {
    return await argon2.hash(password);
};

const VerifyPassword = async (password_attempt, password) => {
    return await argon2.verify(password, password_attempt);
};

const CreateUser = async (data) => {
    const user = await FindUser(data);

    // console.log(user);
    if (user) {
        return { success: false, error: "user exists" };
    }

    const proto_user = {
        full_name: {
            first_name: data.firstName,
            middle_name: data.middleName,
            last_name: data.lastName,
        },
        date_of_birth: data.DateOfBirth,
        phone_number: [data.phoneNumber],
        email: [data.email],
        user_name: data.userName,

        password: await GenPassword(data.password),
    };
    // console.log(proto_user);
    try {
        const newUser = User.create(proto_user);
        const return_value = newUser.then((val) => {
            console.log("createdAt: ", val.createdAt);
            return CreateToken(val._id).then((token) => ({
                success: true,
                createdUser: val,
                token: token,
            }));
        });

        return_value.then((v) => console.log(v));
        return await return_value;
    } catch (err) {
        console.log(err);
        return { success: false, error: "user couldn't be created, try again" };
    }
};

const LogInUser = async ({ username, password }) => {
    const { success, type } = check_signin({ username });
    if (success) {
        switch (type) {
            case "email":
                const user = await User.findOne({ email: username }).select(
                    "+password"
                );
                if (!user) {
                    return { success: false, error: "Email not recognised" };
                }

                const correct_password = await VerifyPassword(
                    password,
                    user.password
                );

                user.depopulate("password");
                if (!correct_password) {
                    return { success: false, error: "Incorrect Password" };
                }

                const jwt_token = await CreateToken(user._id);
                return {
                    success: true,
                    user,
                    token: jwt_token,
                };
        }
    }

    return { success: false, error: "Please use username, email, or password" };
};

const read = () => {};
const update = () => {};
const deleteUser = () => {};

module.exports = {
    CreateUser,
    FindUser,
    LogInUser,
};
