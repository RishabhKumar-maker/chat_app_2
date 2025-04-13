import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    // const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    //     expiresIn: '15d',
    // });

    const accessToken = jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15d" }
    );


    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    
    // console.log("Generated accessToken payload:", { userId });
    // console.log("JWT_SECRET_USED:", process.env.ACCESS_TOKEN_SECRET);


    // return { accessToken };
}

export default generateTokenAndSetCookie;