const socket = io.connect();

const productForm = $('#productForm');
const productTitle = productForm.find('[name="title"]');
const productPrice = productForm.find('[name="price"]');
const productThumbnail = productForm.find('[name="thumbnail"]');
const sendProductBtn = productForm.find('#sendProductBtn');

productForm.on('submit', (e) => {
    e.preventDefault();

    const product = {
        title: productTitle.val(),
        price:productPrice.val(),
        thumbnail: productThumbnail.val()
    };

    socket.emit('newProduct', product);
    productForm[0].reset();
})

socket.on('products', products => {
    console.log(products);
    getProductsLayout(products).then(html => {
        const container = $('#products');
        container.html(html);
    })
});

function getProductsLayout(products) {
    return fetch('views/layouts/productsList.hbs')
        .then(response => response.text())
        .then(layout => {
            const template = Handlebars.compile(layout);
            const html = template({products});

            return html;
        });
}

const messageForm = $('#messageForm');
const messageEmail = messageForm.find('[name="email"]');
const messageText = messageForm.find('[name="text"]');
const sendMessageBtn = messageForm.find('#sendMessageBtn');

messageText.prop('disabled', true);
sendMessageBtn.prop('disabled', true);

messageForm.on('submit', (e) => {
    e.preventDefault();

    const message = { 
        author: messageEmail.val(),
        text: messageText.val()
    }

    socket.emit('newMessage', message);

    messageForm[0].reset();
    messageText.prop('disabled', true);
    sendMessageBtn.prop('disabled', true);
})

socket.on('messages', (messages) => {
    getMessagesLayout(messages).then(html => {
        const container = $('#messages');
        container.html(html);
    })
})

function getMessagesLayout(messages) {
    return fetch('views/layouts/messagesList.hbs')
        .then(response => response.text())
        .then(layout => {
            const template = Handlebars.compile(layout);
            const html = template({messages});

            return html;
        });
}

messageEmail.on('keyup', () => {
    const hasEmail = messageEmail.val();
    const hasText = messageText.val();

    messageText.prop('disabled', !hasEmail);
    sendMessageBtn.prop('disabled', !hasEmail || !hasText);
});

messageText.on('keyup', () => {
    const hasText = messageText.val();

    sendMessageBtn.prop('disabled', !hasText);
});