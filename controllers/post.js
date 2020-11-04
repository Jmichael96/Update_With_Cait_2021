const Post = require('../models/Post');
const Sub = require('../models/Subscribe');
const sendMail = require('../services/nodemailer');

// @route    POST api/posts/create_post
// @desc     Create a post
// @access   Private
exports.createPost = async (req, res, next) => {
    if (!req.body.title || !req.body.coverImage || !req.body.summary || !req.body.category || !req.body.content) {
        return res.status(406).json({
            serverMsg: 'Please make sure to fill out all the input fields'
        });
    }

    try {
        const post = new Post({
            title: req.body.title,
            coverImage: req.body.coverImage,
            summary: req.body.summary,
            category: req.body.category,
            content: req.body.content,
            authorId: req.user._id,
            authorName: req.user.name,
            like_number: 0
        });
        // assigning the bcc emails to the array to send mail
        const bccArray = [];
        // finding all the subs
        const subs = await Sub.find();

        // iterating over the subs and pushing it to the bccArray
        for (let sub in subs) {
            bccArray.push(subs[sub].email);
        }
        // saving the new post
        const newPost = await post.save();

        for (let i = 0; i < bccArray.length; i++) {
            const html = `
                 <h1 style="color: black; font-size: 30px; text-align: center">Update With Cait</h1>
                <div style="height: auto; width: 100%; justify-content: center; background: #E7D1B1; padding: 8px 0 8px 0;">
                    <h3 style="font-size:24px; text-align: center; color: black;">${newPost.title}</h3>
                    <div style="width: 300px; margin-left: auto; margin-right: auto;">    
                        <p style="text-align:center; font-size: 14px;">${newPost.summary}</p>
                    </div>
                </div>
                <div style="margin-top: 80px;">
                    <p style="text-align:center; font-size: 14px;">New post from The Update. Click below to read the latest blog.</p>
                    <p style="text-align:center;font-size: 14px;"><a href="http://localhost:3000/post_content/${newPost._id}" target="_blank">updatewithcait.com</a></p>
                </div>
                <div style="margin-top: 100px">
                    <p style="text-align:center; color:black; font-size: 11px;">&copy; Copyright</p>
                    <p style="text-align:center; color:black; font-size: 12px;">To unsubscribe click <a target="_blank" href="http://localhost:3000/unsub?user_email=${bccArray[i]}">here</a></p>
                </div>
            `;
            // sending mail 
            sendMail('New post from The Update With Cait', bccArray[i], html, false);
        };

        // returning the successful status
        return res.status(201).json({
            serverMsg: 'Created post successfully',
            post: newPost
        });
    } catch (err) {
        return res.status(500).json({
            serverMsg: 'There was a problem with our server while completing your request. Please try again later'
        });
    };
};

