


$("document").ready(function(){

var ctx = document.getElementById("stocks").getContext('2d');

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
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
        label: 'StockName',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
    }, {
        label: '# of Votes',
        data: [3, 4, 5, 4, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)'
        ],
        borderWidth: 1
    }]
},
options: options
});
})
