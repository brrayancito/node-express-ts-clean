import jwt from 'jsonwebtoken';



export class JwtAdapter {

    static generateToken(payload: Object, duration: string = '2h'): Promise<String | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, 'SEED', { expiresIn: duration }, (error, token) => {

                if (error) return resolve(null)

                return resolve(token!)
            })
        })
    }

    static validateToken<T>(token: string): Promise<T | null> {

        return new Promise((resolve) => {
            jwt.verify(token, 'SEED', (error, decoded) => {
                if (error) return resolve(null);

                resolve(decoded as T);
            })
        })
    }
} 