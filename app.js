const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));



const blogPosts = [];


app.get('/', (req, res) => {
    res.render('main', { blogPosts });
});


app.get('/create', (req, res) => {
    res.render('createpost');
});


app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const date = new Date().toDateString(); 
    const newPost = {
        id: blogPosts.length + 1, 
        title,
        content,
        date,
    };
    blogPosts.push(newPost);
    res.redirect('/');
});


app.get('/blog/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const blogPost = blogPosts.find((post) => post.id === postId);
    if (blogPost) {
        res.render('blogpost', { blogPost });
    } else {
        res.status(404).send('Blog post not found');
    }
});
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