// @route    GET api/posts/fetch_post/:id
// @desc     Fetch a single post
// @access   Public
exports.fetchPost = (req, res, next) => {
    Post.findById({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    serverMsg: 'Post could not be found',
                });
            }
            return res.status(200).json(post);
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    GET api/posts/fetch_lifestyle
// @desc     Fetch lifestyle posts
// @access   Public
exports.fetchLifestyle = (req, res, next) => {
    Post.find({ category: 'Lifestyle' }).sort({ _id: -1 })
        .then((posts) => {
            if (posts.length <= 0) {
                return res.status(404).json({
                    serverMsg: 'No lifestyle posts were found'
                });
            }
            return res.status(200).json({
                serverMsg: 'Fetched lifestyle posts',
                posts: posts
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    GET api/posts/fetch_devotional
// @desc     Fetch devotional posts
// @access   Public
exports.fetchDevotional = (req, res, next) => {
    Post.find({ category: 'Devotional' }).sort({ _id: -1 })
        .then((posts) => {
            if (posts.length <= 0) {
                return res.status(404).json({
                    serverMsg: 'No devotional posts were found'
                });
            }
            return res.status(200).json({
                serverMsg: 'Fetched devotional posts',
                posts: posts
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    GET api/posts/fetch_wellness
// @desc     Fetch wellness posts
// @access   Public
exports.fetchWellness = (req, res, next) => {
    Post.find({ category: 'Wellness' }).sort({ _id: -1 })
        .then((posts) => {
            if (posts.length <= 0) {
                return res.status(404).json({
                    serverMsg: 'No wellness posts were found'
                });
            }
            return res.status(200).json({
                serverMsg: 'Fetched wellness posts',
                posts: posts
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    GET api/posts/fetch_graphics
// @desc     Fetch grahpics posts
// @access   Public
exports.fetchGraphics = (req, res, next) => {
    Post.find({ category: 'Graphics' }).sort({ _id: -1 })
        .then((posts) => {
            if (posts.length <= 0) {
                return res.status(404).json({
                    serverMsg: 'No posts found'
                });
            }
            return res.status(200).json({
                serverMsg: 'Fetched graphics posts were found',
                posts: posts
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    GET api/posts/fetch_recent
// @desc     Fetching the most recent blogs
// @access   Public
exports.fetchRecentBlogs = (req, res, next) => {
    Post.find().sort({ _id: -1 }).limit(3)
        .then((posts) => {
            if (!posts || posts.length <= 0) {
                return res.status(404).json({
                    serverMsg: 'There were no posts found'
                });
            }
            return res.status(200).json({
                serverMsg: 'Fetched recent posts',
                posts
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    PUT api/posts/update_post/:id
// @desc     Update a post
// @access   Private
exports.updatePost = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            serverMsg: 'You are not authorized'
        });
    }

    const postFields = {
        title: req.body.title,
        category: req.body.category,
        summary: req.body.summary,
        coverImage: req.body.coverImage,
        content: req.body.content,
        like_number: req.body.likeNumber,
        comments: req.body.comments
    };

    Post.findByIdAndUpdate(
        { _id: req.params.id, authorId: req.user._id },
        { $set: postFields },
        { new: true, upsert: true }
    )
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    serverMsg: 'Post could not be found'
                });
            }
            return res.status(201).json({
                serverMsg: 'Updated post successfully',
                post
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    DELETE api/posts/delete_post/:id
// @desc     Delete a post
// @access   Private
exports.deletePost = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            serverMsg: 'You are not authorized'
        });
    }
    Post.findByIdAndDelete({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    serverMsg: 'Could not find post and delete it. Please try again later'
                });
            }

            return res.status(200).json({
                serverMsg: 'Deleted post successfully',
                post
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};


// @route    PUT api/posts/add_comment/:id
// @desc     Add a comment to a post
// @access   Public
exports.addComment = (req, res, next) => {
    if (!req.body.authorName || !req.body.content) {
        return res.status(406).json({
            serverMsg: 'Please make sure to enter a name and message'
        });
    }

    Post.findByIdAndUpdate({ _id: req.params.id })
        .then((post) => {
            // creating a new object to push to comments array
            const newComment = {
                authorName: req.body.authorName,
                content: req.body.content
            };

            // adding to the comments array
            post.comments.unshift(newComment);
            post.save();
            const html = `<p>${req.body.authorName} said "${req.body.content}"</p>`;
            sendMail(`New comment on the post '${post.title}'`, process.env.EMAIL, html, false);
            return res.status(201).json({
                serverMsg: 'Added comment successfully',
                post: post,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    DELETE api/posts/delete_comment/:postId/:commentId
// @desc     Delete a comment
// @access   Private
exports.deleteComment = (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
        return res.status(401).json({
            serverMsg: 'You are not authorized'
        });
    }
    console.log('deletePost()');

    Post.findById({ _id: req.params.postId })
        .then((post) => {
            // pull out the comment
            const comment = post.comments.find(
                comment => comment.id === req.params.commentId
            );
            // make sure comment exists
            if (!comment) {
                return res.status(404).json({
                    serverMsg: 'Comment could not be found'
                });
            }
            // get the index of the post
            const commentIndex = post.comments.map(comment => comment._id).indexOf(req.params.commentId);

            // remove the comment
            post.comments.splice(commentIndex, 1);
            post.save();
            return res.status(200).json({
                serverMsg: 'Successfully removed the comment',
                post: post
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'There was a problem with our server in completing your request. Please try again later'
            });
        });
};


// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Public
exports.likePost = (req, res, next) => {
    Post.findByIdAndUpdate({ _id: req.params.id })
        .then((post) => {
            let newLikeNumber = req.body.likeNumber;
            if (!post) {
                return res.status(404).json({
                    serverMsg: 'Post could not be found'
                });
            }
            // if the given like number is greater than the post's like_number
            if (newLikeNumber > post.like_number) {
                post.like_number = newLikeNumber;
            }
            post.save();
            return res.status(201).json({
                serverMsg: 'Post has been liked',
                post: post
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Public
exports.unlikePost = (req, res, next) => {
    Post.findByIdAndUpdate({ _id: req.params.id })
        .then((post) => {
            let newLikeNumber = req.body.likeNumber;
            if (!post) {
                return res.status(404).json({
                    serverMsg: 'Post could not be found'
                });
            }
            // if the given like number is less than the posts like_number
            if (newLikeNumber < post.like_number) {
                post.like_number = newLikeNumber;
            }
            post.save();
            return res.status(201).json({
                serverMsg: 'Post has been unliked',
                post: post
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};