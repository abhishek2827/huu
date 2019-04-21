$(document).ready(function () {
  //  $("#allBtn").click(function () {
    //    $("#out").html('');
    //    url = "https://api.coingecko.com/api/v3/coins/list";
    //    printCountry(url)
   // });

 //   $("#cInput").keypress(function () {
   //     $("#out").html('');
   //     url = "https://restcountries.eu/rest/v2/name/" + $("#cInput").val();
   //     printCountry(url)
  //  });

    $("#searchBtn").click(function () {
        $("#out").html('');
        url = "https://api.coingecko.com/api/v3/coins/" + $("#cInput").val();
        printCountry(url)
    });

let i;
    let printCountry = (url) => {
        $.ajax({
            url: url,
            type: "GET",
            beforeSend: function () {
                $("#spinnerSend").show();
            },
            success: function (response) {
                $("#spinnerSend").hide();

                response.forEach(function (element) {
                    $('#out').append(
                        `        <div class="card col-md-3 cardCss">
            <div class="row no-gutters">
                <div class="col-auto">
                    <img src="${element.flag}" class="img-fluid" alt="">
                </div>
                <div class="col">
                    <div class="card-block px-2">
                        <h4 class="card-title" id="symOut">${element.symbol}</h4><label class="switch"><input type="checkbox" />    <div></div>
  </label>
                        <p class="card-text" ><span id="nameOut">${element.name}</span></p>
                    <button class="btn btn-info moreBtn" >More Info</button>
  
                    </div>
                </div>
            </div>
        </div>

`
                    )
                    i++;

                });
            },

        });
    }

    printCountry( "https://api.coingecko.com/api/v3/coins/list");

});