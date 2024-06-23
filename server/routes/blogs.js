const fs = require('fs');
const express = require('express');
const router = express.Router();

const blogParentDirectory = "./res/blogs";

const blogExists = (blogName) => {
    const blogPath = blogParentDirectory + "/" + blogName + ".json";
    console.log(blogPath);
    if (fs.existsSync(blogPath))
        return true;
    else
        return false;
}

const getBlog = (blogName) => {
    try {
        const blogPath = blogParentDirectory + "/" + blogName + ".json";
        const data = fs.readFileSync(blogPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}

router.get("/:blogName", (req, res) => {
    let blogName = req.params.blogName;

    if (blogExists(blogName)) {
        let blog;
        if (blog = getBlog(blogName)) {
            res.send(blog);
        } else {
            res.status(500).send("Something went wrong");
        }
    } else {
        res.status(404).send("Blog doesn't exist");
    }
})

module.exports = router;