import { Chat } from '../models/chat.model.js'
import { Conversation } from '../models/conversation.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import ErrorHandler from '../utils/errorHandler.js'

export const createChat = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id
  console.log(userId)
    const chat = await Chat.create({
      user: userId,
    })

    return res.status(200).json(new ApiResponse(200, chat, 'new chat created'))
  } catch (error) {
    next(error)
  }
})

export const getAllChats = asyncHandler(async (req, res, next) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).sort({
      createdAt: -1,
    })
    if (!chats || chats?.length === 0) {
      return new ErrorHandler('No Chat Found', 404)
    }
    return res
      .status(200)
      .json(new ApiResponse(200, chats, 'All Chats Fetched'))
  } catch (error) {
    next(error)
  }
})

export const addConversation = asyncHandler(async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)

    if (!chat) return new ErrorHandler('No Chat Found', 404)

    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
    })

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true },
    )

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { conversation, updatedChat },
          'new conversation added',
        ),
      )
  } catch (error) {
    next(error)
  }
})

export const getConversation = asyncHandler(async (req, res, next) => {
  try {
    const conversation = await Conversation.find({ chat: req.params.id })

    if (!conversation) return new ErrorHandler('No conversation Found', 404)

    return res
      .status(200)
      .json(new ApiResponse(200, conversation, 'all conversation fetched'))
  } catch (error) {
    next(error)
  }
})

export const deleteChat = asyncHandler(async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
    if (!chat) {
      return new ErrorHandler('No Chat Found', 404)
    }
    if (chat.user.toString() !== req.user.id.toString()) {
      return new ErrorHandler('Not Authorized To Delete Chat', 400)
    }

    await Conversation.deleteMany({ chat: chat._id })

    await chat.deleteOne()

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'chat deleted sucessfully'))
  } catch (error) {
    next(error)
  }
})
