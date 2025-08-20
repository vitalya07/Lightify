     
const modal = document.querySelector('.modal'),
      modalTitle = modal.querySelector('.modal__title'),
      btnCart = document.querySelectorAll('.btn-cart'); 

if (modal || btnCart) {
    function showModal(title) {
        modalTitle.textContent = title;
        modal.classList.remove('modal-hide');
        modal.classList.add('modal-show');
    }      

    function hideModal() {
        modal.classList.remove('modal-show');
        modal.classList.add('modal-hide'); 
    }

    btnCart.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productItem = e.target.closest('.products__item');
            if (productItem) {
                const itemTitle = productItem.querySelector('.products__item-title').dataset.name || productItem.querySelector('.products__item').textContent;
                showModal(itemTitle);
            }
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__close')) {
            hideModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        const modalShow = document.querySelector('.modal-show');
        if (e.code === 'Escape' && modalShow) {
            hideModal();
        }
    });
}
const performance = document.querySelector('.performance'),
      headCpec = document.querySelector('.head__spec');
if(performance) {
    function showPerformaneModal() {
        performance.classList.remove('performance-hide');
        performance.classList.add('performance-show');
        document.body.style.overflow = 'hidden'; 
    }       
    function hidePerformaneModal() {
        performance.classList.remove('performance-show');
        performance.classList.add('performance-hide');
        document.body.style.overflow = ''; 
    }  
    headCpec.addEventListener('click', ()=> {
        showPerformaneModal();
    })
    performance.addEventListener('click', (e) => {
        if (e.target === performance || e.target.classList.contains('performance__close')) {
            hidePerformaneModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        const performanceShow= document.querySelector('.performance-show ');
        if (e.code === 'Escape' && performanceShow) {
            hidePerformaneModal();
        }
    });
}
