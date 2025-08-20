function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: data 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    });
}

const buyButtons = document.querySelectorAll('.btn-cart'); 
const modalWindow = document.querySelector('.modal'); 
const productModalTitle = modalWindow.querySelector('.modal__title'); 
const forms = document.querySelectorAll('.modal__form'); 


const successModal = document.querySelector('.modal__succes');
const errorModal = document.querySelector('.modal__error');


function showModal(modal) {
    modal.classList.remove('modal-hide');
    modal.classList.add('modal-show');
    

    setTimeout(() => {
        hideModal(modal);
    }, 2000);
}


function hideModal(modal) {
    modal.classList.remove('modal-show');
    modal.classList.add('modal-hide');
}


buyButtons.forEach(button => {
    button.addEventListener('click', () => {

        const productName = button.getAttribute('data-product-name');

        productModalTitle.textContent = productName;

        modalWindow.classList.remove('modal-hide');
        modalWindow.classList.add('modal-show');


        buyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});


forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });


        const activeButton = document.querySelector('.btn-cart.active');
        if (activeButton) {
            const productName = activeButton.getAttribute('data-product-name');
            object['product-name'] = productName;
        }


        postData('mail.php', JSON.stringify(object))
            .then(() => {

                hideModal(modalWindow); 
                showModal(successModal); 
                form.reset(); 
            })
            .catch(() => {

                hideModal(modalWindow); 
                showModal(errorModal); 
            });
    });
});


const closeButtons = document.querySelectorAll('.modal__close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        hideModal(successModal);
        hideModal(errorModal);
    });
});
