$(function() {
    $('[data-toggle]').on('click', function(e){
        e.preventDefault();
        let element = $(this).data('toggle');

        $('[data-' + element + ']')
        .toggleClass(element + '-active');
    })});