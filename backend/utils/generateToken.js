import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    // const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    //     expiresIn: '15d',
    // });

    const accessToken = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_ACCESS,
        { expiresIn: "15d" }
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_REFRESH,
        { expiresIn: "15d" }
    );

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    return { accessToken, refreshToken };
}

export default generateTokenAndSetCookie;