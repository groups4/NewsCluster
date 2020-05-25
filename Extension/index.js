const header = document.getElementById("hi");
const list = document.getElementById("list");
// header.innerText = "Chrome Extension";

function getNews() {
    var x = new XMLHttpRequest();
    x.open("GET", "http://localhost:5000/news/1");
    x.responseType = "json";
    x.onload = function() {
        for (var i = 0; i < 6; i++) {
            var ele = document.createElement("li");
            var id = x.response[i]._id.$oid;
            console.log(id);
            ele.setAttribute("href", `http://localhost:3000/details/${id}`);
            var textnode = document.createTextNode(x.response[i].title);
            var span = document.createElement("span");
            var div = document.createElement("div");
            span.appendChild(textnode);
            div.appendChild(span);
            div.className = "news";
            ele.appendChild(div);
            var div2 = document.createElement("div");
            div2.className = "divider";
            list.appendChild(ele);
            list.appendChild(div2);
        }
        console.log(list);
    };
    x.send();
}

getNews();
