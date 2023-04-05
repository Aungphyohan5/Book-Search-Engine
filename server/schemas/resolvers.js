const { User } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
                    .populate("books");
                return userData;
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    },


    Mutation: {
        createUser: async (parent, args) => {
            const newUser = await User.create(args);
            const token = signToken(newUser);
            return { token, newUser };
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

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet:
                            { savedBooks: bookData }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate("books");
                return updatedUser;
            }
            throw new AuthenticationError('you need to be logged in!')
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true },

                );
                return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
}


module.exports = resolvers;