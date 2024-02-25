import bcryptjs from "bcryptjs";

class Hash {
    static hashing(password) {
        const saltRounds = 10;
        return bcryptjs.hash(password, saltRounds);
    }

    static verify(password, hash) {
        return bcryptjs.compare(password, hash);
    }
}

export default Hash;
