document.addEventListener("DOMContentLoaded", function() {
    let selector = document.querySelectorAll(".form-phone");
    if(selector) {
        let im = new Inputmask("+7(999) 999-99-99");
        selector.forEach(sel => {
            im.mask(sel);
        });
    }   
}); 