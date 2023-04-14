const resultsContainer = document.querySelector(".results-container");

/**
* print_json_data() fetches the data from the Linode Object Storage bucket and prints its data to
  an HTML ul element.
* @param {[HTML element]} location - The HTML element to print the data to.
* @param {[string]} bucket - The name of the Linode Object Storage bucket.
* @param {[string]} filename - The name of the file in the Linode Object Storage bucket.
*/
function print_json_data(location, bucket, filename) {
    fetch(`https://${bucket}.us-southeast-1.linodeobjects.com/${filename}`)
        //  parses the response as a JSON object and returns a promise.
        .then(response => response.json())
        // prints the data to the HTML element.
        .then(data => {
            // try catch block attempts to loop through the JSON array "data" and create an "li"
            // element for each object in the array, then appends it to the HTML element.
            try {
                data.forEach(person => {
                    const li = document.createElement("li");
                    li.textContent = person.name;
                    location.appendChild(li);
                });
            // Catch block creates an "li" element if the try block produces an error. The "li"
            // is then appended to the "ul" element.
            } catch (error) {
                const li = document.createElement("li");
                li.textContent = data.name;
                location.appendChild(li);
            }
        });
}

function create_containers(lists) {
    try {
        lists.forEach(list => {
            const ul = document.createElement("ul");
            ul.classList.add("info-container")
            resultsContainer.appendChild(ul);
            printjsondata(ul, "talkygram", list);
        });
    } catch (error) {
        const ul = document.createElement("ul");
        resultsContainer.appendChild(ul);
        printjsondata(ul, "talkygram", list);
    }
}

createContainers(["data.json", "data1.json", "data2.json"]);