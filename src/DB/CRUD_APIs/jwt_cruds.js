const jwt = require("jsonwebtoken");
const { RefreshToken, User } = require("../models/users.model");

const _1m = 60;
const _1h = 60 * _1m;
const _3h = 3 * _1h;
const _30min = 30 * _1m;

const create = async (user_id, time = "1h") => {
    await user_id;
    let t = "";
    switch (time) {
        case "1h":
            t = "3600s";
            break;
        case "3h":
            t = "10800s";
            break;
        case ".5h":
            t = "1800s";
            break;
        default:
            return create(user_name, ".5h");
    }

    const token = await RefreshToken.create({
        owner: user_id.toString(),
        time_out: t,
    });
    const jwt_token = jwt.sign({ token_id: token.id }, process.env.JWT_SECRET, {
        expiresIn: t,
    });

    return jwt_token;
};
const read = (token) => {
    return new Promise((resolve, rej) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return rej({ success: false, error: err });

            resolve({ success: true, data: user, error: "" });
        });
    });
};

const fetch_timeout = async (token_data) => {
    console.log(token_data);
    const token = await RefreshToken.findById(token_data.token_id);
    if (!token) {
        return {
            success: false,
            valid_token: false,
        };
    }
    const token_created_t = new Date(token.createdAt).getTime() / 1000;
    const current_t = new Date().getTime() / 1000;
    const time_diff = current_t - token_created_t;

    if (time_diff < _30min) return { success: true, valid_token: true };
    switch (token_data.time_out) {
        case "3600s":
            if (time_diff < _1h) return { success: true, valid_token: true };
        case "10800s":
            if (time_diff < _3h) return { success: true, valid_token: true };

        default:
            return { success: false, valid_token: false };
    }
};

const check_request = async (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
        return { success: false, error: "no authentication token" };
    try {
        const t = await read(token);
        if (t.sucess) {
            const { valid_token } = await fetch_timeout(t.data);
            if (valid_token) {
                return { success: true, error: "" };
            }
        }
    } catch (err) {
        console.log(err);
    }
    return { success: false, error: "invalid token" };
};

const refresh_RefreshToken_store = async () => {
    const allTokens = await RefreshToken.find({}).limit(1000).exec();
    if (allTokens.length <= 1) return { success: true, refreshTokens: "empty" };

    const HasOwner = async (id) => {
        try {
            const user = await User.find({ id: id }).select("full_name").exec();
            return user ? true : false;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    for (let tok of allTokens) {
        HasOwner(tok.owner).then((v) => {
            if (!v)
                RefreshToken.deleteMany({ _id: tok._id }).then((v) =>
                    console.log(`${tok._id} deleted: no owner`)
                );

            fetch_timeout(tok).then((v) => {
                if (!v.success)
                    RefreshToken.deleteMany({ _id: tok._id }).then((v) =>
                        console.log(`${tok._id} deleted: timed out`)
                    );
            });
        });
    }
};

refresh_RefreshToken_store().then((v) => console.log(v));
setInterval(refresh_RefreshToken_store, 1800 * 1000);

module.exports = {
    CreateToken: create,

    CheckRequest: check_request,
};
