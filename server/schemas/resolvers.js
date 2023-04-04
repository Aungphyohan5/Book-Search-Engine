const { Book, User } = require('../models/index')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {

        users: async () => {
            return User.find().populate('saveBooks');
        },


        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('saveBooks');
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    },


    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const newUser = await User.create({ username, email, password })
            const token = signToken(newUser);
            return (token, newUser);
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email')
            }

            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    context.user._id,
                    {
                        $addToSet: {
                            saveBooks: { bookId, authors, description, title, image, link }
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }.populate('saveBooks')
                )
            }
            throw new AuthenticationError('you need to be logged in!')
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndDelete(
                    context.user._id,
                    { $pull: { saveBooks: { bookId } } },
                    { new: true },

                ).populate('savedBooks');
                return updatedUser
            } else {
                throw new AuthenticationError('You need to be logged in!');
            }

        },
    }
}


module.exports = resolvers;