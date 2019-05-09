let flag = 0, i = 0, conisToView = [], idOut, coinToRemove,AllCoins=[];

$(document).ready(function () {
  //??  localStorage.clear();

    getCoinData()
  // printCoins("https://api.coingecko.com/api/v3/coins/list");
});

$("#homeBtn").click(function () {
    $('#outReports').hide();
    $('#About').hide();
    $('#out').show();
});

$("#liveRepBtn").click(function () {
    // $('#out').html('');
    $('#About').hide();
    $('#out').hide();
    $('#outReports').show();
});

$("#aboutBtn").click(function () {
    $('#out').hide();
    $('#outReports').hide();
    $('#About').show();
});

$("#srchBtn").click(function () {
    $("#out").html('');
   // url = "https://api.coingecko.com/api/v3/coins/" + $("#srchFld").val();
  //  printCoins(url)
    searchCoin($("#srchFld").val())
});


let checkCoinCount = (id) => {
    idOut = id;
    let idUpperCase = id.toString().toUpperCase();
    if ($("#" + id).is(':checked')) {
        conisToView.push(idUpperCase);

        console.log(conisToView);

        if (conisToView.length > 5) {
            $('#coinModal').modal('show');
            $('#modalCoinList').html('');
            for (let i = 0; i < 5; i++) {
                $('#modalCoinList').append(
                    `<div>${conisToView[i]}</div> <label class="switch"><input type="checkbox" id="${conisToView[i]}" onchange="SetremCoin(this.id)"/><div></div></label>`
                )

                if (isNaN(conisToView[i])) {
                    $("#" + conisToView[i]).prop("checked", true)
                } else {
                    let idLowerCase = conisToView[i].toString().toLowerCase();
                    $("#" + idLowerCase).prop("checked", true)
                }

            }
            console.log(conisToView);
        }
    }
    else if ($("#" + id).is(':checked') == false) {
        const index = conisToView.findIndex(conisToView => conisToView === idUpperCase);
        conisToView.splice(index, 1);
        console.log(conisToView)
    }
    updateChart();

};

let SetremCoin = (id) => {
    coinToRemove = id;
}

$("#CancelModalBtn").click(function () {
    $("#" + idOut).attr('checked', false)
    conisToView.splice(-1, 1)
    console.log(conisToView);

});
$("#RemoveCoinBtn").click(function () {
    removeCoin()
});

let removeCoin = () => {
    const index = conisToView.findIndex(conisToView => conisToView === coinToRemove);
    conisToView.splice(index, 1);
    console.log(conisToView);
    alert(coinToRemove);
    let idLowerCase = coinToRemove.toString().toLowerCase();

    $("#" + idLowerCase).prop("checked", false);
    alert(idLowerCase);
    $('#coinModal').modal('hide');
    updateChart();

};

const getCoinData = () =>{
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/list',
        type: "GET",
        beforeSend: function () {
            $("#spinnerSend").show();
        },
        success: function (response) {
            $("#spinnerSend").hide();
            AllCoins=response;
            printCoins()
        }
    });
};

const searchCoin =(searchTerm)=>{
    const result = AllCoins.find( fruit => fruit.symbol === searchTerm );

 //   alert(JSON.stringify(result))
  //  alert(result.id)
   if (typeof result === 'undefined'){
       $('#out').append(
           `<p class="errMsg">Sorry! No such coin, Try again.... </p>`
       )
   }else{


       $('#out').append(
                    `<div class="col-lg-3 col-md-6 SingleColCss">
        <div class="card shadow p-3 mb-5">
            <div class="row no-gutters">
                <div class="col">
                    <div class="card-block px-2">
                       <h4 class="card-title" id="symOut">${result.symbol}</h4><label class="switch"><input type="checkbox" id="${result.symbol}" onchange="checkCoinCount(this.id)" />    <div></div></label>
                       <p class="card-text" ><span id="nameOut">${result.name}</span></p>
                          <div class="collapse" id="N${result.id}"></div>
                                                 <button class="btn btn-info moreBtn" id="${result.id}" onclick="collapseFunc(this.id)" >More Info</button>
             </div>
        </div> `
              )
   }



}

const printCoins = () => {
                AllCoins.forEach(function (element) {
                    $('#out').append(
                        `  
                    <div class="col-lg-3 col-md-6">
                      <div class="card shadow p-3 mb-5 cardCss">
                         <div class="row no-gutters">
                        <div class="col">
                          <div class="card-block px-2">
                             <h4 class="card-title" id="symOut">${element.symbol}</h4><label class="switch"><input type="checkbox"  id="${element.symbol}" onchange="checkCoinCount(this.id)" /> 
                                <div>
                                  </div>
                                   </label>
                             <p class="card-text" ><span id="nameOut">${element.name}</span></p>
                             <div class="collapse" id="N${element.id}"></div>
                              <button class="btn btn-info moreBtn" id="${element.id}" onclick="collapseFunc(this.id)" >More Info</button>
                      </div>
                    </div> `
                    );
                });
};


