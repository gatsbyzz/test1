$(function(){
    for (var i =0 ;i< 11;i++){
        $(".card:first-child").clone().appendTo("#cards");

    }
    $("#cards").children().each(function(index){
        $(this).css({
            "left" : ($(this).width() + 20)* (index % 4),
            "top" : ($(this).height() + 20 )* Math.floor(index/4)
        });

        //获取图案
        var pattern = matchingGame.deck.pop();

        $(this).find(".back").addClass(pattern);
        $(this).attr("data-pattern",pattern);
        $(this).click(selectCard);
    });
});

var matchingGame ={};
matchingGame.deck = [
    'cardAK','cardAK',
    'cardAQ','cardAQ',
    'cardAJ','cardAJ',
    'cardBK','cardBK',
    'cardBQ','cardBQ',
    'cardBJ','cardBJ',
];

function shuffle() {
    return 0.5 -Math.random();
}

function selectCard(){
    if ($(".card-flipped") ){
        
    }
}