"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const services_1 = require("../services");
class PostController {
    async getAll(req, res, next) {
        try {
            const posts = await services_1.postService.getAll();
            return res.json(posts);
        }
        catch (e) {
            next(e);
        }
    }
    async getLastTags(req, res, next) {
        try {
            const tags = await services_1.postService.getLastTags();
            return res.json(tags);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { postId } = req.params;
            const posts = await services_1.postService.getById(postId);
            return res.json(posts);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { postId } = req.params;
            await services_1.postService.deleteById(postId);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const userId = req.res.locals.tokenPayload._id;
            const postData = req.body;
            const post = await services_1.postService.create(postData, userId);
            return res.status(200).json(post);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            const { postId } = req.params;
            const updateData = req.body;
            const updatedPost = await services_1.postService.updateById(updateData, postId);
            return res.status(200).json(updatedPost);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.postController = new PostController();
