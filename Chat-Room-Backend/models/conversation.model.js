import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const conversationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  reciever: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
      required: true,
    },
  ],
}, {
    timestamps: true,
});

export const MessageModel = mongoose.model("Message", messageSchema)

export const ConversationModel = mongoose.model("Conversation", conversationSchema);
