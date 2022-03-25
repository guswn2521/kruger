import { User } from '../db';
import jwt from 'jsonwebtoken';

class KakaoService {
    static async addKakaoUser(userInfo) {
        const user = await User.create(userInfo);
        console.log('kakao user sign in.');
        return user;
    }

    static async checkUser(userInfo) {
        const email = userInfo.email;
        const id = userInfo.id;
        let user = await User.findByEmail({ email });
        const loginMethod = userInfo.loginMethod;
        // 카카오 인증은 거쳤으니까 이미 이메일이 등록된 유저라면 깃허브로 회원가입한 유저.
        // 토큰발급해서 로그인 시킴.
        if (user && user.loginMethod === loginMethod) {
            const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
            const token = jwt.sign({ user_id: id }, secretKey);
            const { password, ...refinedUser } = user._doc;
            user._doc = { ...refinedUser, token };
            console.log('kakao user log in.');
            return user;
        } else if (user) {
            const errorMessage =
                '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
            throw new Error(errorMessage);
        }

        // 이메일이 등록안됐으면 처음 깃허브로 회원가입하는 유저.
        user = await this.addKakaoUser(userInfo);
    }
}
export { KakaoService };
