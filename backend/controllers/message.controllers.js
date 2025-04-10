import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";
export const sendMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const { message } = req.body;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants: {$all:[senderId, receiverId]}   
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage)
        {
            conversation.messages.push(newMessage._id);
        }
            await newMessage.save();
            await conversation.save();
        // }
        // else
        // {
        //     return res.status(400).json({message: "Message not sent"})
        // }
        res.status(200).json(newMessage);


    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in sendMessage controller ",error.message)
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:UserToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: {$all:[senderId, UserToChatId]}   
        }).populate("messages");

        if(!conversation){
            return res.status(404).json({message: "No conversation found"})
        }
        res.status(200).json(conversation.messages);
        

    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in getMessages controller ",error.message)
    }
}
