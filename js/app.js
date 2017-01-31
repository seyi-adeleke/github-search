/**
 * Created by seyi adeleke on 12/1/2016.
 */
$(document).ready(function(){
    var resultsList = $("#resultsList");
    var errors = $("#errors");
    var searchCallback = function(){
        $(".fa-github").addClass("loader");
        var searchPhrase = $("#searcher").val();
        var langChoice = $("#langChoice").val();
        if(searchPhrase){
            var url = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);
            if(langChoice !="All"){
                url += "+language:"+ encodeURIComponent(langChoice);
            }
            $.getJSON(url,function(){
                console.log(url);
            }).done(function(r){
                $(".fa-github").removeClass("loader");

                if(r.total_count > 0){
                    displayResults(r.items);
                }
                else{
                    displayError("Sorry Your Search Query Returned Nothing.");
                }
            }).fail(function(){
                displayError("Sorry Your Search Query Returned Nothing.");
            });

            function displayResults(results){
                resultsList.empty();
                errors.empty();
                $.each(results,function(i,items){
                    var newResult = $(
                        "<div  class='result'>"+
                        "<div  class='result-text-left'>"+
                        "<div class='title'><b>Project name: </b>"+ items.name+"</div>"+
                        "<div><b>Description: </b>"+ items.description+"</div>"+
                        "<div><b>Owner: </b>" + items.owner['login']+ "</div>"+
                        "</div>"+
                        "<div class='result-text-right'>"+
                        "<div><b> Language:</b> " + items.language +"</div>"+
                        "<div><b>Forks: </b>" + items.forks + "</div>" +
                        "<div><b>Stars: </b>"+ items.stargazers_count+"</div>"+
                        "<span>"+"<a target='_blank' href="+items.html_url+">"+ "Go To Repo" +"</a>"+"</span>"+
                        "</div>"+
                        "</div>"

                    );

                    resultsList.append(newResult);
                });

            }


        }

        else{
            $(".fa-github").removeClass("loader");
            displayError("You didn't input a search query");
        }

    };

    function displayError(msg){
        errors.empty();

        resultsList.empty();
        var error = $("<div>"+"<h1>" +msg +"</h1>"+"</div>");
        errors.append(error);
    }
    $("#searcher").keypress(function() {
        if (event.which == 13) {
            searchCallback();
        }
    });

    $('#search-button').click(searchCallback);


});