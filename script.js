const resultsContainer = document.querySelector(".results-container");

//retrieves data from bucket and add names to html
function printjsondata(location, bucket, filename) {
    fetch(`https://${bucket}.us-southeast-1.linodeobjects.com/${filename}`)
        .then(response => response.json())
        .then(data => {
            try {
                data.forEach(person => {
                    const li = document.createElement("li");
                    li.textContent = person.name;
                    location.appendChild(li);
                });
            } catch (error) {
                const li = document.createElement("li");
                li.textContent = data.name;
                location.appendChild(li);
            }
        });
}

function createContainers(lists) {
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