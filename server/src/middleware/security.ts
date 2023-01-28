import bcrypt from 'bcryptjs';

export const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

export const comparePassword = (password: string, passwordHash: string) => {
    return Boolean(bcrypt.compareSync(password, passwordHash));
};
