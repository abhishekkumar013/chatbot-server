import express from 'express'
import {
  addConversation,
  createChat,
  deleteChat,
  getAllChats,
  getConversation,
} from '../controllers/chat.controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'

const router = express.Router()

router.use(isAuthenticated)
router.route('/new').post(createChat)

router.route('/all').get(getAllChats)

router
  .route('/:id')
  .post(addConversation)
  .get(getConversation)
  .delete(deleteChat)

export default router
