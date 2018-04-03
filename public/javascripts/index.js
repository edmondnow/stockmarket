var currentLabels = []//determine current labels up to a year
var currentStocks = []; //containers always the last logged stocks


(function getLabels(){
    $.ajax({
        type: 'POST',
        url: "/getlabels",
        data: {stock: 'MSFT'},
        success: function(data){
            currentLabels = data.dataKeys.reverse();
            makeChart();
        },
        error: function(error){
            console.log(error)
        }
        });
})();






$('#submit').click(function(){
    var stock = $("#stock").val();
    $.ajax({
        type: 'POST',
        url: "/getstock",
        data: {stock: stock, labels: currentLabels},
        success: function(data){
        currentStocks.push({
            label: data.name,
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            data: data.dataValues,
            borderWidth: 1

        });
         makeChart();
         addCont(data.name)
        },
        error: function(error){
            console.log(error)
        }
        });
});






function addCont(name){
    var stockContainer = '<div class="stock-container">'
    stockContainer += '<i class="fa fa-times"></i>'
    stockContainer += '<h1 class="name">' + name + '</h1>'
    stockContainer += '<p class="desc">' + 'desciprtion var' + '</p>'
    stockContainer += '</div>'
    $('.stocks-container').prepend(stockContainer)
}







function makeChart(labels, stocks){

    var ctx = $('#stocks');

    var options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          stacked: true,
          gridLines: {
            display: true,
            color: "rgba(255,99,132,0.2)"
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      }
    }

    var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:currentLabels,
        datasets: currentStocks
    },

    options: options
    });


}


