import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method != 'POST') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req);
        const { body } = req.body;
        const { postId } = req.query;

        if (!postId || typeof postId != 'string') {
            throw new Error("Invalid id");
        }
        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            }
        });
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                }
            });
            if (post?.userId && post?.userId != currentUser?.id) {
                await prisma.notification.create({
                    data: {
                        userId: post.userId,
                        body: `${currentUser?.username} replied to your tweet!`
                    }
                });
                await prisma.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
        return res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}