const updateChart = () => {
    let conisUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + conisToView[0] + "," + conisToView[1] + "," + conisToView[2] + "," + conisToView[3] + "," + conisToView[4] + "&tsyms=USD"
    $.ajax({
        url: conisUrl,
        type: "GET",
        success: function (response) {
            console.log(response[conisToView[0]]);
            console.log(response[conisToView[1]]);
            console.log(response[conisToView[2]]);
            console.log(response[conisToView[3]]);
            console.log(response[conisToView[4]]);

            var dataPoints1 = [];
            var dataPoints2 = [];
            var dataPoints3 = [];
            var dataPoints4 = [];
            var dataPoints5 = [];
            var mainText, coin1, coin2, coin3, coin4, coin5;
            var updateInterval = 2000;

            var options = {
                title: {
                    text: mainText
                },
                axisX: {
                    title: "chart updates every 2 secs"
                },
                axisY: {
                    suffix: " $",
                    includeZero: false
                },
                toolTip: {
                    shared: false
                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    fontSize: 18,
                    fontColor: "dimGrey",
                    itemclick: toggleDataSeries
                },
                data: [{
                    type: "line",
                    xValueType: "dateTime",
                    yValueFormatString: "###.00$",
                    xValueFormatString: "hh:mm:ss TT",
                    showInLegend: (typeof response[conisToView[0]] === 'undefined') ? false : true,
                    dataPoints: dataPoints1
                },
                    {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00$",
                        showInLegend: (typeof response[conisToView[1]] === 'undefined') ? false : true,
                        dataPoints: dataPoints2
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00$",
                        showInLegend: (typeof response[conisToView[2]] === 'undefined') ? false : true,
                        dataPoints: dataPoints3
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00$",
                        showInLegend: (typeof response[conisToView[3]] === 'undefined') ? false : true,
                        dataPoints: dataPoints4
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00$",
                        showInLegend: (typeof response[conisToView[4]] === 'undefined') ? false : true,
                        dataPoints: dataPoints5
                    }]
            };
            var chart = $("#chartContainer").CanvasJSChart(options);

            function toggleDataSeries(e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                }
                else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }

            var time = new Date;
            time.setHours(10);
            time.setMinutes(00);
            time.setSeconds(00);
            time.setMilliseconds(00);

            function updateChart(count) {
                count = count || 1;
                for (var i = 0; i < count; i++) {
                    time.setTime(time.getTime() + updateInterval);

                    dataPoints1.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[0]] === 'undefined') ? 0 : response[conisToView[0]].USD
                    });
                    dataPoints2.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[1]] === 'undefined') ? 0 : response[conisToView[1]].USD
                    });
                    dataPoints3.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[2]] === 'undefined') ? 0 : response[conisToView[2]].USD
                    });
                    dataPoints4.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[3]] === 'undefined') ? 0 : response[conisToView[3]].USD
                    });
                    dataPoints5.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[4]] === 'undefined') ? 0 : response[conisToView[4]].USD
                    });
                }
                options.data[0].legendText = (typeof response[conisToView[0]] === 'undefined') ? "0" : conisToView[0] + " is" + " " + response[conisToView[0]].USD + " USD";
                options.data[1].legendText = (typeof response[conisToView[1]] === 'undefined') ? "0" : conisToView[1] + " is" + " " + response[conisToView[1]].USD + " USD";
                options.data[2].legendText = (typeof response[conisToView[2]] === 'undefined') ? "0" : conisToView[2] + " is" + " " + response[conisToView[2]].USD + " USD";
                options.data[3].legendText = (typeof response[conisToView[3]] === 'undefined') ? "0" : conisToView[3] + " is" + " " + response[conisToView[3]].USD + " USD";
                options.data[4].legendText = (typeof response[conisToView[4]] === 'undefined') ? "0" : conisToView[4] + " is" + " " + response[conisToView[4]].USD + " USD";

                $("#chartContainer").CanvasJSChart().render();
            }

            updateChart(100);
            setInterval(function () {
                updateChart()
            }, updateInterval);
        },

        statusCode: {
            404: function () {
                $("#spinnerSend").hide();
                $('#out').append(
                    `<p class="errMsg">Sorry! No such coin, Try again.... </p>`
                )
            }
        }

    });


};


let collapseFunc = (coinId) => {
    $("#N" + coinId).toggle();
    let url = 'https://api.coingecko.com/api/v3/coins/' + coinId;
    var retrievedObject1 = JSON.parse(localStorage.getItem(coinId));

    if (retrievedObject1 == null) flag = 0;
    if (flag == 0) {
        $.ajax({
            url: url,
            type: "GET",
            beforeSend: function () {
                $("#spinnerSend").show();
            },
            success: function (response) {
                $("#spinnerSend").hide();
                printMoreInfo(coinId, response.image.small, response.market_data.current_price.usd, response.market_data.current_price.eur, response.market_data.current_price.ils)

                var testObject = {
                    'usd': response.market_data.current_price.usd,
                    'eur': response.market_data.current_price.eur,
                    'ils': response.market_data.current_price.ils,
                    'img': response.image.small
                };
                localStorage.setItem(coinId, JSON.stringify(testObject));

                flag = 1;
                setTimeout(() => flag = 0, 120000);
            },

        });

    } else {
        var retrievedObject = JSON.parse(localStorage.getItem(coinId));
        printMoreInfo(coinId, retrievedObject.img, retrievedObject.usd, retrievedObject.eur, retrievedObject.ils)
    }
};

printMoreInfo = (coinId, img, usd, eur, ils) => {
    $("#N" + coinId).html("");
    $("#N" + coinId).append(
        `
                  <img src="${img}"/>
                  <br>
                 <p><b>Conversion Rates </b></p>
                  <p>${usd} <b>USD</b></p>
                 <p>${eur} <b>EUR</b></p> 
                 <p>${ils} <b>ILS</b></p>`
    )
};

