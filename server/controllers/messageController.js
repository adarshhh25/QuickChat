import User from "../models/User.js";
import Message from "../models/Message.js"

//Get all users except the logged in user
const getUsersForSidebar = async (req, res) => {
      try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        //Count number of message not seen
        const unseenMessages = {}

        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})

            if(messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }
        }) 

        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessages})
      } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
      }     
}

//Get all messages for selected user
const getMessages = async (req, res) => {
      try {
        const {id: selectedUser} = req.params;
        const myId = req.user._id;
        const messages =  await Message.find({
            $or: [
                {senderId: selectedUser, receiverId: myId},
                {senderId: myId, receiverId: selectedUser}
            ]})
        
        await Message.updateMany({senderId: selectedUser, receiverId: myId}, {seen: true});
            
        res.json({success: true, message: messages})
      } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
      }
}

export {getUsersForSidebar}