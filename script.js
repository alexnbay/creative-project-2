function createHTMLfromArtTime(item){



    let image_source = item.edmPreview[0];
    let image_title = '';
    let image_creator = '';
    let image_country = '';
    let image_description = '';
    let image_provider = '';

    if(item.title)
      image_title = item.title[0];
    else {
      image_title = "No Title";
    }
    if(item.dcCreator)
      image_creator = item.dcCreator[0];
    else {
      image_creator = 'No Creator';
    }
    if(item.country)
      image_country = item.country[0];
    else {
      image_country = "No Country";
    }
    if(item.dcDescription)
      image_description = item.dcDescription[0];
    else {
      image_description = "No Description";
    }
    if(item.provider)
      image_provider = item.provider[0];
    else {
      image_provider = "No Provider";
    }


    let html = '';

    html += '<div class="art_title">';
    html += '<h3> <strong>' + image_title  + '</strong></h3>';
    html += '</div>';

    html += '<div class="art_creator">';
    html +=  '<p> created by <strong><em>' + image_creator + '</em></strong></p>';
    html += '</div>';


    html += '<div class="art_country">';
    html +=  '<p> from <i>' + image_country + '</i></p>';
    html += '</div>';

    html += '<div class= "art_description">';
    html += '<p> ' + image_description + ' </p>';
    html += '</div>'

    html += '<div class="image_container art_image">';
    html += '<img src="' + image_source + '">';
    html += '</div>';


    html += '<div class="art_provider">';
    html += '  <p><i>Thanks to ' + image_provider +'</i></p>';
    html += '</div>';

    return html;
}







console.log("started");

document.getElementById("submitSearch").addEventListener("click", function(event) {
  event.preventDefault;

  console.log("clicked submit");

  let value = document.getElementById("searchInput").value
  console.log(value);
  const url = "https://api.europeana.eu/record/v2/search.json?query=" + value.replace(" ", "+") + "&wskey=eityliquen";
  console.log(url);

  fetch(url).then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    console.log(json.items[0]);
    let source = json.items[0].edmPreview[0];
    console.log(source);

    let html = '';
    for(let i = 0; i < json.items.length; i++){


      html += '<div class="art_container">';
      html += createHTMLfromArtTime(json.items[i]);
      html += '</div>';
    }
    document.getElementById("searchResults").innerHTML = html;

  }).catch(function(error) {
    console.log(error.message)
  })


});
