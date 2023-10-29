"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class PostService {
    async getAll() {
        try {
            return (await models_1.Post.find().populate("user").exec());
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getLastTags() {
        try {
            const posts = await models_1.Post.find().limit(5).exec();
            const tags = posts
                .map((post) => post.tags)
                .flat()
                .slice(0, 5);
            return tags;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getById(postId) {
        try {
            const post = (await models_1.Post.findByIdAndUpdate({ _id: postId }, { $inc: { viewsCount: 1 } }, { returnDocument: "after" }).populate("user"));
            if (!post) {
                throw new errors_1.ApiError("Post is not found", 422);
            }
            return post;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async deleteById(postId) {
        try {
            await models_1.Post.findByIdAndDelete({ _id: postId });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async create(dataPost, userId) {
        try {
            const post = (await models_1.Post.create({
                ...dataPost,
                user: userId,
            }));
            return post;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async updateById(updateData, postId) {
        try {
            const updatedPost = (await models_1.Post.findByIdAndUpdate({
                _id: postId,
            }, {
                ...updateData,
            }, { returnDocument: "after" }));
            return updatedPost;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.postService = new PostService();
