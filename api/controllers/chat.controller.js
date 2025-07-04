import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const getChats = async (req, res) => {
    const tokenUserId = req.userId;

   
    try {
        const chats = await prisma.chat.findMany({
            where:{
                userIDs:{
                    hasSome: [tokenUserId],
                },
            },
        });

        for(const chat of chats){
            const receiverId = chat.userIDs.find( 
                (id) => id!=tokenUserId
            );

            const receiver = await prisma.user.findUnique({
                where:{
                    id: receiverId,
                },

                select: {
                    id: true,
                    username: true,
                    avatar: true,
                    
                }
            });
            chat.receiver = receiver;
        }
        

        res.status(201).json({ chats});
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: " Failed to get chats" })
    }
}




export const getChat = async (req, res) => {
    const tokenUserId = req.userId;

   
    try {

        const chat = await prisma.chat.findUnique({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome: [tokenUserId],
                },
            },

            include:{
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            }
        }); 

        await prisma.chat.update({
            where:{
                id: req.params.id
            },
            data: {
                seenBy:{
                    push: [tokenUserId]
                }
            }
        })
        res.status(200).json(chat);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: " Failed to get chat" })
    }
}




export const addChat = async (req, res) => {
      const tokenUserId = req.userId;

    
    try {

        const newChat = await prisma.chat.create({
            data:{
                userIDs: [tokenUserId, req.body.receiverId],
            },
        })
        res.status(201).json({ newChat});
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: " Failed to add chat" })
    }
}





    export const readChat = async(req, res) => {
        const tokenUserId = req.userId;
       
        try{
        const chat = await prisma.chat.update({
            where:{
                id: req.params.id,
                userIDs:{
                    hasSome: [tokenUserId],
                },
            },
           data:{
            seenBy:{
                push: [tokenUserId],
            },
           },

        })
         res.status(201).json({ chat});
        }
        catch(err){
            console.log(first)
            res.status(500).json({messge: "Failed to read chat!"})
        }

    }

