const socket = io.connect();

const compressionPercent = $('#compressionPercent');

const productForm = $('#productForm');
const productTitle = productForm.find('[name="title"]');
const productPrice = productForm.find('[name="price"]');
const productThumbnail = productForm.find('[name="thumbnail"]');
const sendProductBtn = productForm.find('#sendProductBtn');

const authorSchema = new normalizr.schema.Entity('author');
const messageSchema =  new normalizr.schema.Entity('message', {
    author: authorSchema
}, {idAttribute: '_id'});
const messagesSchema = new normalizr.schema.Entity('messages', {
    messages: [messageSchema]
});

productForm.on('submit', (e) => {
    e.preventDefault();

    const product = {
        title: productTitle.val(),
        price: productPrice.val(),
        thumbnail: productThumbnail.val()
    };

    socket.emit('newProduct', product);
    productForm[0].reset();
})

socket.on('products', products => {
    getProductsLayout(products).then(html => {
        const container = $('#products');
        container.html(html);
    })
});

function getProductsLayout(products) {
    return fetch('/views/layouts/productsList.hbs')
        .then(response => response.text())
        .then(layout => {
            const template = Handlebars.compile(layout);
            const html = template({products});

            return html;
        });
}

const messageForm = $('#messageForm');
const messageEmail = messageForm.find('[name="email"]');
const messageName = messageForm.find('[name="name"]');
const messageLastname = messageForm.find('[name="lastname"]');
const messageAge = messageForm.find('[name="age"]');
const messageAlias = messageForm.find('[name="alias"]');
const messageAvatar = messageForm.find('[name="avatar"]');
const messageText = messageForm.find('[name="text"]');
const sendMessageBtn = messageForm.find('#sendMessageBtn');

messageForm.on('submit', (e) => {
    const dateTime = new Date;

    e.preventDefault();

    const message = { 
        author: { 
            id: messageEmail.val(),
            name: messageName.val(),
            lastName: messageLastname.val(),
            age: messageAge.val(),
            alias: messageAlias.val(),
            avatar: messageAvatar.val()
        },
        text: messageText.val(),
        dateTime: dateTime.toDateString()
    }

    socket.emit('newMessage', message);

    messageForm[0].reset();
})

socket.on('messages', (messages) => {
    const denormalizeMessages = normalizr.denormalize(messages.result, messagesSchema, messages.entities);

    let percentage = (((JSON.stringify(messages).length - JSON.stringify(denormalizeMessages.messages).length) / JSON.stringify(messages).length) * 100);

    compressionPercent.text(percentage.toFixed(2));

    getMessagesLayout(denormalizeMessages.messages).then(html => {
        const container = $('#messages');
        container.html(html);
    })
})

function getMessagesLayout(messages) {
    return fetch('/views/layouts/messagesList.hbs')
        .then(response => response.text())
        .then(layout => {
            const template = Handlebars.compile(layout);
            const html = template({messages});

            return html;
        });
}