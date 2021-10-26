var monthEnd;
var empty;
var temp = 0;
var coconut = 0;

function showMonth() {
    display = showMonth;
    var tempDate1 = new Date(tempDate);
    monthEnd = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0);
    tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);

    coconut = 42;
    empty = new Date(tempDate.getFullYear(), tempDate.getMonth(), 0);

    if (tempDate.getDay() < 2) {
        empty.setDate(empty.getDate() - tempDate.getDay() - 6);
        rebuildContent(emptyBlocks, tempDate.getDay() + 6, buildMonth);
        tempDate = new Date(tempDate1);
    }
    else {
        empty.setDate(empty.getDate() - tempDate.getDay() + 2);
        rebuildContent(emptyBlocks, tempDate.getDay() - 1, buildMonth);
        tempDate = new Date(tempDate1);
    }
}

function emptyBlocks(count, callback) {
    if (count == 0) {
        if (callback) {
            callback(tempDate);
        }
    }
    else {
        var newElement = document.createElement('div');
        newElement.className = "dayOfMonth"
        newElement.style.backgroundColor = "#fcfcfc";
        newElement.style.cursor = "default";

        var head = document.createElement('div');
        head.className = "headMonth";

        var text = document.createElement("div");
        text.className = "dateMonth";
        var textvalue = document.createTextNode(empty.getDate());
        text.appendChild(textvalue);
        head.appendChild(text);

        text = document.createElement("div");
        text.className = "dayMonth";
        textvalue = document.createTextNode(day[empty.getDay()]);
        text.appendChild(textvalue);
        head.appendChild(text);

        newElement.appendChild(head);
        parent.appendChild(newElement);

        coconut--;
        count--;
        empty.setDate(empty.getDate() + 1);
        emptyBlocks(count, callback);
    }
}

function buildMonth(currentDate) {
    document.getElementById('choosen').innerHTML = month[currentDate.getMonth()] + ", " + currentDate.getFullYear();

    var newElement = document.createElement('div');
    newElement.className = "dayOfMonth";
    newElement.value = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();

    newElement.onclick = function () {
        showDay(this.value);
    };

    var head = document.createElement('div');
    head.className = "headMonth";

    var text = document.createElement("div");
    text.className = "dateMonth";
    var textvalue = document.createTextNode(currentDate.getDate());
    text.appendChild(textvalue);
    head.appendChild(text);

    text = document.createElement("div");
    text.className = "dayMonth";
    textvalue = document.createTextNode(day[currentDate.getDay()]);
    text.appendChild(textvalue);
    head.appendChild(text);

    newElement.appendChild(head);

    let date = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();

    if (category) {
        var query = "SELECT count(*) number FROM events where id_plan in (SELECT id_plan FROM plans where  date = ? and id_user = (SELECT id_user FROM users where name = ?) and id_category = (SELECT id_category FROM category where name = ?))";
    }
    else {
        var query = "SELECT count(*) number FROM events where id_plan in (SELECT id_plan FROM plans where  date = ? and id_user = (SELECT id_user FROM users where name = ?))";
    }

    db.get(query, [date, userName, category], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        else if (row.number > 0) {
            var plan = document.createElement("div");
            plan.className = "planMonth";
            var planNumber = document.createElement("div");
            planNumber.className = "planNumberMonth event";
            var planName = document.createElement("div");
            planName.className = "planNameMonth";

            textvalue = document.createTextNode(row.number);
            planNumber.appendChild(textvalue);
            plan.appendChild(planNumber);

            textvalue = document.createTextNode("event(s)");
            planName.appendChild(textvalue);
            plan.appendChild(planName);

            newElement.appendChild(plan);
        }

        if (category) {
            query = "SELECT count(*) number, max(urgency) maxUrgency FROM tasks where id_plan in (SELECT id_plan FROM plans where  date = ? and id_user = (SELECT id_user FROM users where name = ?) and id_category = (SELECT id_category FROM category where name = ?))";
        }
        else {
            query = "SELECT count(*) number, max(urgency) maxUrgency FROM tasks where id_plan in (SELECT id_plan FROM plans where  date = ? and id_user = (SELECT id_user FROM users where name = ?))";
        }

        db.get(query, [date, userName, category], (err, row) => {
            if (err) {
                console.log(err.message);
            }
            else if (row.number > 0) {
                plan = document.createElement("div");
                plan.className = "planMonth";
                planNumber = document.createElement("div");
                planNumber.className = "planNumberMonth task";
                planName = document.createElement("div");
                planName.className = "planNameMonth";

                textvalue = document.createTextNode(row.number);
                planNumber.appendChild(textvalue);
                plan.appendChild(planNumber);

                textvalue = document.createTextNode("task(s)");
                planName.appendChild(textvalue);
                plan.appendChild(planName);

                newElement.appendChild(plan);
            }

            plan = document.createElement("div");
            plan.className = "urgencyMonth";

            var image = document.createElement("img");
            image.className = "imageMonth";

            if (row.maxUrgency > 0) {
                image.src = "../img/" + row.maxUrgency + ".png";
                plan.appendChild(image);
            }
            else {
                textvalue = document.createTextNode("");
                plan.appendChild(textvalue);
            }

            newElement.appendChild(plan);
            parent.appendChild(newElement);

            coconut--;

            if (currentDate.getDate() != monthEnd.getDate()) {
                currentDate.setDate(currentDate.getDate() + 1);
                buildMonth(currentDate);
            }
            else {
                empty = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
                emptyBlocks(coconut);
            }
        });
    });
};