export function validator(data, config) {
    const errors = {};

    function validate(validateMetod, data, config) {
        switch (validateMetod) {
            case "isRequired":
                if (data.trim() === "") return config.message;
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g
                if (!emailRegExp.test(data)) return config.message;
            }
                break;
            default:
                break;
        }
    }

    for (const fieldName in data) {
        for (const validateMetod in config[fieldName]) {
            const error = validate(
                validateMetod,
                data[fieldName],
                config[fieldName][validateMetod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
