const passport = require('passport');
const {Strategy: KakaoStrategy} = require('passport-kakao');
const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile);
        try {
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' }
            });
            if (exUser) {
                // 세션에 accessToken 저장
                exUser.accessToken = accessToken;
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json?.kakao_account?.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                    profilePhoto: profile._json?.properties?.profile_image,
                });
                newUser.accessToken = accessToken; // 새 사용자 객체에 accessToken 추가
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id } });
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};