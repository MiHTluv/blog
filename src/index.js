const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

//import file từ thư mục routes
const route = require('./routes');

// __dirname: đường dẫn tuyệt đối đến thư mục chứa mã JavaScript hiện tại
//cấu hình middleware để phục vụ tệp tĩnh từ thư mục
app.use(express.static(path.join(__dirname, 'public')));

//2 cái midleware phân tích yêu cầu->đặt dữ liệu vào req.body
// nó giúp phân tích các yêu cầu từ client được gửi dưới dạng application/x-www-form-urlencoded và đặt dữ liệu đã được phân tích vào thuộc tính req.body của các yêu cầu.
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//òng này cấu hình một middleware để phân tích các yêu cầu dạng JSON
app.use(express.json());

//HTTP logger
//app.use(morgan('combined'));
//Template engine để render trang web
app.engine(
    'hbs',
engine({
        extname: '.hbs',
}),
);
app.set('view engine', 'hbs');
//Đây là trên window thì \\, còn cái khác thì không biết
app.set('views', path.join(__dirname, 'resources\\views'));

route(app);
/*
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});

app.get('/search', (req, res) => {
  // console.log(req.q)
  res.render('search');
});
app.post('/search', (req, res) => {
  console.log(req.body)
  res.send('');
});
*/
//Home, search, contact: không có tài ng cụ thể
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
