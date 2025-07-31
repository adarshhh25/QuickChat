import generateToken from "../lib/utils";

const signup = async(req, res) =>{
    const {fullName, email, password, bio} = req.body;
    try {
        if(!fullName || !email || !password || !bio) {
            return res.json({success: false, message: "Some required fields are missing"})
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.json({success: false, message: "User already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, hashedPassword, bio
        })

        const token = generateToken(newUser._id);

        res.json({success: true, user: newUser, token,message: "User created successfully"}); 

    } catch (error) {
        console.error("Error during signup:", error);
        res.json({success: false, message: error.message});   
    }
}


const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const userData = await User.findOne({email});
        if(!userData) {
            return res.json({success: false, message: "User not found"})
        }
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if(!isPasswordValid) {
            return res.json({success: false, message: "Invalid password"})
        }

        const token = generateToken(userData._id);

        res.json({success: true, user: newUser, token, message: "Login successful",}); 

    } catch (error) {
        console.error("Error during login:", error);
        res.json({success: false, message: error.message});
    }
}

export {signup, login};