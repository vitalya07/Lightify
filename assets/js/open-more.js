const productHide = document.querySelectorAll('.hide__element');
const btnNextMore = document.querySelectorAll('.product-information__item-next');

function showHiddenElement(index) {
    productHide[index].classList.toggle('product-information__hide');
}

btnNextMore.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        showHiddenElement(index);
    });
});
